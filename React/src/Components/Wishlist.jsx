import { useSelector, useDispatch } from "react-redux";
import { removeWishlist } from "../Redux/hotelSlice";
import { useNavigate } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";
import Navbar from "./Navbar";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.hotel.wishlist);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="font-sans bg-black min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto my-8 md:my-10 px-4 md:px-0">/
        <h1 className="font-display text-3xl md:text-4xl text-white text-center mb-8">
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-black rounded-2xl shadow-md p-12 text-center">
            <h2 className="text-white/50 font-medium">
              No Hotel Added To Wishlist
            </h2>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mt-6 rounded-xl bg-gold text-navy font-semibold px-6 py-3 hover:bg-gold-light hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Browse Hotels
            </button>
          </div>
        ) : (
          wishlist.map((hotel) => (
            <div
              key={hotel.id}
              className="flex flex-col md:flex-row gap-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 mb-6"
            >
              <img
                src={hotel.thumbnail}
                alt={hotel.name}
                onClick={() => navigate("/details")}
                className="w-full md:w-[320px] h-56 md:h-[220px] object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity duration-300"
              />

              <div className="flex-1">
                <h2 className="font-display text-xl md:text-2xl text-navy">
                  {hotel.name}
                </h2>

                <h3 className="text-sm font-semibold text-navy/70 mt-3">
                  {hotel.location}
                </h3>

                <div className="flex gap-1 my-3">
                  {[...Array(Math.ceil(hotel.rating))].map((_, i) => (
                    <IoStarSharp key={i} color="gold" />
                  ))}
                </div>

                <h2 className="text-emerald font-semibold text-lg">
                  ₹ {hotel.price}
                </h2>

                <div className="flex gap-3 mt-5 flex-wrap">
                  <button
                    onClick={() => dispatch(removeWishlist(hotel.id))}
                    className="rounded-lg bg-gold text-navy text-sm font-semibold px-6 py-2.5 hover:bg-gold-light hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => alert("Booking Coming Soon...")}
                    className="rounded-lg bg-gold text-navy text-sm font-semibold px-6 py-2.5 hover:bg-gold-light hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
