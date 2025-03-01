import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch firm data from API
  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      if (!response.ok) {
        throw new Error("Failed to fetch firm data");
      }
      const newFirmData = await response.json();
      setFirmData(newFirmData.vendors);
    } catch (error) {
      setError(error.message);
      console.error("Firm data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    firmDataHandler();
  }, []);

  // Handle region/category filter
  const filterHandler = (region, category) => {
    setSelectedRegion(region);
    setActiveCategory(category);
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className="firmCollectionContainer">
      <h3 className="pageTitle">🍽️ Top Restaurants with Online Food Delivery in Hyderabad</h3>

      {/* Search Bar */}
      <div className="searchBarContainer">
        <input
          type="text"
          placeholder="🔍 Search restaurants..."
          value={searchTerm}
          onChange={handleSearch}
          className="searchBar"
        />
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="loadingSection">
          <MagnifyingGlass visible={true} height="80" width="80" ariaLabel="loading" glassColor="#c0efff" color="#e15b64" />
          <p>Loading the best food spots... ⏳</p>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="errorMessage">⚠️ {error}</p>}

      {/* Filter Buttons */}
      <div className="filterButtons">
        {[
          { label: "All", category: "all" },
          { label: "South Indian", category: "south-indian" },
          { label: "North Indian", category: "north-indian" },
          { label: "Chinese", category: "chinese" },
          { label: "Bakery", category: "bakery" },
        ].map(({ label, category }) => (
          <button key={category} onClick={() => filterHandler(label, category)} className={activeCategory === category ? "activeButton" : ""}>
            {label}
          </button>
        ))}
      </div>

      {/* Firm List */}
      <section className="firmSection">
        {firmData.length === 0 && !loading && !error && <p className="noDataMessage">No restaurants available at the moment. 🍽️</p>}

        {firmData.map((vendor) =>
          vendor.firm
            .filter((item) => item.firmName.toLowerCase().includes(searchTerm))
            .map((item) => {
              if (selectedRegion === "All" || item.region.some((r) => r.toLowerCase().includes(selectedRegion.toLowerCase()))) {
                return (
                  <Link to={`/products/${item._id}/${item.firmName}`} className="link" key={item._id}>
                    <div className="zoomEffect">
                      <div className="firmGroupBox">
                        <div className="firmGroup">
                          <img
                            loading="lazy"
                            src={item.image ? `${API_URL}/uploads/${item.image}` : "/fallback-image.jpg"}
                            alt={item.firmName}
                            className="firmImage"
                            onError={(e) => {
                              e.target.src = "/fallback-image.jpg";
                            }}
                          />
                          {item.offer && <div className="firmOffer">{item.offer}</div>}
                        </div>
                        <div className="firmDetails">
                          <strong>{item.firmName}</strong>
                          <br />
                          <div className="firmArea">{item.region.join(", ")}</div>
                          <div className="firmArea">{item.area}</div>
                          {item.rating && <div className="firmRating">⭐ {item.rating}/5</div>}
                          {item.deliveryTime && <div className="firmDeliveryTime">🚚 {item.deliveryTime} min</div>}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              }
              return null;
            })
        )}
      </section>
    </div>
  );
};

export default FirmCollections;
