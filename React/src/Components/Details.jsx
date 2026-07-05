import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWishlist } from "../Redux/hotelSlice";
import { IoStarSharp } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Navbar from "./Navbar";

export default function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hotel = useSelector((state) => state.hotel.selectedHotel);

  if (!hotel) {
    return (
      <div className="font-sans bg-cream min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center gap-3 h-[70vh] text-center px-4">
          <h1 className="font-display text-3xl text-navy">
            No Hotel Selected
          </h1>
          <p className="text-ink/60">Please go back and select a hotel.</p>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-4 rounded-xl bg-gold text-navy font-semibold px-6 py-3 hover:bg-gold-light hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Browse Hotels
          </button>
        </div>
      </div>
    );
  }

  const addToWishlist = () => {
    dispatch(addWishlist(hotel));
    alert("Hotel Added To Wishlist");
  };

  return (
    <div className="font-sans bg-cream min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto my-6 md:my-10 px-4 md:px-0">
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
          <img
            src={hotel.thumbnail}
            alt={hotel.name}
            className="w-full h-[320px] md:h-[500px] object-cover rounded-xl"
          />

          <div className="mt-5 flex justify-between items-center flex-wrap gap-3">
            <h1 className="font-display text-2xl md:text-4xl text-navy">
              {hotel.name}
            </h1>
            <h2 className="text-emerald font-semibold text-xl md:text-2xl">
              ₹ {hotel.price}
            </h2>
          </div>

          <div className="flex justify-between items-center mt-3 flex-wrap gap-3">
            <p className="flex items-center gap-1 text-sm md:text-base font-semibold text-navy/70">
              <HiOutlineLocationMarker className="text-gold" size={18} />
              {hotel.location}
            </p>

            <StarRating rating={hotel.rating} />
          </div>

          <h2 className="font-display text-xl text-navy mt-6 mb-2">
            Description
          </h2>

          <p className="text-ink/70 leading-relaxed text-base text-justify">
            {hotel.description}
          </p>

          <div className="mt-8 flex gap-3 flex-wrap">
            <button
              onClick={addToWishlist}
              className="rounded-xl border border-navy text-navy font-semibold px-8 py-3.5 hover:bg-navy hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Move To Wishlist
            </button>

            <button
              onClick={() => alert("Booking Coming Soon...")}
              className="rounded-xl bg-gold text-navy font-semibold px-8 py-3.5 hover:bg-gold-light hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StarRating({ rating }) {
  const stars = [];

  for (let i = 1; i <= Math.ceil(rating); i++) {
    stars.push(<IoStarSharp key={i} color="#c9973f" size={22} />);
  }

  return <div className="flex gap-1">{stars}</div>;
}
