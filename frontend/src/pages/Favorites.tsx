import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { FaHeart, FaMapMarkerAlt, FaStar, FaPlus, FaTimes, FaFolderOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface FavoriteProperty {
  _id: string;
  title: string;
  location: { city: string; state: string };
  price: number;
  images: string[];
  rating: number;
  reviewCount: number;
  bedrooms: number;
  bathrooms: number;
  collectionId: string;
}

interface Collection {
  id: string;
  name: string;
  emoji: string;
}

const defaultCollections: Collection[] = [
  { id: 'all', name: 'All Saved', emoji: '❤️' },
  { id: 'beach', name: 'Beach Getaways', emoji: '🌊' },
  { id: 'city', name: 'City Escapes', emoji: '🏙️' },
  { id: 'mountain', name: 'Mountain Retreats', emoji: '🏔️' },
];

const mockFavorites: FavoriteProperty[] = [
  {
    _id: '607f1f77bcf86cd799439021',
    title: 'Stunning Oceanfront Villa in Malibu',
    location: { city: 'Malibu', state: 'California' },
    price: 850,
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'],
    rating: 4.9,
    reviewCount: 127,
    bedrooms: 4,
    bathrooms: 3,
    collectionId: 'beach',
  },
  {
    _id: '607f1f77bcf86cd799439022',
    title: 'Charming Brownstone in Brooklyn Heights',
    location: { city: 'Brooklyn', state: 'New York' },
    price: 320,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'],
    rating: 4.8,
    reviewCount: 95,
    bedrooms: 3,
    bathrooms: 2,
    collectionId: 'city',
  },
  {
    _id: '607f1f77bcf86cd799439025',
    title: 'Luxury Mountain Chalet with Hot Tub',
    location: { city: 'Aspen', state: 'Colorado' },
    price: 1200,
    images: ['https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80'],
    rating: 4.97,
    reviewCount: 48,
    bedrooms: 5,
    bathrooms: 4,
    collectionId: 'mountain',
  },
  {
    _id: '607f1f77bcf86cd799439026',
    title: 'Beachfront Bungalow in Tulum',
    location: { city: 'Tulum', state: 'Quintana Roo' },
    price: 420,
    images: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80'],
    rating: 4.85,
    reviewCount: 73,
    bedrooms: 2,
    bathrooms: 1,
    collectionId: 'beach',
  },
];

const Favorites = () => {
  const { user } = useAuthStore();
  const [favorites, setFavorites] = useState<FavoriteProperty[]>(mockFavorites);
  const [collections, setCollections] = useState<Collection[]>(defaultCollections);
  const [activeCollection, setActiveCollection] = useState('all');
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionEmoji, setNewCollectionEmoji] = useState('📁');

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter((fav) => fav._id !== id));
  };

  const handleMoveToCollection = (propertyId: string, collectionId: string) => {
    setFavorites(favorites.map((fav) =>
      fav._id === propertyId ? { ...fav, collectionId } : fav
    ));
  };

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;
    const newId = newCollectionName.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();
    setCollections([...collections, { id: newId, name: newCollectionName.trim(), emoji: newCollectionEmoji }]);
    setNewCollectionName('');
    setNewCollectionEmoji('📁');
    setShowNewCollectionModal(false);
    setActiveCollection(newId);
  };

  const displayedFavorites =
    activeCollection === 'all'
      ? favorites
      : favorites.filter((f) => f.collectionId === activeCollection);

  const getCollectionCount = (id: string) =>
    id === 'all' ? favorites.length : favorites.filter((f) => f.collectionId === id).length;

  const emojiOptions = ['📁', '🌴', '🏖️', '🏕️', '🎡', '🌆', '💑', '🐾', '🎿', '🌺'];

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
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Favorites</h1>
            <p className="text-gray-600">
              {favorites.length > 0
                ? `${favorites.length} saved ${favorites.length === 1 ? 'property' : 'properties'} across ${collections.length - 1} collections`
                : "You haven't saved any favorites yet"}
            </p>
          </div>
          <button
            onClick={() => setShowNewCollectionModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-airbnb-red text-white font-medium rounded-lg hover:bg-red-600 transition"
          >
            <FaPlus className="text-sm" />
            New Collection
          </button>
        </div>

        {/* Collections Tabs */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveCollection(col.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition ${
                activeCollection === col.id
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span>{col.emoji}</span>
              <span>{col.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeCollection === col.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {getCollectionCount(col.id)}
              </span>
            </button>
          ))}
        </div>

        {/* Favorites Grid */}
        {displayedFavorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            {activeCollection === 'all' ? (
              <>
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
              </>
            ) : (
              <>
                <FaFolderOpen className="mx-auto text-6xl text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Collection is empty</h2>
                <p className="text-gray-600 mb-6">
                  Move saved properties here or explore new ones to add.
                </p>
                <button
                  onClick={() => setActiveCollection('all')}
                  className="inline-block px-6 py-3 bg-airbnb-red text-white rounded-lg hover:bg-red-600 transition"
                >
                  View All Saved
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedFavorites.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                {/* Image */}
                <Link to={`/listing/${property._id}`} className="block relative">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {/* Collection selector */}
                    <div className="relative group/move">
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition text-xs font-bold text-gray-600"
                        title="Move to collection"
                      >
                        📁
                      </button>
                      <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 min-w-[160px] hidden group-hover/move:block z-10">
                        <p className="text-xs font-semibold text-gray-500 px-3 pt-2 pb-1">Move to</p>
                        {collections.filter(c => c.id !== 'all').map((col) => (
                          <button
                            key={col.id}
                            onClick={(e) => {
                              e.preventDefault();
                              handleMoveToCollection(property._id, col.id);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition flex items-center gap-2 ${
                              property.collectionId === col.id ? 'text-airbnb-red font-medium' : 'text-gray-700'
                            }`}
                          >
                            <span>{col.emoji}</span>
                            {col.name}
                            {property.collectionId === col.id && <span className="ml-auto text-xs">✓</span>}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Remove favorite */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFavorite(property._id);
                      }}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition"
                      title="Remove from favorites"
                    >
                      <FaHeart className="text-airbnb-red text-xl" />
                    </button>
                  </div>
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
                      <span className="text-sm">{property.location.city}, {property.location.state}</span>
                    </div>

                    <div className="flex items-center mb-3">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                      <span className="text-sm text-gray-600 ml-1">({property.reviewCount} reviews)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {property.bedrooms} bed · {property.bathrooms} bath
                      </div>
                      <div>
                        <span className="text-xl font-bold text-gray-900">${property.price}</span>
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
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">💡 Pro Tip</h3>
            <p className="text-gray-700">
              Properties in your favorites list may have limited availability. Book your favorites
              soon to secure your preferred dates! Use collections to organize your wishlist by trip type or destination.
            </p>
          </div>
        )}
      </div>

      {/* New Collection Modal */}
      {showNewCollectionModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => setShowNewCollectionModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-900">Create Collection</h3>
              <button
                onClick={() => setShowNewCollectionModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Collection Name</label>
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="e.g. Honeymoon Ideas"
                maxLength={30}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-airbnb-red"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateCollection()}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pick an icon</label>
              <div className="flex flex-wrap gap-2">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setNewCollectionEmoji(emoji)}
                    className={`w-10 h-10 text-xl rounded-lg flex items-center justify-center transition ${
                      newCollectionEmoji === emoji
                        ? 'bg-airbnb-red/10 ring-2 ring-airbnb-red'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCreateCollection}
              disabled={!newCollectionName.trim()}
              className="w-full py-3 bg-airbnb-red text-white font-semibold rounded-xl hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Collection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
