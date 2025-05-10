import React, { useState, useEffect } from 'react';
import { fetchCats, type CatImage } from '../services/cat-api';

const Home: React.FC = () => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load initial cats when component mounts
    loadCats();
  }, []);

  const loadCats = async () => {
    try {
      setLoading(true);
      const newCats = await fetchCats(10);
      setCats(newCats);
      setError(null);
    } catch (err) {
      setError('Failed to load cats. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreCats = async () => {
    try {
      setLoading(true);
      const moreCats = await fetchCats(10);
      setCats(prevCats => [...prevCats, ...moreCats]);
      setError(null);
    } catch (err) {
      setError('Failed to load more cats. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">Discover Cats</h1>
      <p className="text-gray-600 text-center mb-8">Browse through our collection of adorable cat images</p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
          {error}
        </div>
      )}
      
      {loading && cats.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cats.map(cat => (
              <div 
                key={cat.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <img 
                  src={cat.url} 
                  // alt={cat?.breeds?.length > 0 ? cat?.breeds[0]?.name : 'A cute cat'} 
                  className="w-full h-48 object-cover"
                />
                {cat?.breeds?.length > 0 && (
                  <div className="p-3">
                    <p className="font-medium">{cat.breeds[0]?.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-10">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 disabled:opacity-50"
              onClick={loadMoreCats}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More Cats'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;