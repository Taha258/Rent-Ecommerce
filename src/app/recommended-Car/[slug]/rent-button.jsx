'use client'

import Link from "next/link"

export function RentButton({ slug }) {
  return (
    <Link href={`/rent/${slug}`}>
      <button className="bg-[#3563E9] hover:bg-[#54A6FF] py-3 px-5 text-white text-lg rounded-md">
        Rent Now
      </button>
    </Link>
  )
}

