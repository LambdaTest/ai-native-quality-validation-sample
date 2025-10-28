import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaCheckCircle, FaClock, FaBan } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Mock bookings data - In a real app, this would come from an API
const mockBookings = [
  {
    _id: 'booking001',
    listing: {
      _id: '607f1f77bcf86cd799439021',
      title: 'Stunning Oceanfront Villa in Malibu',
      location: {
        city: 'Malibu',
        state: 'California',
      },
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'],
    },
    checkIn: '2024-11-15',
    checkOut: '2024-11-20',
    guests: 4,
    totalPrice: 4250,
    status: 'confirmed',
    createdAt: '2024-10-20T10:30:00Z',
  },
  {
    _id: 'booking002',
    listing: {
      _id: '607f1f77bcf86cd799439022',
      title: 'Charming Brownstone in Brooklyn Heights',
      location: {
        city: 'Brooklyn',
        state: 'New York',
      },
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'],
    },
    checkIn: '2024-12-01',
    checkOut: '2024-12-05',
    guests: 2,
    totalPrice: 1280,
    status: 'pending',
    createdAt: '2024-10-25T14:20:00Z',
  },
  {
    _id: 'booking003',
    listing: {
      _id: '607f1f77bcf86cd799439023',
      title: 'Luxury Mountain Cabin in Aspen',
      location: {
        city: 'Aspen',
        state: 'Colorado',
      },
      images: ['https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80'],
    },
    checkIn: '2024-10-10',
    checkOut: '2024-10-15',
    guests: 6,
    totalPrice: 7500,
    status: 'completed',
    createdAt: '2024-09-15T09:00:00Z',
  },
];

const Bookings = () => {
  const { user } = useAuthStore();
  const [bookings] = useState(mockBookings);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="text-green-500" />;
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'cancelled':
        return <FaBan className="text-red-500" />;
      case 'completed':
        return <FaCheckCircle className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights;
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return booking.status === 'confirmed' || booking.status === 'pending';
    if (filter === 'past') return booking.status === 'completed';
    if (filter === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Please log in to view your bookings</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            {filteredBookings.length > 0
              ? `You have ${filteredBookings.length} ${filter === 'all' ? '' : filter} ${filteredBookings.length === 1 ? 'booking' : 'bookings'}`
              : `No ${filter === 'all' ? '' : filter} bookings found`}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex space-x-2 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              filter === 'all'
                ? 'bg-airbnb-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Bookings
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              filter === 'upcoming'
                ? 'bg-airbnb-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-6 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              filter === 'past'
                ? 'bg-airbnb-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Past
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-6 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              filter === 'cancelled'
                ? 'bg-airbnb-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaCalendarAlt className="mx-auto text-6xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No {filter === 'all' ? '' : filter} bookings
            </h2>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? 'You haven\'t made any bookings yet. Start exploring amazing properties!'
                : `You don't have any ${filter} bookings at the moment.`}
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-airbnb-red text-white rounded-lg hover:bg-red-600 transition"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="md:flex">
                  {/* Image */}
                  <Link
                    to={`/listing/${booking.listing._id}`}
                    className="md:w-1/3 lg:w-1/4"
                  >
                    <img
                      src={booking.listing.images[0]}
                      alt={booking.listing.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <Link to={`/listing/${booking.listing._id}`}>
                          <h3 className="text-xl font-bold text-gray-900 hover:text-airbnb-red transition">
                            {booking.listing.title}
                          </h3>
                        </Link>
                        <div className="flex items-center text-gray-600 mt-1">
                          <FaMapMarkerAlt className="mr-2" />
                          <span>
                            {booking.listing.location.city}, {booking.listing.location.state}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        <span className="font-medium">{getStatusText(booking.status)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Check-in</p>
                        <p className="font-semibold text-gray-900 flex items-center">
                          <FaCalendarAlt className="mr-2 text-airbnb-red" />
                          {formatDate(booking.checkIn)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Check-out</p>
                        <p className="font-semibold text-gray-900 flex items-center">
                          <FaCalendarAlt className="mr-2 text-airbnb-red" />
                          {formatDate(booking.checkOut)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Guests</p>
                        <p className="font-semibold text-gray-900 flex items-center">
                          <FaUsers className="mr-2 text-airbnb-red" />
                          {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          {calculateNights(booking.checkIn, booking.checkOut)} nights
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${booking.totalPrice.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          to={`/listing/${booking.listing._id}`}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                          View Property
                        </Link>
                        {booking.status === 'confirmed' && (
                          <button className="px-4 py-2 bg-airbnb-red text-white rounded-lg hover:bg-red-600 transition">
                            Manage Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        {filteredBookings.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-airbnb-red/10 to-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-700">
              If you have any questions about your bookings or need to make changes, feel free to
              contact the property host or our support team.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
