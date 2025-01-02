// 'use client'

// import React, { useState, useEffect } from "react";
// import ProductCard from "../Products/ProductCard";
// import { FetchCategoryData } from "../../../sanity/lib/fetchData";

// const CategoryCars = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [visibleCars, setVisibleCars] = useState(6);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const data = await FetchCategoryData();
//         setCars(data);
//       } catch (err) {
//         console.error('Error fetching category cars:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   const showMoreCars = () => {
//     setVisibleCars((prevVisible) => prevVisible + 3);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 text-center py-4">Error loading cars: {error}</div>;
//   }

//   return (
//     <div className="container mx-auto flex flex-col mb-20">
//       <div className="grid mt-6 gap-y-8 gap-x-6 px-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:justify-items-center">
//         {cars.slice(0, visibleCars).map((car) => (
//           <ProductCard
//             key={car._id}
//             product={{
//               image: car.imageUrl,
//               name: car.brand,
//               price: car.price,
//               discount: "",
//               category: car.category,
//               genre: car.auto ? "Automatic" : "Manual",
//               litres: car.liters,
//               people: car.seats,
//             }}
//             slug={car.slug}
//           />
//         ))}
//       </div>
//       {visibleCars < cars.length && (
//         <div className="flex items-center">
//           <button
//             onClick={showMoreCars}
//             className="bg-[#3563E9] hover:bg-[#54A6FF] w-40 mt-20 py-3 mx-auto text-white text-center rounded-[5px]"
//           >
//             Show more cars
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryCars;

