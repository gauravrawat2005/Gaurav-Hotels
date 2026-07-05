import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setHotel, addWishlist, setSearchFilters, clearSearchFilters } from "../Redux/hotelSlice";
import { useNavigate } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";

const PRICE_OPTIONS = [
  { value: "any", label: "Any Price" },
  { value: "0-1000", label: "₹0 - ₹1000" },
  { value: "1000-3000", label: "₹1000 - ₹3000" },
  { value: "3000-5000", label: "₹3000 - ₹5000" },
  { value: "5000+", label: "₹5000+" },
];

const RATING_OPTIONS = [
  { value: "any", label: "Any Rating" },
  { value: "1", label: "1★ & above" },
  { value: "2", label: "2★ & above" },
  { value: "3", label: "3★ & above" },
  { value: "4", label: "4★ & above" },
  { value: "5", label: "5★" },
];

function matchesPriceRange(price, range) {
  if (range === "any") return true;
  if (range === "5000+") return price >= 5000;
  const [min, max] = range.split("-").map(Number);
  return price >= min && price <= max;
}

export default function ProductsListings() {
  const [current, setCurrent] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.hotel);

  // Local, editable copies of the filters so this page's dropdowns stay in sync
  const [searchText, setSearchTextLocal] = useState(filters.searchText || "");
  const [priceRange, setPriceRangeLocal] = useState(filters.priceRange || "any");
  const [rating, setRatingLocal] = useState(filters.rating || "any");

  const PAGE_SIZE = 33;

  const url = `https://demohotelsapi.pythonanywhere.com/hotels?limit=${PAGE_SIZE}&skip=${
    PAGE_SIZE * current
  }`;

  async function dataFetch() {
    const res = await fetch(url);
    const hotelsData = await res.json();

    setTotalCount(hotelsData.count);
    setData(hotelsData.data);
  }

  useEffect(() => {
    dataFetch();
  }, [current]);

  const no_of_pages = Math.ceil(totalCount / PAGE_SIZE);

  const getPagination = () => {
    if (no_of_pages <= 7) {
      return Array.from({ length: no_of_pages }, (_, i) => i);
    }

    if (current <= 2) {
      return [0, 1, 2, 3, "...", no_of_pages - 2, no_of_pages - 1];
    }

    if (current >= no_of_pages - 3) {
      return [
        0,
        1,
        "...",
        no_of_pages - 4,
        no_of_pages - 3,
        no_of_pages - 2,
        no_of_pages - 1,
      ];
    }

    return [
      0,
      1,
      "...",
      current - 1,
      current,
      current + 1,
      "...",
      no_of_pages - 2,
      no_of_pages - 1,
    ];
  };

  // Apply Search Text + Price Range + Rating together (Module 5)
  const filteredData = data.filter((hotel) => {
    const matchesText =
      !filters.searchText ||
      hotel.name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
      hotel.location.toLowerCase().includes(filters.searchText.toLowerCase());

    const matchesPrice = matchesPriceRange(hotel.price, filters.priceRange);

    const matchesRating =
      filters.rating === "any" || hotel.rating >= Number(filters.rating);

    return matchesText && matchesPrice && matchesRating;
  });

  const applyFilters = () => {
    dispatch(setSearchFilters({ searchText, priceRange, rating }));
  };

  const resetFilters = () => {
    setSearchTextLocal("");
    setPriceRangeLocal("any");
    setRatingLocal("any");
    dispatch(clearSearchFilters());
  };

  const hasActiveFilters =
    filters.searchText || filters.priceRange !== "any" || filters.rating !== "any";

  return (
    <div className="font-sans text-ink bg-black min-h-screen">
      <Navbar />

      {/* Filter bar */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8">
        <div className="bg-white rounded-2xl shadow-md border border-black/5 p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-end">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide">
              Search
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-cream px-3 py-2.5 focus-within:border-gold transition-colors">
              <HiOutlineSearch className="text-navy/50 shrink-0" size={18} />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchTextLocal(e.target.value)}
                placeholder="Hotel name, city or location"
                className="w-full bg-transparent outline-none text-sm text-ink placeholder:text-ink/40"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide">
              Price Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRangeLocal(e.target.value)}
              className="rounded-xl border border-black/10 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors cursor-pointer"
            >
              {PRICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRatingLocal(e.target.value)}
              className="rounded-xl border border-black/10 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors cursor-pointer"
            >
              {RATING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={applyFilters}
              className="rounded-xl bg-gold text-navy font-semibold text-sm px-5 py-2.5 hover:bg-gold-light hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Apply
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1 rounded-xl border border-black/10 text-navy/70 font-semibold text-sm px-4 py-2.5 hover:border-gold hover:text-gold transition-colors duration-300 cursor-pointer"
              >
                <HiOutlineX size={16} />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-6 mt-8">
          {filteredData.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-10 text-center text-ink/50">
              No hotels match your filters. Try adjusting your search.
            </div>
          ) : (
            filteredData.map((el) => (
              <Product
                key={el.id}
                id={el.id}
                name={el.name}
                thumbnail={el.thumbnail}
                des={el.description}
                location={el.location}
                rating={el.rating}
                price={el.price}
              />
            ))
          )}
        </div>

        <div className="flex justify-center items-center gap-2 my-10 flex-wrap">
          <button
            disabled={current === 0}
            onClick={() => setCurrent(current - 1)}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-navy border border-black/10 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold hover:text-gold transition-colors duration-300 cursor-pointer"
          >
            Prev
          </button>

          {getPagination().map((item, index) => {
            if (item === "...") {
              return (
                <span key={index} className="px-2 text-ink/40">
                  ...
                </span>
              );
            }

            return (
              <button
                key={index}
                onClick={() => setCurrent(item)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                  current === item
                    ? "bg-navy text-white"
                    : "bg-white text-navy border border-black/10 hover:border-gold hover:text-gold"
                }`}
              >
                {item + 1}
              </button>
            );
          })}

          <button
            disabled={current === no_of_pages - 1}
            onClick={() => setCurrent(current + 1)}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-navy border border-black/10 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold hover:text-gold transition-colors duration-300 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export function Product({ id, name, thumbnail, des, location, rating, price }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openDetails = () => {
    dispatch(
      setHotel({
        id,
        name,
        thumbnail,
        description: des,
        location,
        rating,
        price,
      }),
    );

    navigate("/details");
  };

  const moveToWishlist = () => {
    dispatch(
      addWishlist({
        id,
        name,
        thumbnail,
        description: des,
        location,
        rating,
        price,
      }),
    );

    alert(`${name} added to Wishlist`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 p-5 md:p-6">
      <div className="md:w-[300px] shrink-0">
        <img
          src={thumbnail}
          alt={name}
          onClick={openDetails}
          className="w-full h-56 md:h-[220px] object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity duration-300"
        />
      </div>

      <div className="flex flex-col gap-3 text-left flex-1">
        <h2
          onClick={openDetails}
          className="font-display text-xl md:text-2xl text-navy cursor-pointer hover:text-gold transition-colors"
        >
          {name}
        </h2>

        <p onClick={openDetails} className="text-sm text-ink/60 cursor-pointer leading-relaxed">
          {des.slice(0, 200)}...
        </p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm text-ink/70">Location : {location}</p>
          <StarRating rating={rating} />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 mt-1">
          <p className="text-navy font-semibold text-lg">₹ {price}</p>

          <div className="flex gap-2">
            <button
              onClick={moveToWishlist}
              className="rounded-lg border border-navy text-navy text-sm font-semibold px-5 py-2.5 hover:bg-navy hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Move to Wishlist
            </button>
            <button
              onClick={openDetails}
              className="rounded-lg bg-gold text-navy text-sm font-semibold px-5 py-2.5 hover:bg-gold-light hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StarRating({ rating }) {
  let stars = [];

  for (let i = 1; i <= Math.ceil(rating); i++) {
    stars.push(<IoStarSharp key={i} color="#c9973f" />);
  }

  return <div className="flex gap-0.5">{stars}</div>;
}
