"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

const RecommendedCard = ({ product }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const heartUnfilled = "/images/heart-unfilled.svg";
  const heartFilled = "/images/heart-filled.svg";
  const litresIcon = "/images/gas-station.svg";
  const genreIcon = "/images/handle.svg";
  const peopleIcon = "/images/profile-2.svg";

  return (
    <div className="flex-shrink-0 md:w-[23.2rem] w-full h-[30rem] rounded-lg relative mx-4 border-none bg-white shadow-md">
      <div className="p-6">
        <Link href={`/recommended-Car/${product.slug}`}>
          <h3 className="text-xl font-semibold cursor-pointer">
            {product.brand}
          </h3>
        </Link>
        <p className="text-[#90A3BF] text-sm font-semibold mt-2">
          {product.category}
        </p>
      </div>

      <div className="absolute top-4 right-2 flex flex-col space-y-2">
        <button
          className="bg-white w-8 h-8 rounded-full flex items-center justify-center hover:text-red-500"
          onClick={() => setIsHeartClicked(!isHeartClicked)}
        >
          <Image
            src={isHeartClicked ? heartFilled : heartUnfilled}
            alt="Heart Icon"
            width={24}
            height={24}
          />
        </button>
      </div>

      <div className="w-full h-40 mt-4 flex items-center justify-center">
        <Image
          src={product.imageUrl}
          alt={product.brand}
          width={300}
          height={160}
          className="object-contain"
        />
      </div>

      <div className="flex items-center justify-between mt-10 px-6">
        <div className="flex items-center space-x-2 text-[#90A3BF]">
          <Image src={litresIcon} alt="Litres Icon" width={28} height={28} />
          <span className="text-sm">{product.liters}L</span>
        </div>

        <div className="flex items-center space-x-2 text-[#90A3BF]">
          <Image src={genreIcon} alt="Genre Icon" width={28} height={28} />
          <span className="text-sm">{product.auto ? 'Auto' : 'Manual'}</span>
        </div>

        <div className="flex items-center space-x-2 text-[#90A3BF]">
          <Image src={peopleIcon} alt="People Icon" width={28} height={28} />
          <span className="text-sm">{product.seats} People</span>
        </div>
      </div>

      <div className="mt-4 p-4 m-3">
        <div className="flex items-center justify-between space-x-2">
          <span className="text-[#90A3BF]">
            <span className="text-black text-lg font-bold">
              ${product.price}.00/
            </span>{" "}
            day
          </span>
          <Link href={`/recommended-Car/${product.slug}`}>
            <button className="bg-[#3563E9] hover:bg-[#54A6FF] py-3 px-6 text-white rounded-[5px]">
              Rent Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCard;

