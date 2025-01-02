'use client'
import React, { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { FetchCarsData } from "../../../sanity/lib/fetchData";

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
        console.error('Error fetching car data:', err);
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
    <div className="container max-w-[1600px] mx-auto justify-center flex flex-col">
      <div className="flex mt-10 items-center font-bold justify-between px-5">
        <h4 className="text-xl text-[#90A3BF] font-semibold">Popular Car</h4>
        <div>
          <button className="py-4 text-[#3563E9] rounded-[5px] hover:underline">
            View All
          </button>
        </div>
      </div>

      <div className="w-full mt-6 overflow-hidden relative mx-auto">
        <div className="flex desktop:flex-wrap desktop:justify-between mobile:overflow-x-auto mobile:gap-4 tablet:overflow-x-auto tablet:gap-4">
          {carsData.map((car) => (
            <div
              key={car._id}
              className="min-w-[300px] flex-shrink-0 desktop:w-[calc(25%-1rem)]"
            >
              <ProductCard product={car} />
            </div>
          ))}
        </div>
      </div>
      <hr className="mb-10" />
    </div>
  );
};

export default PopularCars;