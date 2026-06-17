import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSlidersH, FaTh, FaMap, FaChevronDown } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import { listingService } from '../services/listingService';
import type { Listing, SearchFilters } from '../types';

const categories = [
  { name: 'All', icon: '🌍', filter: {} },
  { name: 'Beachfront', icon: '🌊', filter: { amenities: ['Beach Access'] } },
  { name: 'Cabins', icon: '🪵', filter: { propertyType: 'Cabin' } },
  { name: 'Villas', icon: '🏛️', filter: { propertyType: 'Villa' } },
  { name: 'Apartments', icon: '🏙️', filter: { propertyType: 'Apartment' } },
  { name: 'Luxury', icon: '✨', filter: { minPrice: 500 } },
  { name: 'Budget', icon: '🎯', filter: { maxPrice: 300 } },
  { name: 'Mountain', icon: '🏔️', filter: { amenities: ['Mountain View'] } },
];

const sortOptions = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating_desc' },
  { label: 'Newest', value: 'newest' },
];

const featuredDestinations = [
  {
    city: 'Malibu',
    country: 'California',
    description: 'Oceanfront escapes',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  },
  {
    city: 'Aspen',
    country: 'Colorado',
    description: 'Mountain retreats',
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
  },
  {
    city: 'Santorini',
    country: 'Greece',
    description: 'Clifftop villas',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
  },
  {
    city: 'Kyoto',
    country: 'Japan',
    description: 'Tranquil hideaways',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
  },
];

type ViewMode = 'grid' | 'map';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const itemsPerPage = 20;

  const { data, isLoading, error } = useQuery({
    queryKey: ['listings', searchFilters, activeCategory, currentPage, sortBy],
    queryFn: () => {
      const category = categories.find(c => c.name === activeCategory);
      const combinedFilters = { ...searchFilters, ...category?.filter };
      return listingService.getAllListings(combinedFilters as SearchFilters, currentPage, itemsPerPage);
    },
  });

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    setCurrentPage(1);
  };

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    setActiveCategory('All');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFeaturedDestinationClick = (city: string) => {
    setSearchFilters({ city });
    setActiveCategory('All');
    setCurrentPage(1);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-airbnb-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading amazing stays...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500">Failed to load listings</p>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const activeSortLabel = sortOptions.find(o => o.value === sortBy)?.label || 'Sort';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
            Discover Your Perfect Getaway
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Explore unique stays and experiences around the world
          </p>
          <SearchBar onSearch={handleSearch} initialFilters={searchFilters} />
        </div>
      </div>

      {/* Featured Destinations */}
      {!searchFilters.city && !searchFilters.checkIn && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">Featured Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredDestinations.map((dest) => (
              <button
                key={dest.city}
                onClick={() => handleFeaturedDestinationClick(dest.city)}
                className="group relative rounded-2xl overflow-hidden h-48 text-left focus:outline-none focus:ring-2 focus:ring-airbnb-red"
              >
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <p className="font-bold text-lg leading-tight">{dest.city}</p>
                  <p className="text-sm text-white/80">{dest.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`flex flex-col items-center space-y-2 px-6 py-3 rounded-lg transition min-w-fit ${
                  activeCategory === category.name
                    ? 'bg-gray-100 border-b-2 border-gray-900'
                    : 'hover:bg-gray-50'
                }`}
              >
                {category.icon && <span className="text-2xl">{category.icon}</span>}
                <span className={`text-xs font-medium whitespace-nowrap ${
                  activeCategory === category.name ? 'text-gray-900' : 'text-gray-600'
                }`}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Summary */}
        {(searchFilters.city || searchFilters.checkIn || searchFilters.guests) && (
          <div className="mb-6 p-4 bg-gradient-to-r from-airbnb-red/10 to-red-50 rounded-lg border-l-4 border-airbnb-red">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {data?.pagination.total || 0} {data?.pagination.total === 1 ? 'property' : 'properties'} found
                  {searchFilters.city && ` in ${searchFilters.city}`}
                </h3>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  {searchFilters.city && (
                    <span className="inline-flex items-center px-3 py-1 bg-white rounded-full border border-gray-200">
                      <span className="mr-1">📍</span>
                      {searchFilters.city}
                    </span>
                  )}
                  {searchFilters.checkIn && searchFilters.checkOut && (
                    <span className="inline-flex items-center px-3 py-1 bg-white rounded-full border border-gray-200">
                      <span className="mr-1">📅</span>
                      {searchFilters.checkIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {searchFilters.checkOut.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                  {searchFilters.guests && (
                    <span className="inline-flex items-center px-3 py-1 bg-white rounded-full border border-gray-200">
                      <span className="mr-1">👥</span>
                      {searchFilters.guests} {searchFilters.guests === 1 ? 'guest' : 'guests'}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setSearchFilters({});
                  setActiveCategory('All');
                  setCurrentPage(1);
                }}
                className="text-sm font-medium text-airbnb-red hover:text-red-700 underline whitespace-nowrap ml-4"
              >
                Clear search
              </button>
            </div>
          </div>
        )}

        {/* Toolbar: title + sort + view toggle */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {activeCategory === 'All' ? 'Explore stays' : `${activeCategory} properties`}
          </h2>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <FaSlidersH className="text-gray-500" />
                {activeSortLabel}
                <FaChevronDown className={`text-gray-400 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition first:rounded-t-xl last:rounded-b-xl ${
                        sortBy === opt.value ? 'font-semibold text-airbnb-red' : 'text-gray-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                title="Grid view"
                className={`p-2 transition ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <FaTh />
              </button>
              <button
                onClick={() => setViewMode('map')}
                title="Map view"
                className={`p-2 transition ${viewMode === 'map' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <FaMap />
              </button>
            </div>

            <p className="text-sm text-gray-500 hidden sm:block">
              {data?.pagination.total || 0} {data?.pagination.total === 1 ? 'property' : 'properties'}
            </p>
          </div>
        </div>

        {/* Map Placeholder */}
        {viewMode === 'map' && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center h-96">
            <div className="text-center text-gray-500">
              <FaMap className="text-5xl mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium text-gray-600">Map View</p>
              <p className="text-sm text-gray-500 mt-1">Interactive map coming soon</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.listings.map((listing: Listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>

        {data?.listings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-2">No listings found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search criteria</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchFilters({});
                setCurrentPage(1);
              }}
              className="mt-4 px-6 py-2 bg-airbnb-red text-white rounded-lg hover:bg-red-600 transition"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {data && data.pagination.pages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: data.pagination.pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === page
                      ? 'bg-airbnb-red text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data.pagination.pages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
