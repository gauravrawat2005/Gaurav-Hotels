import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineSearch, HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineUserGroup, HiOutlineCalendar } from "react-icons/hi2";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { setSearchFilters } from "../Redux/hotelSlice";

const PRICE_OPTIONS = [
  { value: "any", label: "Any Price" },
  { value: "0-1500", label: "₹0 - ₹1500" },
  { value: "1500-3000", label: "₹1500 - ₹3500" },
  { value: "3500-6000", label: "₹3500 - ₹6000" },
  { value: "6000+", label: "₹6000+" },
];

const RATING_OPTIONS = [
  { value: "any", label: "Any Rating" },
  { value: "1", label: "1★ & above" },
  { value: "2", label: "2★ & above" },
  { value: "3", label: "3★ & above" },
  { value: "4", label: "4★ & above" },
  { value: "5", label: "5★" },
];

export default function BookingSearchCard({ initialSearchText = "", className = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState(initialSearchText);
  const [prevInitialSearchText, setPrevInitialSearchText] = useState(initialSearchText);
  const [priceRange, setPriceRange] = useState("any");
  const [rating, setRating] = useState("any");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const guestsRef = useRef(null);

  // Keep search box in sync when a Popular Destination is clicked on the Home page
  if (initialSearchText !== prevInitialSearchText) {
    setPrevInitialSearchText(initialSearchText);
    setSearchText(initialSearchText);
  }

  // Close the guests dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(e) {
      if (guestsRef.current && !guestsRef.current.contains(e.target)) {
        setGuestsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clampAdults = (val) => Math.max(1, val);
  const clampChildren = (val) => Math.max(0, val);
  const clampRooms = (val) => Math.max(1, val);

  const handleSearch = () => {
    dispatch(
      setSearchFilters({
        searchText,
        priceRange,
        rating,
        checkInDate,
        checkInTime,
        checkOutDate,
        checkOutTime,
        adults,
        children,
        rooms,
      })
    );

    navigate("/products");
  };

  return (
    <div
      className={`w-full rounded-2xl bg-white/95 backdrop-blur shadow-xl border border-black/5 p-4 md:p-5 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
        {/* Search box */}
        <div className="xl:col-span-2 flex flex-col gap-1">
          <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide">
            Search
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-cream px-3 py-2.5 focus-within:border-gold transition-colors">
            <HiOutlineLocationMarker className="text-navy/50 shrink-0" size={20} />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Hotel name, city or location"
              className="w-full bg-transparent outline-none text-sm text-ink placeholder:text-ink/40"
            />
          </div>
        </div>

        {/* Price range */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide">
            Price Range
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="rounded-xl border border-black/10 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors cursor-pointer"
          >
            {PRICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide">
            Rating
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="rounded-xl border border-black/10 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors cursor-pointer"
          >
            {RATING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Check In */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide flex items-center gap-1">
            <HiOutlineCalendar size={14} /> Check In
          </label>
          <div className="flex gap-1.5">
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-1/2 rounded-xl border border-black/10 bg-cream px-2 py-2.5 text-xs text-ink outline-none focus:border-gold transition-colors cursor-pointer"
            />
            <input
              type="time"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              className="w-1/2 rounded-xl border border-black/10 bg-cream px-2 py-2.5 text-xs text-ink outline-none focus:border-gold transition-colors cursor-pointer"
            />
          </div>
        </div>

        {/* Check Out + Guests */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide flex items-center gap-1">
            <HiOutlineCalendar size={14} /> Check Out
          </label>
          <div className="flex gap-1.5">
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-1/2 rounded-xl border border-black/10 bg-cream px-2 py-2.5 text-xs text-ink outline-none focus:border-gold transition-colors cursor-pointer"
            />
            <input
              type="time"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
              className="w-1/2 rounded-xl border border-black/10 bg-cream px-2 py-2.5 text-xs text-ink outline-none focus:border-gold transition-colors cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        {/* Guests dropdown */}
        <div className="relative" ref={guestsRef}>
          <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide flex items-center gap-1 mb-1">
            <HiOutlineUserGroup size={14} /> Guests &amp; Rooms
          </label>
          <button
            type="button"
            onClick={() => setGuestsOpen((v) => !v)}
            className="w-full text-left rounded-xl border border-black/10 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors cursor-pointer hover:border-gold/60"
          >
            {adults} Adult{adults > 1 ? "s" : ""} · {children} Child
            {children !== 1 ? "ren" : ""} · {rooms} Room{rooms > 1 ? "s" : ""}
          </button>

          {guestsOpen && (
            <div className="absolute z-20 mt-2 w-full min-w-[260px] rounded-xl border border-black/10 bg-white shadow-xl p-4 flex flex-col gap-4">
              <GuestCounter
                label="Adults"
                sublabel="Age 13+"
                value={adults}
                onDecrease={() => setAdults((v) => clampAdults(v - 1))}
                onIncrease={() => setAdults((v) => clampAdults(v + 1))}
                min={1}
              />
              <GuestCounter
                label="Children"
                sublabel="Age 0-12"
                value={children}
                onDecrease={() => setChildren((v) => clampChildren(v - 1))}
                onIncrease={() => setChildren((v) => clampChildren(v + 1))}
                min={0}
              />
              <GuestCounter
                label="Rooms"
                sublabel="1 room min."
                value={rooms}
                onDecrease={() => setRooms((v) => clampRooms(v - 1))}
                onIncrease={() => setRooms((v) => clampRooms(v + 1))}
                min={1}
              />
              <button
                type="button"
                onClick={() => setGuestsOpen(false)}
                className="mt-1 self-end rounded-lg bg-navy text-white text-xs font-semibold px-4 py-2 hover:bg-navy-light transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Search button */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={handleSearch}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold text-navy font-semibold text-sm md:text-base px-6 py-3 shadow-lg hover:bg-gold-light hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <HiOutlineSearch size={20} />
            Search Hotels
          </button>
        </div>
      </div>
    </div>
  );
}

function GuestCounter({ label, sublabel, value, onDecrease, onIncrease, min }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="text-xs text-ink/50">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center text-navy disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold hover:text-gold transition-colors cursor-pointer"
        >
          <FaMinus size={10} />
        </button>
        <span className="w-5 text-center text-sm font-semibold">{value}</span>
        <button
          type="button"
          onClick={onIncrease}
          className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center text-navy hover:border-gold hover:text-gold transition-colors cursor-pointer"
        >
          <FaPlus size={10} />
        </button>
      </div>
    </div>
  );
}
