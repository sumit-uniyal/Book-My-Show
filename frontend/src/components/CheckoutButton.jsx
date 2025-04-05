import axios from 'axios';
import logo from '/logo.png';
import { SuccessToast, ErrorToast } from './Toaster';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { popup } from '../store/slice/LoginPopupSlice';

const CheckoutButton = ({ seat, date, movie_id, price }) => {
    const { isAuthenticated, user, user_id } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const createOrder = async () => {
        try {
            if (!isAuthenticated) {
                dispatch(popup());
                return;
            }

            const amount = price * 100; // Amount in paise
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const URL = `${BASE_URL}/show/booking/create-booking`;

            const response = await axios.post(URL, {
                amount,
                currency: 'INR',
            });

            if (response.data.order) {
                handlePayment(response.data.order);
            }
        } catch (error) {
            console.log('Error in creating order:', error);
            ErrorToast("Failed to create order.");
        }
    };

    const handlePayment = (orderData) => {
        const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const Payment_url = `${BASE_URL}/show/booking/payment-verification`;

        const options = {
            key: RAZORPAY_KEY,
            amount: orderData.amount,
            currency: "INR",
            name: "MERN Book My Show",
            description: "Test Transaction",
            image: logo,
            order_id: orderData.id,
            handler: async (response) => {
                try {
                    const verifyResponse = await axios.post(Payment_url, {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        date:date,
                        movie_id:movie_id,
                        user_id:user_id,
                        seat:seat,
                        amount:price
                    });
                    
                    if(verifyResponse.status === 201){
                        SuccessToast("Booking completed Successfully")
                    }else{
                        ErrorToast("Booking Failed.");
                    }
                    // navigate('/')
                } catch (error) {
                    ErrorToast("Booking Failed.");
                }
            },
           
            prefill: {
                name: user?.name || "Guest User",
                email: user?.email || "guest@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#ED783C"
            }
        };

        const rzp1 = new Razorpay(options);

        rzp1.on('payment.failed', function (response) {
            console.error("Payment failed:", response.error);
            ErrorToast("Payment failed or was cancelled.");
        });
        
        rzp1.open();
    };

    return (
        <button 
            onClick={createOrder} 
            className="w-full uppercase text-center mt-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold"
        >
            Book Now
        </button>
    );
};

export default CheckoutButton;