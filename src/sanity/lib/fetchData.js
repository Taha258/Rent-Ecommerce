import { client } from './client';

// Popular Car Data
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
    const data = await client.fetch(query, { cache: 'force-cache' });
    return data;
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    throw new Error('Sorry, Your Network is very slow. Please try again later.');
  }
};

// Single car data
export const fetchSingleCarData = async (slug) => {
  try {
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
    return await client.fetch(query, { slug, cache: 'force-cache' });
  } catch (error) {
    console.error('Error fetching single car:', error);
    throw new Error('Sorry, Your Network is very slow. Please try again later.');
  }
};

// Recommended Car Data
export const fetchRecommendedData = async () => {
  try {
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
    return await client.fetch(query, { cache: 'force-cache' });
  } catch (error) {
    console.error('Error fetching recommended cars:', error);
    throw new Error('Sorry, Your Network is very slow. Please try again later.');
  }
};

// Fetch Category Data
export const FetchCategoryData = async () => {
  try {
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
    }`;
    const result = await client.fetch(query, { cache: 'force-cache' });
    if (!result || result.length === 0) {
      throw new Error('No cars found in the database');
    }
    return result;
  } catch (error) {
    console.error('Error fetching category cars:', error);
    throw new Error('Sorry,Your Network is very slow. Please try again later.');
  }
};

// Fetch Category Data by Slug
export const fetchCategoryData = async (slug) => {
  try {
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
    }`;
    const result = await client.fetch(query, { slug, cache: 'force-cache' });
    if (!result) {
      throw new Error('Car not found');
    }
    return result;
  } catch (error) {
    console.error('Error fetching single category car:', error);
    throw new Error('Sorry, Your Network is very slow. Please try again later.');
  }
}
