import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { FaHeart, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Mock favorites data - In a real app, this would come from an API
const mockFavorites = [
  {
    _id: '607f1f77bcf86cd799439021',
    title: 'Stunning Oceanfront Villa in Malibu',
    location: {
      city: 'Malibu',
      state: 'California',
    },
    price: 850,
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'],
    rating: 4.9,
    reviewCount: 127,
    bedrooms: 4,
    bathrooms: 3,
  },
  {
    _id: '607f1f77bcf86cd799439022',
    title: 'Charming Brownstone in Brooklyn Heights',
    location: {
      city: 'Brooklyn',
      state: 'New York',
    },
    price: 320,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'],
    rating: 4.8,
    reviewCount: 95,
    bedrooms: 3,
    bathrooms: 2,
  },
];

const Favorites = () => {
  const { user } = useAuthStore();
  const [favorites, setFavorites] = useState(mockFavorites);

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter((fav) => fav._id !== id));
    // TODO: Implement API call to remove favorite
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Please log in to view your favorites</p>
          <Link
            to="/login"
            className="mt-4 inline-block px-6 py-3 bg-airbnb-red text-white rounded-lg hover:bg-red-600 transition"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Favorites</h1>
          <p className="text-gray-600">
            {favorites.length > 0
              ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'property' : 'properties'}`
              : 'You haven\'t saved any favorites yet'}
          </p>
        </div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaHeart className="mx-auto text-6xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">
              Start exploring and save your favorite properties by clicking the heart icon
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-airbnb-red text-white rounded-lg hover:bg-red-600 transition"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                {/* Image */}
                <Link to={`/listing/${property._id}`} className="block relative">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFavorite(property._id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition"
                  >
                    <FaHeart className="text-airbnb-red text-xl" />
                  </button>
                </Link>

                {/* Content */}
                <div className="p-4">
                  <Link to={`/listing/${property._id}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                        {property.title}
                      </h3>
                    </div>

                    <div className="flex items-center text-gray-600 mb-2">
                      <FaMapMarkerAlt className="mr-1 text-sm" />
                      <span className="text-sm">
                        {property.location.city}, {property.location.state}
                      </span>
                    </div>

                    <div className="flex items-center mb-3">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-gray-900">
                        {property.rating}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">
                        ({property.reviewCount} reviews)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {property.bedrooms} bed · {property.bathrooms} bath
                      </div>
                      <div>
                        <span className="text-xl font-bold text-gray-900">
                          ${property.price}
                        </span>
                        <span className="text-sm text-gray-600"> / night</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips Section */}
        {favorites.length > 0 && (
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">💡 Pro Tip</h3>
            <p className="text-gray-700">
              Properties in your favorites list may have limited availability. Book your favorites
              soon to secure your preferred dates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
