import { HiOutlineHeart } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar({ setCurrent, transparent = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const wishlist = useSelector((state) => state.hotel.wishlist);

  const goHome = () => {
    if (setCurrent) setCurrent(0);
    navigate("/");
  };

  const navBg = transparent
    ? "absolute top-0 left-0 right-0 bg-transparent"
    : "sticky top-0 bg-navy";

  return (
    <nav
      className={`navbar ${navBg} z-50 h-20 flex items-center justify-between px-8 lg:px-16 text-white`}
    >
      {/* Left Side */}
      <div className="flex items-center gap-10">

        {/* Logo */}
        <h2
          onClick={goHome}
          className="text-3xl font-bold cursor-pointer whitespace-nowrap"
        >
          Gaurav Hotels
        </h2>

        {/* Navigation */}
        <button
          onClick={goHome}
          className={`font-medium transition ${
            location.pathname === "/"
              ? "text-gold"
              : "text-white hover:text-gold"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => navigate("/products")}
          className={`font-medium transition ${
            location.pathname === "/products"
              ? "text-gold"
              : "text-white hover:text-gold"
          }`}
        >
          Hotels
        </button>

        <button
          onClick={() => navigate("/wishlist")}
          className={`flex items-center gap-2 font-medium transition ${
            location.pathname === "/wishlist"
              ? "text-gold"
              : "text-white hover:text-gold"
          }`}
        >
          <HiOutlineHeart size={20} />
          Wishlist ({wishlist.length})
        </button>

        <button
          onClick={() => navigate("/contact")}
          className={`font-medium transition ${
            location.pathname === "/contact"
              ? "text-gold"
              : "text-white hover:text-gold"
          }`}
        >
          Contact
        </button>
      </div>
    </nav>
  );
}