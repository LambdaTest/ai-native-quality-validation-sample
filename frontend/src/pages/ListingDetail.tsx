import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import {
  FaStar,
  FaMapMarkerAlt,
  FaUsers,
  FaBed,
  FaBath,
  FaWifi,
  FaParking,
  FaTv,
  FaSnowflake,
  FaShareAlt,
  FaHeart,
  FaRegHeart,
  FaLink,
  FaFlag,
  FaShieldAlt,
  FaCheckCircle,
} from 'react-icons/fa';
import { listingService } from '../services/listingService';
import { bookingService } from '../services/bookingService';
import { useAuthStore } from '../store/authStore';
import { differenceInDays } from 'date-fns';

const amenityIcons: Record<string, any> = {
  WiFi: FaWifi,
  'Free parking': FaParking,
  TV: FaTv,
  'Air conditioning': FaSnowflake,
};

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const [, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingService.getListingById(id!),
    enabled: !!id,
  });

  const bookingMutation = useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: () => {
      toast.success('Booking confirmed!');
      navigate('/bookings');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Booking failed');
    },
  });

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book');
      navigate('/login');
      return;
    }
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    bookingMutation.mutate({ listingId: id!, checkIn, checkOut, guests });
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast.error('Please login to save favorites');
      navigate('/login');
      return;
    }
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? 'Removed from favorites' : 'Saved to favorites');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
    setShowShareModal(false);
  };

  const handleReviewSubmit = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      navigate('/login');
      return;
    }
    if (reviewRating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (reviewComment.trim().length < 10) {
      toast.error('Review must be at least 10 characters');
      return;
    }
    setReviewSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setReviewSubmitting(false);
    setShowReviewForm(false);
    setReviewRating(0);
    setReviewComment('');
    toast.success('Review submitted successfully!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-airbnb-red"></div>
      </div>
    );
  }

  if (!data?.listing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Listing not found</p>
      </div>
    );
  }

  const { listing, reviews } = data;
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = nights * listing.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {listing.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm">
              {listing.rating && (
                <div className="flex items-center">
                  <FaStar className="text-black mr-1" />
                  <span className="font-semibold">{listing.rating}</span>
                  <span className="text-gray-600 ml-1">
                    ({listing.reviewCount} reviews)
                  </span>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-1" />
                {listing.location.city}, {listing.location.state},{' '}
                {listing.location.country}
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center gap-3 ml-4">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <FaShareAlt />
              Share
            </button>
            <button
              onClick={handleToggleFavorite}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              {isFavorited ? (
                <FaHeart className="text-airbnb-red" />
              ) : (
                <FaRegHeart />
              )}
              {isFavorited ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden mb-8 h-[500px]">
        <div
          className="col-span-2 row-span-2 cursor-pointer"
          onClick={() => setSelectedImage(0)}
        >
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover hover:brightness-95 transition"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/800x600?text=No+Image';
            }}
          />
        </div>
        {listing.images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => setSelectedImage(index + 1)}
          >
            <img
              src={image}
              alt={`${listing.title} ${index + 2}`}
              className="w-full h-full object-cover hover:brightness-95 transition"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Host Info */}
          <div className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">
              {listing.propertyType} hosted by{' '}
              {typeof listing.hostId === 'object' ? listing.hostId.firstName : 'Host'}
            </h2>
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <span><FaUsers className="inline mr-1" />{listing.maxGuests} guests</span>
              <span>·</span>
              <span><FaBed className="inline mr-1" />{listing.bedrooms} bedrooms</span>
              <span>·</span>
              <span><FaBath className="inline mr-1" />{listing.bathrooms} baths</span>
            </div>
            {/* Host badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                <FaShieldAlt className="text-green-500" />
                Identity verified
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                <FaCheckCircle className="text-blue-500" />
                Superhost
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="pb-8 border-b border-gray-200">
            <h3 className="text-xl font-semibold mb-4">About this place</h3>
            <p className="text-gray-600 whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="pb-8 border-b border-gray-200">
            <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
            <div className="grid grid-cols-2 gap-4">
              {listing.amenities.map((amenity, index) => {
                const Icon = amenityIcons[amenity] || FaWifi;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon className="text-gray-600" />
                    <span>{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews */}
          {reviews && reviews.length > 0 && (
            <div className="pb-8 border-b border-gray-200">
              <h3 className="text-xl font-semibold mb-6">
                <FaStar className="inline text-black mr-1" />
                {listing.rating} · {reviews.length} reviews
              </h3>
              <div className="space-y-6">
                {reviews.slice(0, 6).map((review) => (
                  <div key={review._id}>
                    <div className="flex items-center space-x-3 mb-2">
                      {review.userId.avatar ? (
                        <img
                          src={review.userId.avatar}
                          alt={review.userId.firstName}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300" />
                      )}
                      <div>
                        <p className="font-semibold">
                          {review.userId.firstName} {review.userId.lastName}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FaStar
                              key={s}
                              className={s <= (review.rating || 5) ? 'text-yellow-400 text-xs' : 'text-gray-300 text-xs'}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-1">
                            {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Write a Review */}
          <div className="pb-8 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Share your experience</h3>
              {!showReviewForm && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="px-4 py-2 bg-airbnb-red text-white text-sm font-medium rounded-lg hover:bg-red-600 transition"
                >
                  Write a Review
                </button>
              )}
            </div>

            {showReviewForm && (
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Overall rating</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onMouseEnter={() => setReviewHover(star)}
                        onMouseLeave={() => setReviewHover(0)}
                        onClick={() => setReviewRating(star)}
                        className="focus:outline-none"
                      >
                        <FaStar
                          className={`text-3xl transition-colors ${
                            star <= (reviewHover || reviewRating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    {reviewRating > 0 && (
                      <span className="ml-2 text-sm text-gray-600 self-center">
                        {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][reviewRating]}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your review
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={4}
                    maxLength={500}
                    placeholder="Tell future guests about your stay — what did you love? What could be improved?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-airbnb-red resize-none"
                  />
                  <p className="text-xs text-gray-400 text-right mt-1">{reviewComment.length}/500</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleReviewSubmit}
                    disabled={reviewSubmitting}
                    className="px-6 py-2 bg-airbnb-red text-white font-medium rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                  >
                    {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button
                    onClick={() => {
                      setShowReviewForm(false);
                      setReviewRating(0);
                      setReviewComment('');
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Report listing */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaFlag className="text-xs" />
            <button className="underline hover:text-gray-700 transition">
              Report this listing
            </button>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border border-gray-300 rounded-xl p-6 shadow-xl">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <span className="text-2xl font-semibold">${listing.price}</span>
                <span className="text-gray-600 ml-1">night</span>
              </div>
              {listing.rating && (
                <div className="flex items-center text-sm text-gray-600">
                  <FaStar className="text-black mr-1 text-xs" />
                  <span className="font-semibold text-gray-900">{listing.rating}</span>
                  <span className="ml-1">({listing.reviewCount})</span>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-4">
              <div className="grid grid-cols-2 border border-gray-300 rounded-lg overflow-hidden">
                <div className="p-3 border-r border-gray-300">
                  <label className="block text-xs font-semibold mb-1">CHECK-IN</label>
                  <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={new Date()}
                    placeholderText="Add date"
                    className="w-full text-sm outline-none"
                  />
                </div>
                <div className="p-3">
                  <label className="block text-xs font-semibold mb-1">CHECKOUT</label>
                  <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date)}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn || new Date()}
                    placeholderText="Add date"
                    className="w-full text-sm outline-none"
                  />
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-3">
                <label className="block text-xs font-semibold mb-1">GUESTS</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full text-sm outline-none"
                >
                  {Array.from({ length: listing.maxGuests }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} guest{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={bookingMutation.isPending || !checkIn || !checkOut}
              className="w-full bg-airbnb-red text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {bookingMutation.isPending ? 'Booking...' : 'Reserve'}
            </button>

            <p className="text-center text-xs text-gray-500 mt-2">You won't be charged yet</p>

            {nights > 0 && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span className="underline">${listing.price} x {nights} nights</span>
                  <span>${listing.price * nights}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="underline">Service fee</span>
                  <span>${Math.round(totalPrice * 0.14)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold">
                  <span>Total before taxes</span>
                  <span>${totalPrice + Math.round(totalPrice * 0.14)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Share this place</h3>
            <p className="text-sm text-gray-500 mb-5">{listing.title}</p>
            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition text-left"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaLink className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Copy link</p>
                  <p className="text-xs text-gray-500">Share the listing URL</p>
                </div>
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetail;
