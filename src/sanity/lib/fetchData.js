import { client } from './client';

export const FetchCarsData = async () => {
  try {
    const query = `*[_type == "card"] | order(_createdAt desc) {
      _id,
      brand,
      category,
      price,
      liters,
      auto,
      seats,
      "slug": slug.current,
      "imageUrl": image.asset->url
    }`;
    
    const data = await client.fetch(query, { cache: 'no-store' });
    return data;
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    throw error;
  }
};

export const fetchSingleCarData = async (slug) => {
  const query = `*[_type == "card" && slug.current == $slug][0]{
    _id,
    brand,
    category,
    price,
    liters,
    auto,
    seats,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    description
  }`;
  
  return client.fetch(query, { slug, cache: 'no-store' });
};

//Recommentcar Data

export const fetchRecommendedData = async () => {
  const query = `*[_type == "recommendedCar"] | order(_createdAt desc) {
    _id,
    brand,
    category,
    price,
    liters,
    auto,
    seats,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`;
  
  try {
    return await client.fetch(query, { cache: 'no-store' });
  } catch (error) {
    console.error('Error fetching recommended cars:', error);
    throw error;
  }
};

export const FetchRecommendedData = async () => {
  const query = `*[_type == "recommendedCar"] | order(_createdAt desc) {
    _id,
    brand,
    category,
    price,
    liters,
    auto,
    seats,
    description,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`
  
  try {
    return await client.fetch(query, { cache: 'no-store' })
  } catch (error) {
    console.error('Error fetching recommended cars:', error)
    throw error
  }
}

export const fetchSingleRecommendedCar = async (slug) => {
  const query = `*[_type == "recommendedCar" && slug.current == $slug][0]{
    _id,
    brand,
    category,
    price,
    liters,
    auto,
    seats,
    description,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`
  
  try {
    return await client.fetch(query, { slug, cache: 'no-store' })
  } catch (error) {
    console.error('Error fetching single recommended car:', error)
    throw error
  }
}

/// catogory data

export const FetchCategoryData = async () => {
  const query = `*[_type == "category"] | order(_createdAt desc) {
    _id,
    brand,
    category,
    price,
    liters,
    auto,
    seats,
    description,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`
  
  try {
    console.log("Executing Sanity query for all categories");
    const result = await client.fetch(query, { cache: 'no-store' })
    console.log("Sanity query result:", result); 
    if (!result || result.length === 0) {
      console.log("No cars found in the database");
      throw new Error("No cars found in the database");
    }
    return result;
  } catch (error) {
    console.error('Error fetching category cars:', error)
    throw error
  }
}

export const fetchCategoryData = async (slug) => {
  const query = `*[_type == "category" && slug.current == $slug][0]{
    _id,
    brand,
    category,
    price,
    liters,
    auto,
    seats,
    description,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`
  
  try {
    console.log(`Executing Sanity query for slug: ${slug}`);
    const result = await client.fetch(query, { slug, cache: 'no-store' })
    console.log("Sanity query result for single car:", result); 
    if (!result) {
      console.log(`Car not found for slug: ${slug}`);
      throw new Error("Car not found");
    }
    return result;
  } catch (error) {
    console.error('Error fetching single category car:', error)
    throw error
  }
}
