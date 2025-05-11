import React, { useState, useEffect } from 'react';
import { fetchCats, type CatImage } from '../services/cat-api';

const Home: React.FC = () => {
  // const [cats, setCats] = useState<CatImage[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   // Load initial cats when component mounts
  //   loadCats();
  // }, []);

  // const loadCats = async () => {
  //   try {
  //     setLoading(true);
  //     const newCats = await fetchCats(10);
  //     setCats(newCats);
  //     setError(null);
  //   } catch (err) {
  //     setError('Failed to load cats. Please try again.');
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const loadMoreCats = async () => {
  //   try {
  //     setLoading(true);
  //     const moreCats = await fetchCats(10);
  //     setCats(prevCats => [...prevCats, ...moreCats]);
  //     setError(null);
  //   } catch (err) {
  //     setError('Failed to load more cats. Please try again.');
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>Coming soon</div>
  );
};

export default Home;