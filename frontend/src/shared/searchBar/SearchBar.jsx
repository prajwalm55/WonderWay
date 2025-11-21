import React, { useRef } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosPricetags, IoIosSearch } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./SearchhBar.css";

const SearchBar = () => {
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const cityRef = useRef();
  const navigate = useNavigate();

  const SubmitHandler = () => {
    const minPrice = minPriceRef.current.value.trim();
    const maxPrice = maxPriceRef.current.value.trim();
    const searchTerm = cityRef.current.value.trim();

    if (!searchTerm) {
      toast.error("Please enter a destination!", {
        toastId: "search-error",
        style: {
          background: "#8b0000",
          color: "#f4fff4",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: "600",
          border: "1px solid #ff4444",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        },
      });
      return;
    }

    let query = `/tours/search?city=${encodeURIComponent(searchTerm)}`;
    if (minPrice) query += `&minPrice=${minPrice}`;
    if (maxPrice) query += `&maxPrice=${maxPrice}`;

    navigate(query);
  };

  return (
    <div className="search-bar-wrapper">
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          SubmitHandler();
        }}
      >
        <div className="form-group">
          <span><FaPeopleGroup /></span>
          <div>
            <h6>Location</h6>
            <input type="text" placeholder="Where are you going?" ref={cityRef} />
          </div>
        </div>

        <div className="form-group">
          <span><IoIosPricetags /></span>
          <div>
            <h6>Min Price</h6>
            <input type="number" placeholder="Min Price (optional)" ref={minPriceRef} />
          </div>
        </div>

        <div className="form-group">
          <span><IoIosPricetags /></span>
          <div>
            <h6>Max Price</h6>
            <input type="number" placeholder="Max Price (optional)" ref={maxPriceRef} />
          </div>
        </div>

        <button type="submit" className="search-btn">
          <IoIosSearch size={24} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
