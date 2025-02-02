"use client";
import React, { useEffect, useState } from "react";
import RecommendedCard from "../../components/Products/RecommendedCard ";
import { fetchRecommendedData } from "../../../sanity/lib/fetchData";
import Link from "next/link";

const RecommendedCars = () => {
  const [carsData, setCarsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecommendedData();
        setCarsData(data);
      } catch (err) {
        console.error("Error fetching recommended car data:", err);
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
        No recommended cars available at the moment.
      </div>
    );
  }

  return (
    <div className="container max-w-[1600px] mx-auto flex flex-col mb-20">
      <div className="flex mt-10 items-center font-bold justify-between px-4 sm:px-2">
        <h4 className="text-xl text-[#90A3BF] font-semibold">
          Recommended Car
        </h4>
      </div>

      <div className="grid mt-6 gap-6 px-5 sm:flex sm:flex-col sm:items-center md:grid md:grid-cols-2 md:place-items-center md:gap-x-1 xl:grid-cols-3 2xl:grid-cols-4">
        {carsData.map((car) => (
          <RecommendedCard key={car._id} product={car} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between items-center px-4 sm:px-2 mt-10">
        <Link
          href="/category"
          className="bg-[#3563E9] hover:bg-[#54A6FF] w-40 py-3 text-white text-center rounded-[5px] inline-block"
        >
          Show more cars
        </Link>
      </div>
    </div>
  );
};

export default RecommendedCars;