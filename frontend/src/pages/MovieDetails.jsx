import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import BookingModal from "../components/BookingModal";


const MovieDetails = () => {
  const { id } = useParams();
  const [mData, setMdata] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Modal State


  const fetchMovieByData = async () => {
    try {
      const url_data = "/show/get/movies/";
      const Base_URL = import.meta.env.VITE_BASE_URL;
      const final_url = `${Base_URL}${url_data}`;
      const result = await axios.get(final_url, {
        params: { id: id },
      });
      setMdata(result.data.data[0]);
    } catch (error) {
      console.log("Error in Fetching data");
    }
  };

  useEffect(() => {
    fetchMovieByData();
  }, []);

  if (!mData) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div className="container bg-gray-300 mx-auto mt-5 mb-4 p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center">
          <div className="flex justify-center sm:block">
            <img className="w-[70%] h-auto rounded-2xl" src={mData.image} alt="Movie Poster" />
          </div>

          <div className="col-span-1 text-center sm:text-left">
            <h2 className="font-medium text-2xl">{mData.title}</h2>
            <p>
              Release Date:{" "}
              {new Date(mData.releaseDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="w-full uppercase text-center mt-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
              Book Ticket
            </button>

          </div>
        </div>

        <div className="my-10">
          <h2 className="font-bold text-2xl pl-2">About the movie</h2>
          <p className="tracking-[0.5px] border-1 p-2 mt-2 rounded-2xl">{mData.description}</p>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <BookingModal id={mData._id} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default MovieDetails;
