import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { MagnifyingGlass } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Chains = () => {
    const [vendorData, setVendorData] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState(true);

    const vendorFirmHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/vendor/all-vendors?order=desc`);
            if (!response.ok) {
                throw new Error("Failed to fetch vendors");
            }
            const newData = await response.json();
            setVendorData(newData);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
            alert("Failed to fetch vendor data. Please try again later.");
            setLoading(false);
        }
    };

    useEffect(() => {
        vendorFirmHandler();
    }, []);

    const handleScroll = (direction) => {
        const gallery = document.getElementById("chainGallery");
        const scrollAmount = 500;

        if (direction === "left") {
            gallery.scrollTo({
                left: gallery.scrollLeft - scrollAmount,
                behavior: "smooth"
            });
        } else if (direction === "right") {
            gallery.scrollTo({
                left: gallery.scrollLeft + scrollAmount,
                behavior: "smooth"
            });
        }

        setScrollPosition(gallery.scrollLeft);
    };

    return (
        <div className='mediaChainSection'>
            {/* Loader Section */}
            {loading && (
                <div className="loaderSection">
                    <div className="loader">Your 🥣 is Loading...</div>
                    <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="magnifying-glass-loading"
                        glassColor="#c0efff"
                        color="#e15b64"
                    />
                </div>
            )}

            {/* Scroll Buttons */}
            <div className="btnSection">
                <button onClick={() => handleScroll("left")}>
                    <FaRegArrowAltCircleLeft className='btnIcons' />
                </button>
                <button onClick={() => handleScroll("right")}>
                    <FaRegArrowAltCircleRight className='btnIcons' />
                </button>
            </div>

            {/* Title */}
            <h3 className='chainTitle'>Top Restaurant Chains in Hyderabad</h3>

            {/* Vendors List */}
            <section className="chainSection" id="chainGallery" onScroll={(e) => setScrollPosition(e.target.scrollLeft)}>
                {vendorData.vendors && vendorData.vendors.length > 0 ? (
                    vendorData.vendors.map((vendor, vendorIndex) => (
                        <div className="vendorBox" key={vendorIndex}>
                            {vendor.firm.map((item) => (
                                <div key={item._id}>
                                    <Link to={`/products/${item._id}/${item.firmName}`} className="link">
                                        <div className="firmImage">
                                            <img
                                                src={item.image ? `${API_URL}/uploads/${item.image}` : "/fallback-image.jpg"}
                                                alt={item.firmName}
                                                className='topimg'
                                            />
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    !loading && <p className="noDataMessage">No vendors available at the moment.</p>
                )}
            </section>
        </div>
    );
};

export default Chains;
