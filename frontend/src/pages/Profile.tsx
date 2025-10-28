import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update the user profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
    // TODO: Implement API call to update user profile
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-airbnb-red to-red-600 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex items-end -mt-16 mb-4">
              <div className="relative">
                <img
                  src={user.avatar || 'https://i.pravatar.cc/150?img=68'}
                  alt={user.firstName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                {user.isHost && (
                  <div className="absolute bottom-2 right-2 bg-airbnb-red text-white text-xs px-2 py-1 rounded-full">
                    Host
                  </div>
                )}
              </div>
              <div className="ml-6 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="ml-auto mb-4">
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
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      <FaSave />
                      <span>Save</span>
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
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

          <div className="space-y-6">
            {/* First Name */}
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

            {/* Last Name */}
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

            {/* Email */}
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

            {/* Phone */}
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

            {/* Bio */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                About Me
              </label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-airbnb-red focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 pl-6">{user.bio || 'No bio provided'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-3xl font-bold text-airbnb-red">0</h3>
            <p className="text-gray-600 mt-2">Total Bookings</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-3xl font-bold text-airbnb-red">0</h3>
            <p className="text-gray-600 mt-2">Favorite Properties</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-3xl font-bold text-airbnb-red">{user.isHost ? 'Active' : 'Guest'}</h3>
            <p className="text-gray-600 mt-2">Account Type</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
