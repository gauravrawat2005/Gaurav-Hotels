import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import {
  IoStarSharp,
  IoShieldCheckmarkOutline,
  IoHeadsetOutline,
  IoPricetagOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import BookingSearchCard from "./BookingSearchCard";
import { setHotel } from "../Redux/hotelSlice";
import { HiH1 } from "react-icons/hi2";

const DESTINATIONS = [
  {
    name: "Delhi",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mumbai",
    img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Goa",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Jaipur",
    img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Shimla",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Manali",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
  },
];

const WHY_CHOOSE_US = [
  {
    icon: IoPricetagOutline,
    title: "Best Price",
    desc: "Guaranteed low prices on every stay, with no hidden fees at checkout.",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Secure Booking",
    desc: "Your details and payments are protected end-to-end, every single time.",
  },
  {
    icon: IoHeadsetOutline,
    title: "24x7 Support",
    desc: "Our team is on call around the clock for anything you need.",
  },
  {
    icon: IoCheckmarkCircleOutline,
    title: "Verified Hotels",
    desc: "Every property is inspected and reviewed before it reaches you.",
  },
];

const TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    city: "Delhi",
    rating: 5,
    text: "Booking my Goa trip took less than five minutes. The hotel was exactly as pictured and check-in was effortless.",
  },
  {
    name: "Rohan Mehta",
    city: "Mumbai",
    rating: 5,
    text: "Prices were genuinely the best I found anywhere. The 24x7 support team helped me change my dates in minutes.",
  },
  {
    name: "Priya Nair",
    city: "Bengaluru",
    rating: 4,
    text: "Loved the filtering options — found a perfectly rated hotel in Jaipur within our budget in no time.",
  },
];

const FEATURED_COUNT = 8;

export default function Home() {
  const [destinationSearch, setDestinationSearch] = useState("");
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoadingFeatured(true);
        const res = await fetch(
          `https://demohotelsapi.pythonanywhere.com/hotels?limit=${FEATURED_COUNT}&skip=0`
        );
        const result = await res.json();
        setFeaturedHotels(result.data || []);
      } catch {
        setFeaturedHotels([]);
      } finally {
        setLoadingFeatured(false);
      }
    }

    fetchFeatured();
  }, []);

  const openDetails = (hotel) => {
    dispatch(
      setHotel({
        id: hotel.id,
        name: hotel.name,
        thumbnail: hotel.thumbnail,
        description: hotel.description,
        location: hotel.location,
        rating: hotel.rating,
        price: hotel.price,
      })
    );
    navigate("/details");
  };

  return (
    <div className="font-sans text-ink bg-white">
      {/* HERO */}
      <section className="relative min-h-[640px] md:min-h-[720px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1974&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />

        <Navbar transparent />

        <div className="relative w-full max-w-6xl mx-auto px-4 md:px-6 pt-32 pb-16 md:pb-24">
          <h1 className="uppercase text-gold " style={{ color: "yellow" }}>
            Gaurav Hotels
          </h1>
          <h1 className="font-display text-4xl md:text-6xl text-white" style={{ color: "white" }}>
            Find Your Perfect Stay
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mb-10">
            Search hotels by location, price, rating and book your dream stay.
          </p>

          <BookingSearchCard initialSearchText={destinationSearch} />
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="mb-10">
          <p className="text-gold font-semibold text-xs uppercase tracking-[0.25em] mb-2">
            Explore
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-navy">
            Popular Destinations
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DESTINATIONS.map((dest) => (
            <button
              key={dest.name}
              type="button"
              onClick={() => setDestinationSearch(dest.name)}
              className="group relative rounded-2xl overflow-hidden h-36 md:h-44 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={dest.img}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
              <span className="absolute bottom-3 left-0 right-0 text-white font-semibold text-sm md:text-base">
                {dest.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="mb-10 text-center">
            <p className="text-gold font-semibold text-xs uppercase tracking-[0.25em] mb-2">
              Our Promise
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-navy">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <item.icon className="text-gold mb-4" size={34} />
                <h3 className="font-display text-lg text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED HOTELS */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-gold font-semibold text-xs uppercase tracking-[0.25em] mb-2">
              Handpicked
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-navy">
              Featured Hotels
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="text-sm font-semibold text-navy border-b-2 border-gold hover:text-gold transition-colors cursor-pointer"
          >
            View All Hotels
          </button>
        </div>

        {loadingFeatured ? (
          <p className="text-ink/50 text-sm">Loading featured hotels...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel) => (
              <FeaturedHotelCard
                key={hotel.id}
                hotel={hotel}
                onViewDetails={() => openDetails(hotel)}
              />
            ))}
          </div>
        )}
      </section>

      {/* OFFERS BANNER */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <div className="relative rounded-3xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1600&auto=format&fit=crop)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald/95 via-emerald/80 to-emerald/40" />

          <div className="relative px-8 md:px-14 py-12 md:py-16 max-w-xl">
            <p className="text-gold-light font-semibold text-xs uppercase tracking-[0.25em] mb-3">
              Limited Time Offer
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Save up to 30% on early bookings
            </h2>
            <p className="text-white/80 text-sm md:text-base mb-8">
              Plan ahead and lock in the best rates on top-rated hotels across
              India. Offer valid for a limited time only.
            </p>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="rounded-xl bg-gold text-navy font-semibold px-6 py-3 shadow-lg hover:bg-gold-light hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Grab This Offer
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-navy py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="mb-10 text-center">
            <p className="text-gold font-semibold text-xs uppercase tracking-[0.25em] mb-2">
              Guest Stories
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-white">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review) => (
              <div
                key={review.name}
                className="bg-navy-light rounded-2xl p-6 border border-white/10 hover:scale-105 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <IoStarSharp key={i} color="#c9973f" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  "{review.text}"
                </p>
                <p className="text-white font-semibold text-sm">
                  {review.name}
                </p>
                <p className="text-white/50 text-xs">{review.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeaturedHotelCard({ hotel, onViewDetails }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-black/5">
      <div className="h-44 overflow-hidden">
        <img
          src={hotel.thumbnail}
          alt={hotel.name}
          onClick={onViewDetails}
          className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3
          onClick={onViewDetails}
          className="font-display text-base text-navy mb-1 cursor-pointer hover:text-gold transition-colors line-clamp-1"
        >
          {hotel.name}
        </h3>
        <p className="text-xs text-ink/50 mb-2">{hotel.location}</p>

        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: Math.ceil(hotel.rating || 0) }).map((_, i) => (
            <IoStarSharp key={i} color="#c9973f" size={13} />
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-navy font-semibold text-sm">
            ₹ {hotel.price}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onViewDetails}
            className="flex-1 text-xs font-semibold rounded-lg border border-navy text-navy py-2 hover:bg-navy hover:text-white transition-colors duration-300 cursor-pointer"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={() => alert("Booking Coming Soon...")}
            className="flex-1 text-xs font-semibold rounded-lg bg-gold text-navy py-2 hover:bg-gold-light transition-colors duration-300 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="font-display text-xl text-white mb-3">
              D.S.P Hotels
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Helping you find and book the perfect stay, anywhere in India.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">About</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li className="hover:text-gold transition-colors cursor-pointer">
                Our Story
              </li> 
              <li className="hover:text-gold transition-colors cursor-pointer">
                Careers
              </li>
              <li className="hover:text-gold transition-colors cursor-pointer">
                Press
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li className="hover:text-gold transition-colors cursor-pointer">
                support@dsphotels.com
              </li>
              <li className="hover:text-gold transition-colors cursor-pointer">
                +91 98765 43210
              </li>
              <li className="hover:text-gold transition-colors cursor-pointer">
                Help Center
              </li>
            </ul>
          </div>

          {/* <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li className="hover:text-gold transition-colors cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-gold transition-colors cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-gold transition-colors cursor-pointer">
                Cancellation Policy
              </li>
            </ul>
          </div> */}

          <div className="flex gap-3">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
              (Icon, i) => (
                <span
                  key={i}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <Icon size={14} />
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
