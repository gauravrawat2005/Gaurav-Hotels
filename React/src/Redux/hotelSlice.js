

import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotel",

  initialState: {
    selectedHotel: null,
    wishlist: [],

    // Search / booking filters
    searchText: "",
    priceRange: "any",
    rating: "any",
    checkInDate: "",
    checkInTime: "",
    checkOutDate: "",
    checkOutTime: "",
    adults: 1,
    children: 0,
    rooms: 1,
  },

  reducers: {
    setHotel: (state, action) => {
      state.selectedHotel = action.payload;
    },

    setSearchFilters: (state, action) => {
      state.searchText = action.payload.searchText ?? state.searchText;
      state.priceRange = action.payload.priceRange ?? state.priceRange;
      state.rating = action.payload.rating ?? state.rating;
      state.checkInDate = action.payload.checkInDate ?? state.checkInDate;
      state.checkInTime = action.payload.checkInTime ?? state.checkInTime;
      state.checkOutDate = action.payload.checkOutDate ?? state.checkOutDate;
      state.checkOutTime = action.payload.checkOutTime ?? state.checkOutTime;
      state.adults = action.payload.adults ?? state.adults;
      state.children = action.payload.children ?? state.children;
      state.rooms = action.payload.rooms ?? state.rooms;
    },

    clearSearchFilters: (state) => {
      state.searchText = "";
      state.priceRange = "any";
      state.rating = "any";
      state.checkInDate = "";
      state.checkInTime = "";
      state.checkOutDate = "";
      state.checkOutTime = "";
      state.adults = 1;
      state.children = 0;
      state.rooms = 1;
    },

    addWishlist: (state, action) => {
      const exist = state.wishlist.find(
        (item) => item.id === action.payload.id
      );

      if (!exist) {
        state.wishlist.push(action.payload);
      }
    },

    removeWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },

    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const {
  setHotel,
  addWishlist,
  removeWishlist,
  clearWishlist,
  setSearchFilters,
  clearSearchFilters,
} = hotelSlice.actions;

export default hotelSlice.reducer;