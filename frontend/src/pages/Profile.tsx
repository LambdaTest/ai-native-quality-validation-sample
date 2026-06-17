import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaSave,
  FaTimes,
  FaShieldAlt,
  FaBell,
  FaCreditCard,
  FaPlus,
  FaGlobe,
  FaCheckCircle,
} from 'react-icons/fa';

type ActiveTab = 'profile' | 'notifications' | 'payment';

const notificationSettings = [
  {
    id: 'booking_confirmations',
    label: 'Booking Confirmations',
    description: 'Get notified when a booking is confirmed or updated',
  },
  {
    id: 'check_in_reminders',
    label: 'Check-in Reminders',
    description: 'Receive reminders 48 hours before check-in',
  },
  {
    id: 'messages',
    label: 'Host Messages',
    description: 'Receive messages from property hosts',
  },
  {
    id: 'promotions',
    label: 'Promotions & Deals',
    description: 'Discover special offers and discounts for your next stay',
  },
  {
    id: 'price_alerts',
    label: 'Price Alerts',
    description: 'Get notified when saved properties drop in price',
  },
  {
    id: 'review_requests',
    label: 'Review Requests',
    description: 'Reminders to review properties after your stay',
  },
];

const mockPaymentMethods = [
  {
    id: 'card1',
    type: 'visa',
    last4: '4242',
    expiry: '12/27',
    isDefault: true,
  },
  {
    id: 'card2',
    type: 'mastercard',
    last4: '5555',
    expiry: '08/26',
    isDefault: false,
  },
];

const cardBrandColors: Record<string, string> = {
  visa: 'bg-blue-600',
  mastercard: 'bg-red-500',
  amex: 'bg-green-600',
};

const Profile = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    booking_confirmations: true,
    check_in_reminders: true,
    messages: true,
    promotions: false,
    price_alerts: true,
    review_requests: true,
  });
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [savingProfile, setSavingProfile] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSavingProfile(true);
    await new Promise((r) => setTimeout(r, 600));
    setSavingProfile(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
    });
    setIsEditing(false);
  };

  const handleNotificationToggle = (id: string) => {
    setNotifications((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSetDefaultCard = (cardId: string) => {
    setPaymentMethods((prev) =>
      prev.map((c) => ({ ...c, isDefault: c.id === cardId }))
    );
  };

  const handleRemoveCard = (cardId: string) => {
    setPaymentMethods((prev) => prev.filter((c) => c.id !== cardId));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  const tabs: { key: ActiveTab; label: string; icon: any }[] = [
    { key: 'profile', label: 'Profile', icon: FaUser },
    { key: 'notifications', label: 'Notifications', icon: FaBell },
    { key: 'payment', label: 'Payment Methods', icon: FaCreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-airbnb-red to-red-600 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex items-end -mt-16 mb-4 flex-wrap gap-4">
              <div className="relative">
                <img
                  src={user.avatar || 'https://i.pravatar.cc/150?img=68'}
                  alt={user.firstName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                {user.isHost && (
                  <div className="absolute bottom-2 right-2 bg-airbnb-red text-white text-xs px-2 py-1 rounded-full font-medium">
                    Host
                  </div>
                )}
              </div>
              <div className="mb-4 flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                    <FaCheckCircle className="text-green-500" />
                    Identity Verified
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                    <FaShieldAlt className="text-blue-500" />
                    Email Confirmed
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
                    <FaGlobe className="text-purple-500" />
                    Member since 2024
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-airbnb-red">3</p>
                <p className="text-xs text-gray-500 mt-0.5">Trips taken</p>
              </div>
              <div className="text-center border-x border-gray-100">
                <p className="text-2xl font-bold text-airbnb-red">4</p>
                <p className="text-xs text-gray-500 mt-0.5">Properties saved</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-airbnb-red">{user.isHost ? 'Host' : 'Guest'}</p>
                <p className="text-xs text-gray-500 mt-0.5">Account type</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-6">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition ${
                activeTab === key
                  ? 'bg-airbnb-red text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="text-sm" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-airbnb-red text-white rounded-lg hover:bg-red-600 transition"
                >
                  <FaEdit />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={savingProfile}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                  >
                    <FaSave />
                    <span>{savingProfile ? 'Saving...' : 'Save'}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="mr-2 text-gray-400" />
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-airbnb-red focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 pl-6">{user.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="mr-2 text-gray-400" />
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-airbnb-red focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 pl-6">{user.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaEnvelope className="mr-2 text-gray-400" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-airbnb-red focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 pl-6">{user.email}</p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaPhone className="mr-2 text-gray-400" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-airbnb-red focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 pl-6">{user.phone || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">About Me</label>
                {isEditing ? (
                  <>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      maxLength={300}
                      placeholder="Tell us about yourself..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-airbnb-red focus:border-transparent"
                    />
                    <p className="text-xs text-gray-400 text-right mt-1">{formData.bio.length}/300</p>
                  </>
                ) : (
                  <p className="text-gray-900 pl-6">{user.bio || 'No bio provided'}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Preferences</h2>
            <p className="text-gray-500 text-sm mb-6">
              Choose what you'd like to be notified about
            </p>
            <div className="space-y-4">
              {notificationSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
                >
                  <div className="flex-1 pr-4">
                    <p className="font-medium text-gray-900">{setting.label}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle(setting.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      notifications[setting.id] ? 'bg-airbnb-red' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={notifications[setting.id]}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        notifications[setting.id] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Tab */}
        {activeTab === 'payment' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your saved cards</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-airbnb-red hover:text-airbnb-red transition text-sm font-medium">
                <FaPlus className="text-xs" />
                Add Card
              </button>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((card) => (
                <div
                  key={card.id}
                  className={`flex items-center gap-4 p-4 border rounded-xl transition ${
                    card.isDefault ? 'border-airbnb-red bg-red-50' : 'border-gray-200'
                  }`}
                >
                  <div className={`w-12 h-8 ${cardBrandColors[card.type] || 'bg-gray-400'} rounded-md flex items-center justify-center text-white text-xs font-bold uppercase`}>
                    {card.type.slice(0, 4)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      •••• •••• •••• {card.last4}
                    </p>
                    <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {card.isDefault ? (
                      <span className="text-xs font-semibold text-airbnb-red bg-white border border-airbnb-red px-2.5 py-1 rounded-full">
                        Default
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefaultCard(card.id)}
                        className="text-xs text-gray-500 hover:text-airbnb-red transition underline"
                      >
                        Set default
                      </button>
                    )}
                    {!card.isDefault && (
                      <button
                        onClick={() => handleRemoveCard(card.id)}
                        className="text-gray-400 hover:text-red-500 transition ml-1"
                        title="Remove card"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {paymentMethods.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  <FaCreditCard className="text-5xl mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">No payment methods saved</p>
                  <p className="text-sm mt-1">Add a card to make booking faster</p>
                </div>
              )}
            </div>

            <div className="mt-6 bg-gray-50 rounded-xl p-4 flex items-start gap-3">
              <FaShieldAlt className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">
                Your payment information is encrypted and stored securely. We use 256-bit SSL encryption to protect your data.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
