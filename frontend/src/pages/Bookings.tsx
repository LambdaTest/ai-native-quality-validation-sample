import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaBan,
  FaDownload,
  FaCalendarPlus,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const mockBookings = [
  {
    _id: 'booking001',
    listing: {
      _id: '607f1f77bcf86cd799439021',
      title: 'Stunning Oceanfront Villa in Malibu',
      location: { city: 'Malibu', state: 'California' },
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'],
    },
    checkIn: '2026-08-15',
    checkOut: '2026-08-20',
    guests: 4,
    totalPrice: 4250,
    status: 'confirmed',
    confirmationCode: 'HM8X2A',
    createdAt: '2026-06-01T10:30:00Z',
  },
  {
    _id: 'booking002',
    listing: {
      _id: '607f1f77bcf86cd799439022',
      title: 'Charming Brownstone in Brooklyn Heights',
      location: { city: 'Brooklyn', state: 'New York' },
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'],
    },
    checkIn: '2026-09-01',
    checkOut: '2026-09-05',
    guests: 2,
    totalPrice: 1280,
    status: 'pending',
    confirmationCode: 'BK4R9T',
    createdAt: '2026-05-25T14:20:00Z',
  },
  {
    _id: 'booking003',
    listing: {
      _id: '607f1f77bcf86cd799439023',
      title: 'Luxury Mountain Cabin in Aspen',
      location: { city: 'Aspen', state: 'Colorado' },
      images: ['https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80'],
    },
    checkIn: '2026-02-10',
    checkOut: '2026-02-15',
    guests: 6,
    totalPrice: 7500,
    status: 'completed',
    confirmationCode: 'CP7N3K',
    createdAt: '2025-12-15T09:00:00Z',
  },
  {
    _id: 'booking004',
    listing: {
      _id: '607f1f77bcf86cd799439024',
      title: 'Cozy Studio in the Heart of Paris',
      location: { city: 'Paris', state: 'Île-de-France' },
      images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80'],
    },
    checkIn: '2026-04-20',
    checkOut: '2026-04-25',
    guests: 2,
    totalPrice: 1750,
    status: 'cancelled',
    confirmationCode: 'PR2M5J',
    createdAt: '2026-03-10T11:00:00Z',
  },
];

type BookingFilter = 'all' | 'upcoming' | 'past' | 'cancelled';

interface CancelModalState {
  open: boolean;
  bookingId: string;
  bookingTitle: string;
}

const Bookings = () => {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState(mockBookings);
  const [filter, setFilter] = useState<BookingFilter>('all');
  const [cancelModal, setCancelModal] = useState<CancelModalState>({
    open: false,
    bookingId: '',
    bookingTitle: '',
  });
  const [cancelling, setCancelling] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <FaCheckCircle className="text-green-500" />;
      case 'pending': return <FaClock className="text-yellow-500" />;
      case 'cancelled': return <FaBan className="text-red-500" />;
      case 'completed': return <FaCheckCircle className="text-blue-500" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      confirmed: 'Confirmed',
      pending: 'Pending',
      cancelled: 'Cancelled',
      completed: 'Completed',
    };
    return map[status] || status;
  };

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return map[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const calculateNights = (checkIn: string, checkOut: string) => {
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return b.status === 'confirmed' || b.status === 'pending';
    if (filter === 'past') return b.status === 'completed';
    if (filter === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const openCancelModal = (bookingId: string, bookingTitle: string) => {
    setCancelModal({ open: true, bookingId, bookingTitle });
  };

  const handleConfirmCancel = async () => {
    setCancelling(true);
    await new Promise((r) => setTimeout(r, 800));
    setBookings((prev) =>
      prev.map((b) =>
        b._id === cancelModal.bookingId ? { ...b, status: 'cancelled' } : b
      )
    );
    setCancelling(false);
    setCancelModal({ open: false, bookingId: '', bookingTitle: '' });
  };

  const handleDownloadReceipt = (booking: typeof mockBookings[0]) => {
    const content = [
      'BOOKING RECEIPT',
      '================',
      `Confirmation Code: ${booking.confirmationCode}`,
      `Property: ${booking.listing.title}`,
      `Location: ${booking.listing.location.city}, ${booking.listing.location.state}`,
      `Check-in: ${formatDate(booking.checkIn)}`,
      `Check-out: ${formatDate(booking.checkOut)}`,
      `Guests: ${booking.guests}`,
      `Nights: ${calculateNights(booking.checkIn, booking.checkOut)}`,
      `Total Paid: $${booking.totalPrice.toLocaleString()}`,
      `Status: ${getStatusText(booking.status)}`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${booking.confirmationCode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddToCalendar = (booking: typeof mockBookings[0]) => {
    const start = booking.checkIn.replace(/-/g, '');
    const end = booking.checkOut.replace(/-/g, '');
    const title = encodeURIComponent(`Stay at ${booking.listing.title}`);
    const location = encodeURIComponent(
      `${booking.listing.location.city}, ${booking.listing.location.state}`
    );
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${location}`,
      '_blank'
    );
  };

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

  const filterTabs: { key: BookingFilter; label: string }[] = [
    { key: 'all', label: 'All Bookings' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'past', label: 'Past' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            {filteredBookings.length > 0
              ? `${filteredBookings.length} ${filter === 'all' ? '' : filter} ${filteredBookings.length === 1 ? 'booking' : 'bookings'}`
              : `No ${filter === 'all' ? '' : filter} bookings found`}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex space-x-2 overflow-x-auto">
          {filterTabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-6 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                filter === key
                  ? 'bg-airbnb-red text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
          ))}
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
                ? "You haven't made any bookings yet. Start exploring amazing properties!"
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
                  <Link to={`/listing/${booking.listing._id}`} className="md:w-1/3 lg:w-1/4 flex-shrink-0">
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
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            #{booking.confirmationCode}
                          </span>
                        </div>
                        <Link to={`/listing/${booking.listing._id}`}>
                          <h3 className="text-xl font-bold text-gray-900 hover:text-airbnb-red transition">
                            {booking.listing.title}
                          </h3>
                        </Link>
                        <div className="flex items-center text-gray-600 mt-1">
                          <FaMapMarkerAlt className="mr-2" />
                          <span>{booking.listing.location.city}, {booking.listing.location.state}</span>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(booking.status)}`}>
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

                    <div className="border-t pt-4 flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <p className="text-sm text-gray-600">
                          {calculateNights(booking.checkIn, booking.checkOut)} nights
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${booking.totalPrice.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/listing/${booking.listing._id}`}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
                        >
                          View Property
                        </Link>

                        {booking.status === 'confirmed' && (
                          <>
                            <button
                              onClick={() => handleAddToCalendar(booking)}
                              className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
                            >
                              <FaCalendarPlus className="text-xs" />
                              Add to Calendar
                            </button>
                            <button
                              onClick={() => openCancelModal(booking._id, booking.listing.title)}
                              className="flex items-center gap-1.5 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition text-sm"
                            >
                              <FaBan className="text-xs" />
                              Cancel Booking
                            </button>
                          </>
                        )}

                        {booking.status === 'completed' && (
                          <button
                            onClick={() => handleDownloadReceipt(booking)}
                            className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
                          >
                            <FaDownload className="text-xs" />
                            Download Receipt
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

      {/* Cancel Confirmation Modal */}
      {cancelModal.open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => !cancelling && setCancelModal({ open: false, bookingId: '', bookingTitle: '' })}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="text-red-500 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Cancel Booking</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-gray-700 mb-2">
              Are you sure you want to cancel your booking at:
            </p>
            <p className="font-semibold text-gray-900 mb-4 bg-gray-50 px-3 py-2 rounded-lg">
              {cancelModal.bookingTitle}
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-yellow-800">
                Cancellation may be subject to the host's cancellation policy. Refund eligibility depends on how far in advance you cancel.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCancelModal({ open: false, bookingId: '', bookingTitle: '' })}
                disabled={cancelling}
                className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={cancelling}
                className="flex-1 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition disabled:opacity-50"
              >
                {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
