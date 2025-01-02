'use client'

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import PickUpDropOff from "../components/PickUpDropOff/PickUpDropOff";
import CategoryCard from "../components/Products/CategoryCard";
import { FetchCategoryData } from "../../sanity/lib/fetchData";

const CategoryPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCars, setVisibleCars] = useState(6);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        console.log("Starting to fetch category cars");
        const data = await FetchCategoryData();
        console.log("Fetched category cars:", data);
        if (data && data.length > 0) {
          console.log(`Setting ${data.length} cars to state`);
          setCars(data);
        } else {
          console.log("No cars found in the fetched data");
          setError("No cars found");
        }
      } catch (err) {
        console.error('Error fetching category cars:', err);
        setError(err.message || "An error occurred while fetching cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    console.log("Current cars state:", cars);
  }, [cars]);

  const showMoreCars = () => {
    setVisibleCars((prevVisible) => prevVisible + 3);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <button
        className="p-2 bg-blue-500 text-white md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        Toggle Sidebar
      </button>
      <div className="flex">
        <Sidebar className={`w-60 bg-gray-200 ${isSidebarOpen ? "block" : "hidden"} md:block`} />
        <div className="flex flex-col w-full">
          <PickUpDropOff />

          <div className="container mx-auto flex flex-col mb-20">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">Error loading cars: {error}</div>
            ) : (
              <>
                <div className="grid mt-6 gap-y-8 gap-x-6 px-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:justify-items-center">
                  {cars.slice(0, visibleCars).map((car) => {
                    console.log("Rendering car:", car);
                    return (
                      <CategoryCard
                        key={car._id}
                        product={{
                          ...car,
                          genre: car.auto ? "Automatic" : "Manual",
                          litres: car.liters,
                          people: car.seats,
                        }}
                      />
                    );
                  })}
                </div>
                {visibleCars < cars.length && (
                  <div className="flex items-center">
                    <button
                      onClick={showMoreCars}
                      className="bg-[#3563E9] hover:bg-[#54A6FF] w-40 mt-20 py-3 mx-auto text-white text-center rounded-[5px]"
                    >
                      Show more cars
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;