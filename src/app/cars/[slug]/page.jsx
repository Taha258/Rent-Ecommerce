import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Sidebar from "../../components/Sidebar/Sidebar";
import ReviewsSection from "../../components/ReviewSection/ReviewSection";
import RecentCars from "../../components/Cars/RecentCars";
import { fetchSingleCarData } from "../../../sanity/lib/fetchData";

export async function generateMetadata({ params }) {
  const car = await fetchSingleCarData(params.slug);
  return {
    title: car ? `${car.brand} - Car Details` : "Car Not Found",
  };
}

export async function generateStaticParams() {
  // Implement this function if you want to statically generate pages for all car slugs
  // For now, we'll return an empty array
  return [];
}

export default async function CarDetail({ params }) {
  const car = await fetchSingleCarData(params.slug);

  if (!car) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <div className="flex flex-col w-full px-4 sm:px-2">
          <div className="flex flex-col md:flex-row flex-wrap justify-around mt-10 mx-auto w-full max-w-[1400px]">
            {/* Card 1 */}
            <div className="relative rounded-lg text-white flex flex-col justify-between p-4 mb-8 w-full sm:w-[90%] md:w-[45%] mx-auto">
              <div className="relative z-10 p-4">
                {/* Background Image */}
                <div className="absolute inset-0 z-[-1]">
                  <Image
                    src="/images/hero-arrows.svg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>

                {/* Text Content */}
                <div className="relative z-10">
                  <h1 className="text-white text-[2.5rem] sm:text-[1.5rem] w-[80%] leading-snug">
                    {car.brand} - {car.category} car with the best design and
                    acceleration
                  </h1>
                  <p className="text-lg mt-5 leading-8 font-light w-[60%]">
                    {car.description ||
                      "Safety and comfort while driving a futuristic and elegant car"}
                  </p>
                </div>

                {/* Car Image */}
                <Image
                  src={car.imageUrl}
                  alt={car.brand}
                  width={500}
                  height={300}
                  className="mx-auto mt-6 sm:mt-4 w-full max-w-[500px] rounded-lg"
                />
              </div>

              {/* Flex for 3 smaller images */}
              <div className="flex mt-32 space-x-4 justify-center">
                <Image
                  src="/images/car-view-1.svg"
                  alt="Car View 1"
                  width={200}
                  height={120}
                  className="sm:w-[100px]"
                />
                <Image
                  src="/images/car-view-2.svg"
                  alt="Car View 2"
                  width={200}
                  height={120}
                  className="sm:w-[100px]"
                />
                <Image
                  src="/images/car-view-3.svg"
                  alt="Car View 3"
                  width={200}
                  height={120}
                  className="sm:w-[100px]"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative w-full md:w-[45%] shadow-md rounded-lg mx-auto p-4 h-[80%]">
              <div className="p-3">
                <Link href={`/cars/${car.slug}`}>
                  <h3 className="text-4xl font-semibold cursor-pointer">
                    {car.brand}
                  </h3>
                </Link>
                <div className="flex mt-3">
                  <Image
                    src="/images/review-stars.svg"
                    alt="Review Stars"
                    width={100}
                    height={20}
                  />
                  <p className="ml-3 text-gray-400 text-sm">440+ Reviewer</p>
                </div>
                <p className="text-gray-500 mt-5 text-[1.3rem] leading-10 font-normal">
                  {car.description ||
                    "This car embodies outstanding performance, inspired by the most unforgiving proving ground, the race track."}
                </p>
              </div>

              <div className="absolute top-6 right-4">
                {/* <HeartButton /> */}
              </div>

              <div className="flex flex-col md:flex-row justify-between mx-2 mt-3 space-y-2 md:space-y-0 md:space-x-4 text-sm text-[#90A3BF]">
                <div className="flex items-center justify-between w-full text-lg">
                  <span>Type Car:</span>
                  <span className="text-gray-600">{car.category}</span>
                </div>
                <div className="flex items-center justify-between w-full text-lg">
                  <span>Capacity:</span>
                  <span className="text-gray-600">{car.seats} Person</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between mx-2 mt-2 space-y-2 md:space-y-0 md:space-x-4 text-sm text-[#90A3BF]">
                <div className="flex items-center justify-between w-full text-lg">
                  <span>Steering:</span>
                  <span className="text-gray-600">
                    {car.auto ? "Auto" : "Manual"}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full text-lg">
                  <span>Gasoline:</span>
                  <span className="text-gray-600">{car.liters}L</span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="mt-10 text-center">
                <div className="flex items-center justify-between space-x-4">
                  <span className="text-[#90A3BF] text-xl ml-2">
                    <span className="text-black text-3xl font-bold">
                      ${car.price}.00/
                    </span>{" "}
                    days
                  </span>
                  <Link href={`/rent/${car.slug}`}>
                    <button className="bg-[#3563E9] hover:bg-[#54A6FF] py-3 px-5 text-white text-lg rounded-md">
                      Rent Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <ReviewsSection />
          <RecentCars />
        </div>
      </div>
    </div>
  );
}
