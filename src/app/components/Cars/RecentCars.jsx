'use client'

import React, { useState, useEffect } from "react";
import ProductCard from "../../components/Products/ProductCard";
import RecommendedCard from "../../components/Products/RecommendedCard ";
import { FetchCarsData, fetchRecommendedData } from "../../../sanity/lib/fetchData";

const RecentCars = () => {
  const [recentCars, setRecentCars] = useState([]);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [recentError, setRecentError] = useState(null);
  const [recommendedError, setRecommendedError] = useState(null);
  const [recentLoading, setRecentLoading] = useState(true);
  const [recommendedLoading, setRecommendedLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await FetchCarsData();
        console.log("Recent Cars Data:", data);
        setRecentCars(data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching recent car data:', err);
        setRecentError(err.message);
      } finally {
        setRecentLoading(false);
      }
    };

    const fetchRecommended = async () => {
      try {
        const data = await fetchRecommendedData();
        console.log("Recommended Cars Data:", data);
        setRecommendedCars(data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching recommended car data:', err);
        setRecommendedError(err.message);
      } finally {
        setRecommendedLoading(false);
      }
    };

    fetchRecent();
    fetchRecommended();
  }, []);

  const renderCarSection = (title, cars, loading, error, isRecommended) => (
    <div className="container mx-auto flex flex-col mb-20">
      <div className="flex mt-10 items-center font-bold justify-between px-10">
        <h4 className="text-xl text-[#90A3BF] font-semibold">{title}</h4>
        <div>
          <button className="py-4 text-[#3563E9] rounded-[5px] hover:underline pr-20">
            View All
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3563E9]"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">
          Error loading cars: {error}
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-4">
          No cars available at the moment.
        </div>
      ) : (
        <div className="grid mt-6 gap-y-8 gap-x-6 px-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:justify-items-center">
          {cars.map((car) => (
            isRecommended ? (
              <RecommendedCard key={car._id} product={car} />
            ) : (
              <ProductCard key={car._id} product={car} />
            )
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {renderCarSection("Recent Cars", recentCars, recentLoading, recentError, false)}
      {renderCarSection("Recommended Cars", recommendedCars, recommendedLoading, recommendedError, true)}
    </>
  );
};

export default RecentCars;

