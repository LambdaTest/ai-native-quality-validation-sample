# Demo Credentials for Airbnb Clone

## Overview
This document contains demo credentials for testing the Airbnb Clone application. All users use the same password for easy testing.

---

## Login Credentials

### Password (Same for all users)
```
password123
```

---

## Demo Users

### 1. LambdaTest Admin (Host)
- **Email**: `lambdatestadmin@email.com`
- **Password**: `password123`
- **Role**: Host/Admin
- **Bio**: LambdaTest administrator account for testing and demo purposes.
- **Properties**: Full access to all platform features

### 2. Abhishek Kumar (Host)
- **Email**: `abhishekkumar@lambdatest.com`
- **Password**: `password123`
- **Role**: Host
- **Bio**: LambdaTest developer and property host.
- **Properties**: Full access to platform features

### 3. Demo User (Host)
- **Email**: `demo@lambdatest.com`
- **Password**: `password123`
- **Role**: Host
- **Bio**: Demo account for testing purposes.
- **Properties**: Full access to platform features

### 4. Super Host Elite (Super Host)
- **Email**: `superhost@lambdatest.com`
- **Password**: `password123`
- **Role**: Super Host
- **Bio**: Elite Super Host with exceptional ratings and 100+ successful bookings. Verified property expert.
- **Properties**: Premium listings with 5-star ratings across multiple cities

### 5. David Thompson (Host)
- **Email**: `david.thompson@email.com`
- **Password**: `password123`
- **Role**: Host
- **Bio**: Seasoned traveler and property investor. Love sharing unique spaces with guests from around the world.
- **Properties**: Multiple properties with complete profile, active bookings, and saved favorites
- **Special**: Full demo account with populated data for Profile, Favorites, and Bookings pages

### 6. Test User (Guest)
- **Email**: `testuser@lambdatest.com`
- **Password**: `password123`
- **Role**: Guest
- **Bio**: Test account for general testing and exploration.
- **Properties**: Guest account for browsing and booking properties

### 7. Login Test (Guest)
- **Email**: `logintest@lambdatest.com`
- **Password**: `password123`
- **Role**: Guest
- **Bio**: Dedicated account for testing login flow and authentication.
- **Properties**: Guest account for login flow testing

### 8. Sarah Johnson (Host)
- **Email**: `sarah.johnson@email.com`
- **Password**: `password123`
- **Role**: Host
- **Bio**: Travel enthusiast and photography lover. Host since 2019.
- **Properties**: Owns 5 listings including Malibu villas and Waikiki condos

### 9. Michael Chen (Host)
- **Email**: `michael.chen@email.com`
- **Password**: `password123`
- **Role**: Host
- **Bio**: Architect and real estate investor. Passionate about unique spaces.
- **Properties**: Owns properties in Brooklyn and San Francisco

### 10. Emma Davis (Guest)
- **Email**: `emma.davis@email.com`
- **Password**: `password123`
- **Role**: Guest (Not a host)
- **Bio**: Digital nomad exploring the world one city at a time.
- **Properties**: None (guest account only)

### 11. James Wilson (Host)
- **Email**: `james.wilson@email.com`
- **Password**: `password123`
- **Role**: Host
- **Bio**: Experienced host with 50+ properties worldwide.
- **Properties**: Owns multiple listings in Austin, Miami, and Scottsdale

### 12. Olivia Brown (Guest)
- **Email**: `olivia.brown@email.com`
- **Password**: `password123`
- **Role**: Guest (Not a host)
- **Bio**: Frequent traveler and foodie. Love experiencing local cultures.
- **Properties**: None (guest account only)

---

## Quick Test Scenarios

### Scenario 1: Login as Admin and View Listings
1. Go to: https://demo.lambdatestinternal.com/login
2. Use: `lambdatestadmin@email.com` / `password123`
3. Browse all platform features with admin access

### Scenario 2: Create a New Listing (Become a Host)
1. Go to: https://demo.lambdatestinternal.com/login
2. Use: `james.wilson@email.com` / `password123`
3. Click "Become a Host" in the header
4. Fill out the 5-step form:
   - Select property type
   - Enter location details
   - Add property details and pricing
   - Select amenities
   - Add property images
5. Submit to create your listing

### Scenario 3: Browse as Guest
1. Go to: https://demo.lambdatestinternal.com/login
2. Use: `emma.davis@email.com` / `password123`
3. Browse listings and search by location/filters
4. View property details

### Scenario 4: Register New Account
1. Go to: https://demo.lambdatestinternal.com/register
2. Fill in your details
3. Create a new account
4. You can immediately become a host after registration

---

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Create new account
- **POST** `/api/auth/login` - Login
- **GET** `/api/auth/me` - Get current user

### Listings
- **GET** `/api/listings` - Get all listings (with filters)
- **GET** `/api/listings/:id` - Get single listing
- **POST** `/api/listings` - Create listing (requires auth)
- **PUT** `/api/listings/:id` - Update listing (requires auth)
- **DELETE** `/api/listings/:id` - Delete listing (requires auth)

### Bookings
- **GET** `/api/bookings` - Get user bookings (requires auth)
- **POST** `/api/bookings` - Create booking (requires auth)
- **DELETE** `/api/bookings/:id` - Cancel booking (requires auth)

---

## Testing the "Become a Host" Feature

### Step 1: Login
Use any of the demo credentials above. We recommend using a host account like:
- Email: `james.wilson@email.com`
- Password: `password123`

### Step 2: Access the Page
- Click "Become a Host" button in the header
- You'll be redirected to: https://demo.lambdatestinternal.com/become-host

### Step 3: Complete the Form

#### Step 1 - Property Type
Select from: Villa, Apartment, Cabin, House, Loft, Condo, Penthouse

#### Step 2 - Location
Enter complete address:
- Street Address: `123 Test Street`
- City: `San Francisco`
- State: `California`
- Country: `United States`
- Zip Code: `94102`

#### Step 3 - Details
- Title: `Beautiful Test Property`
- Description: `This is a test property for demonstration purposes.`
- Guests: `4`
- Bedrooms: `2`
- Bathrooms: `2`
- Price/night: `200`

#### Step 4 - Amenities
Select multiple amenities (at least one required):
- WiFi
- Kitchen
- Pool
- Parking
- etc.

#### Step 5 - Photos
Add at least one image URL (sample URLs):
```
https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80
https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80
```

### Step 4: Submit
Click "Create Listing" to add your property to the platform!

---

## Troubleshooting

### Issue: "Failed to load listings"
**Solutions:**
1. Check if backend server is running
2. Hard refresh the browser (Cmd+Shift+R or Ctrl+Shift+R)
3. Clear browser cache and reload
4. Check browser console for CORS errors
5. Contact support if the issue persists

### Issue: Cannot create listing
**Solutions:**
1. Make sure you're logged in
2. Ensure all required fields are filled
3. Add at least one image and one amenity
4. Check backend logs for errors

### Issue: Login not working
**Solutions:**
1. Use exact email and password: `password123`
2. Clear browser localStorage and try again
3. Contact support if the issue persists

---

## Current Application Status

- **Frontend**: Running on https://demo.lambdatestinternal.com/
- **Backend**: Backend API (configured via environment)
- **Mode**: Mock Data (No MongoDB required)
- **Total Listings**: 28 properties
- **Total Users**: 12 demo users

---

## Important Notes

1. **Mock Data Mode**: The application is running with in-memory mock data. All changes (new listings, bookings, etc.) will be lost when the server restarts.

2. **Password Security**: In production, passwords would be properly hashed and secured. The demo uses bcrypt hashing.

3. **Image URLs**: Use valid image URLs for testing. Unsplash URLs work great for demo purposes.

4. **Authentication**: JWT tokens are stored in localStorage and valid until logout.

5. **CORS**: CORS is configured to accept requests from the frontend domain.

---

## Contact

For issues or questions, refer to the main README.md or ARCHITECTURE.md documentation.

**Last Updated**: October 23, 2025
