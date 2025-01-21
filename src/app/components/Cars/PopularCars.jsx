"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { FetchCarsData } from "../../../sanity/lib/fetchData";
import Link from "next/link";

const PopularCars = () => {
  const [carsData, setCarsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchCarsData();
        setCarsData(data);
      } catch (err) {
        console.error("Error fetching car data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3563E9]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error loading cars: {error}
      </div>
    );
  }

  if (!carsData || carsData.length === 0) {
    return (
      <div className="text-center py-4">
        No cars available at the moment.
      </div>
    );
  }

  return (
    <div className="container max-w-[1600px] mx-auto flex flex-col mb-20">
      {/* Header Section */}
      <div className="flex mt-10 items-center font-bold justify-between px-4 sm:px-2">
        <h4 className="text-xl text-[#90A3BF] font-semibold">Popular Cars</h4>
        <Link
          href="/category"
          className="py-2 px-4 text-[#3563E9] rounded-[5px] hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid mt-6 gap-6 px-5 sm:flex sm:flex-col sm:items-center md:grid md:grid-cols-2 md:place-items-center md:gap-x-1 xl:grid-cols-3 2xl:grid-cols-4">
        {carsData.map((car) => (
          <ProductCard key={car._id} product={car} />
        ))}
      </div>
    </div>
  );
};

export default PopularCars;
