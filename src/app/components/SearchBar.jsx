import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "tz1jn366", // Replace with your Sanity project ID
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
});

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce function to optimize search
  useEffect(() => {
    if (!searchQuery) {
      setCars([]); // Reset when input is empty
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchCars(searchQuery);
    }, 500); // 500ms delay to prevent API spam

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Fetch cars from Sanity based on brand name
  const fetchCars = async (query) => {
    setLoading(true);
    try {
      const data = await client.fetch(
        `*[_type == "card" && brand match $query] | order(_createdAt desc) {
          _id, brand, category, price, liters, auto, seats, "slug": slug.current, "imageUrl": image.asset->url
        }`,
        { query: `${query}*` } // Partial match for search
      );
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
    setLoading(false);
  };

  return (
    <div className="relative w-full md:w-[350px] lg:w-[550px] flex items-center sm:mt-5">
      {/* Search Icon */}
      <div className="absolute top-0 left-5 flex items-center h-full text-gray-500">
        <Image src="/images/search-icon.svg" alt="Search Logo" width={25} height={25} />
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search brand name..."
        className="bg-white w-full h-12 pl-16 pr-10 rounded-full text-[#596780] border focus:outline-none tracking-wider font-[500]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Search Results */}
      {searchQuery && (
        <div className="absolute top-14 left-0 w-full bg-white border rounded-lg shadow-lg z-50">
          {loading ? (
            <p className="p-3 text-gray-500">Searching...</p>
          ) : cars.length > 0 ? (
            cars.map((car) => (
              <div key={car._id} className="p-3 hover:bg-gray-100 cursor-pointer">
                <div>
                  <Image
                    src={car.imageUrl || "/images/default-car.jpg"}
                    alt={car.brand}
                    width={100}
                    height={100}
                    className="object-cover rounded"
                  />
                </div>
                <div className="mt-2">
                  <h4 className="font-semibold">{car.brand}</h4>
                  <p className="text-sm text-gray-600">{car.category}</p>
                  <p className="text-lg font-bold">${car.price}</p>
                  <p className="text-sm">{car.auto} | {car.seats} seats</p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-3 text-gray-500">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}







