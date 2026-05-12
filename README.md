
# 🔧 Setup for GitHub App Quick Start with Your Own Fork

To use this repository with the [TestMu AI Cloud GitHub App](https://github.com/apps/lambdatest-ai-cloud), follow these steps:

1. **Fork the repository** — Click **Fork** to create a copy under your GitHub account.
2. **Install the GitHub App** — Install the [TestMu AI Cloud GitHub App](https://github.com/apps/lambdatest-ai-cloud) on your forked repository.
3. **Configure credentials** — Add the `.lambdatest/config.yaml` file with your TestMu AI project ID, folder ID, and other configuration values. See the [configuration guide](https://www.testmuai.com/support/docs/github-app-integration/#repository-configuration) for details.
4. **Enable GitHub Actions** — Go to the **Actions** tab in your forked repository and enable workflows.
5. **Enable GitHub Pages** — Go to **Settings → Pages** and set the branch to **gh-pages** with root directory.
6. **Raise a PR against your own fork** — Create a feature branch in your fork, make changes, and open a pull request **targeting your fork's `main` branch** (not the upstream repository).
7. **Trigger the workflow** — Comment `@KaneAI Validate this PR` on your pull request.

> **Note**: Pull requests to the upstream (TestMu AI) repository from non-authorized users will be automatically closed. Preview deployments and KaneAI validation are only available on PRs raised against your own fork.

For detailed documentation, visit the [TestMu AI Cloud GitHub App Integration Guide](https://www.testmuai.com/support/docs/github-app-integration/).



# Airbnb Clone - Full Stack Application

A modern, full-stack Airbnb clone built with React, TypeScript, Node.js, and Express. This project demonstrates a complete vacation rental platform with property listings, search functionality, user authentication, and booking management.


## 🌟 Features

### Frontend
- **Modern UI/UX**: Airbnb-inspired design with Tailwind CSS
- **Advanced Search**: Location-based search with autocomplete
- **Date Range Picker**: Dual calendar for check-in/check-out selection
- **Guest Management**: Adults, children, infants, and pets selection
- **Category Filters**: Beachfront, Cabins, Villas, Apartments, Luxury, Budget, Mountain
- **Property Listings**: 46 diverse properties across 26 US locations
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Image Galleries**: High-quality property images from Unsplash

### Backend
- **RESTful API**: Clean API architecture with Express.js
- **Mock Data Mode**: Run without database setup using production-ready mock data
- **Authentication**: JWT-based user authentication
- **Filtering & Search**: Advanced query parameters for property filtering
- **CORS Enabled**: Secure cross-origin resource sharing

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Zustand** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **React DatePicker** - Date selection component
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** (optional) - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**


## 🔑 Key Features Explained

### Search Functionality

The search bar includes:
- **Location Search**: Autocomplete dropdown with 8 major US cities
- **Date Selection**: Range picker with 2-month view
- **Guest Selector**: Separate counters for adults, children, infants, and pets
- **Real-time Filtering**: Instant results without page reload

### Property Filters

Pre-defined category filters:
- **All**: Show all properties
- **Beachfront**: Properties with beach access
- **Cabins**: Mountain cabins and lodges
- **Villas**: Luxury villas
- **Apartments**: Urban apartments
- **Luxury**: Properties over $500/night
- **Budget**: Properties under $300/night
- **Mountain**: Properties with mountain views

### Mock Data

The application includes 46 diverse properties across the United States:
- **Locations**: Nashville, Napa Valley, Austin, Seattle, Charleston, Los Angeles, Boston, Honolulu, Santa Fe, Portland, Malibu, Park City, Denver, Philadelphia, San Diego, Brooklyn, Las Vegas, Miami Beach, Chicago, Aspen, New Orleans, Scottsdale, South Lake Tahoe, New York, Savannah, San Francisco
- **Price range**: $120 - $2200 per night
- **Property types**: Penthouse, House, Loft, Villa, Condo, Cabin, Apartment
- **New locations**:
  - Philadelphia, PA - Historic colonial townhouse
  - Savannah, GA - Victorian mansion with Southern charm
  - Santa Fe, NM - Authentic adobe hacienda
  - Napa Valley, CA - Luxury wine country estate
- All properties feature unique images, detailed descriptions, and authentic amenities











