import axios from 'axios';
import logo from '/logo.png';
import { useEffect, useState } from 'react';

const CheckoutButton = ({ seat }) => {
    const [orderData, setOrderData] = useState(null);

    const createOrder = async () => {
        try {
            const amount = seat * 500 * 100; // Amount in paise
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const URL = `${BASE_URL}/show/booking/create-booking`;

            const response = await axios.post(URL, {
                amount,
                currency: 'INR'
            });

            setOrderData(response.data.order); // Save the order data
        } catch (error) {
            console.log('Error in creating order:', error);
        }
    };

    useEffect(() => {
        if (orderData && orderData.id) {
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
                        });

                        console.log("Payment Verified Successfully:", verifyResponse.data);
                    } catch (error) {
                        console.log('Error in Payment Verification:', error);
                    }
                },
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
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
            rzp1.open();
        }
    }, [orderData]);

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
