# Installation & Setup Guide

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Installation](#detailed-installation)
- [LambdaTest GitHub App Integration](#lambdatest-github-app-integration)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

This is a full-stack Airbnb clone built with modern web technologies, featuring property listings, search functionality, user authentication, and booking management. The application demonstrates best practices in React, TypeScript, and Node.js development.

**Live Demo**: [https://demo.lambdatestinternal.com/](https://demo.lambdatestinternal.com/)

### Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite (Build tool & dev server)
- React Router (Client-side routing)
- React Query (Server state management)
- Zustand (Client state management)
- Tailwind CSS (Styling)

**Backend:**
- Node.js & Express.js
- TypeScript
- MongoDB (Optional - Mock data mode available)
- JWT Authentication
- bcryptjs (Password hashing)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **GitHub Account** - For LambdaTest integration
- **LambdaTest Account** - [Sign up](https://www.lambdatest.com/)

### Check Your Installation

```bash
node --version  # Should show v16.x.x or higher
npm --version   # Should show 8.x.x or higher
git --version   # Should show 2.x.x or higher
```

---

## Quick Start

Get the application running in 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/AbhishekLambda/Abhishek-Github-App-Demo.git
cd Abhishek-Github-App-Demo

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Start backend server (from backend directory)
cd ../backend
npm run dev

# 5. Start frontend server (open new terminal, from frontend directory)
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:5000

---

## Detailed Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/AbhishekLambda/Abhishek-Github-App-Demo.git
cd Abhishek-Github-App-Demo
```

### Step 2: Backend Setup

```bash
cd backend
```

#### Install Dependencies

```bash
npm install
```

This will install:
- express
- typescript
- cors
- bcryptjs
- jsonwebtoken
- And other required packages

#### Environment Configuration (Optional)

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5174

# JWT Secret (for production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# MongoDB Configuration (Optional - App runs with mock data by default)
MONGODB_URI=mongodb://localhost:27017/airbnb-clone
USE_MOCK_DATA=true
```

**Note**: The application runs in **mock data mode** by default, so MongoDB is not required for development.

#### Start Backend Server

```bash
npm run dev
```

You should see:
```
✓ Server running on port 5000
✓ Mock data mode enabled
✓ 42 listings loaded
✓ 8 users loaded
```

### Step 3: Frontend Setup

Open a new terminal window:

```bash
cd frontend
```

#### Install Dependencies

```bash
npm install
```

If you encounter peer dependency issues:

```bash
npm install --legacy-peer-deps
```

#### Start Frontend Server

```bash
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5174/
➜  Network: use --host to expose
```

### Step 4: Verify Installation

1. Open your browser and navigate to http://localhost:5174
2. You should see the homepage with property listings
3. Try the demo login credentials:
   - Email: `lambdatestadmin@email.com`
   - Password: `password123`

---

## LambdaTest GitHub App Integration

LambdaTest AI Cloud GitHub App enables automated test case generation for your pull requests. Follow these steps to integrate it with your repository.

### Step 1: Install LambdaTest AI Cloud GitHub App

1. Navigate to [https://github.com/apps/lambdatest-ai-cloud](https://github.com/apps/lambdatest-ai-cloud)
2. Click **"Install"** or **"Configure"** if already installed
3. Select the repositories where you want to install the application
   - You can choose **"All repositories"** or **"Only select repositories"**
   - **Note**: You need **GitHub Admin access** to install the app
4. Click **"Install"** to complete the GitHub side of the integration

### Step 2: Complete LambdaTest Dashboard Setup

After installing the GitHub App:

1. You'll be automatically redirected to the **LambdaTest Dashboard**
2. Make sure you are **logged into your LambdaTest account**
3. If not logged in, sign in with your credentials
4. Complete the authorization process to link your GitHub account with LambdaTest

### Step 3: Configure config.yaml

Create a configuration file at `.lambdatest/config.yaml` in your repository root:

```yaml
# LambdaTest Configuration

# Project and folder configuration
project_id: "your_project_id"
folder_id: "your_folder_id"

# Test Run configuration
assignee: 123456
environment_id: 78901

# Test URL for automation
test_url: "https://demo.lambdatestinternal.com/"

# Enable test duplication for reliability (optional)
use_duplication: true
template_test_run_id: "your_template_run_id"
```

#### Configuration Parameters Explained

| Parameter | Description | Required | Example |
|-----------|-------------|----------|---------|
| `project_id` | Your LambdaTest project identifier | Yes | `"01K88GEM5X8BDHWWVY819YRJTA"` |
| `folder_id` | Folder ID where tests will be organized | Yes | `"01K88GFKKP1TDP3AYBP725BW7C"` |
| `assignee` | User ID to assign test runs | Yes | `1732948` |
| `environment_id` | Test environment configuration ID | Yes | `156450` |
| `test_url` | URL of your deployed application | Yes | `"https://demo.lambdatestinternal.com/"` |
| `use_duplication` | Enable test duplication for reliability | No | `true` or `false` |
| `template_test_run_id` | Template for duplicating test runs | No | `"01K8953PEH0M4R7KQKXSSM66PM"` |

#### How to Find Your Configuration Values

1. **project_id & folder_id**:
   - Log into [LambdaTest Dashboard](https://accounts.lambdatest.com/)
   - Navigate to your project
   - Copy the IDs from the URL or project settings

2. **assignee**:
   - Go to your LambdaTest profile settings
   - Your user ID will be displayed

3. **environment_id**:
   - Navigate to Settings > Environments
   - Select or create an environment
   - Copy the environment ID

4. **test_url**:
   - Use your deployed application URL
   - For local testing: `http://localhost:5174`
   - For production: `https://demo.lambdatestinternal.com/`

### Step 4: Using the GitHub App

Once configured, you can generate test cases automatically:

1. **Create a Pull Request** on GitHub with your changes
2. **Add a comment** to the PR with:
   ```
   @LambdaTest Generate test cases
   ```
3. **Watch the magic happen!** The LambdaTest bot will:
   - Analyze your code changes
   - Generate relevant test cases
   - Create automated tests
   - Run tests and report results

#### Example PR Comment Commands

```bash
# Generate test cases for the entire PR
@LambdaTest Generate test cases

# Generate specific test types
@LambdaTest Generate UI test cases
@LambdaTest Generate API test cases

# Run existing tests
@LambdaTest Run tests
```

### Step 5: Verify Integration

1. Check that the `.lambdatest/config.yaml` file is committed to your repository
2. Ensure the LambdaTest bot appears in your repository's integrations
3. Create a test PR and trigger test generation to verify everything works

---

## Configuration

### Backend Configuration

The backend can be configured through environment variables or the `.env` file:

```env
# Server
PORT=5000                    # Backend server port
NODE_ENV=development         # Environment (development/production)

# CORS
FRONTEND_URL=http://localhost:5174   # Frontend URL for CORS

# Authentication
JWT_SECRET=your-secret-key   # JWT signing secret
JWT_EXPIRES_IN=7d           # Token expiration time

# Database (Optional)
USE_MOCK_DATA=true          # Use mock data instead of MongoDB
MONGODB_URI=mongodb://localhost:27017/airbnb-clone
```

### Frontend Configuration

The frontend uses Vite for configuration. Edit `frontend/vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

### Demo Credentials

The application comes with pre-configured demo users:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| `lambdatestadmin@email.com` | `password123` | Host/Admin | LambdaTest admin account |
| `abhishekkumar@lambdatest.com` | `password123` | Host | Developer account |
| `demo@lambdatest.com` | `password123` | Host | Demo account |
| `sarah.johnson@email.com` | `password123` | Host | Sample host |
| `emma.davis@email.com` | `password123` | Guest | Sample guest |

See [DEMO_CREDENTIALS.md](./DEMO_CREDENTIALS.md) for complete list.

---

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Production Build

**Build Frontend:**
```bash
cd frontend
npm run build
```

This creates an optimized production build in `frontend/dist/`.

**Build Backend:**
```bash
cd backend
npm run build
```

This compiles TypeScript to JavaScript in `backend/dist/`.

**Run Production Server:**
```bash
cd backend
npm start
```

### Running Tests

**Backend Tests:**
```bash
cd backend
npm test
```

**Frontend Tests:**
```bash
cd frontend
npm test
```

---

## Deployment

### Prerequisites for Deployment

- Domain name configured
- SSL certificate for HTTPS
- Server with Node.js installed
- Environment variables configured

### Deployment Steps

1. **Build the Application:**
```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd ../backend
npm run build
```

2. **Set Environment Variables:**
```bash
export NODE_ENV=production
export JWT_SECRET=your-production-secret
export FRONTEND_URL=https://demo.lambdatestinternal.com
```

3. **Start the Server:**
```bash
cd backend
npm start
```

4. **Serve Frontend:**
Use a web server like Nginx to serve the `frontend/dist/` directory.

**Example Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name demo.lambdatestinternal.com;

    root /path/to/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Using GitHub Actions for CI/CD

This repository includes GitHub Actions workflows in `.github/workflows/`:

- **build-and-deploy.yml**: Automatically builds and deploys on push to main branch
- Integrates with LambdaTest for automated testing

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5174
```

**Solution:**
```bash
# Find and kill the process using the port
lsof -ti:5174 | xargs kill -9  # Frontend
lsof -ti:5000 | xargs kill -9  # Backend
```

#### Issue: CORS Errors

**Error:**
```
Access to fetch at 'http://localhost:5000/api/listings' from origin 'http://localhost:5174' has been blocked by CORS policy
```

**Solution:**
- Check that backend is running on port 5000
- Verify `FRONTEND_URL` in backend `.env` matches your frontend port
- Clear browser cache and reload

#### Issue: Failed to Load Listings

**Solution:**
1. Verify backend server is running
2. Check browser console for errors
3. Ensure `USE_MOCK_DATA=true` in backend `.env`
4. Restart both frontend and backend servers

#### Issue: npm install Peer Dependency Conflicts

**Solution:**
```bash
npm install --legacy-peer-deps
```

#### Issue: LambdaTest GitHub App Not Triggering

**Solution:**
1. Verify `.lambdatest/config.yaml` exists and is committed
2. Check that you have admin access to the repository
3. Ensure LambdaTest app is installed for your repository
4. Try re-commenting with `@LambdaTest Generate test cases`
5. Check LambdaTest dashboard for any error messages

#### Issue: TypeScript Compilation Errors

**Solution:**
```bash
# Clean and rebuild
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

---

## Project Structure

```
Abhishek-Github-App-Demo/
├── .github/
│   └── workflows/           # GitHub Actions CI/CD
│       └── build-and-deploy.yml
├── .lambdatest/
│   └── config.yaml          # LambdaTest configuration
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── data/            # Mock data
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── index.ts         # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   ├── styles/          # CSS styles
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── DEMO_CREDENTIALS.md      # Demo user credentials
├── INSTALLATION.md          # This file
├── README.md                # Project overview
└── package.json
```

---

## Additional Resources

### Documentation
- [Demo Credentials](./DEMO_CREDENTIALS.md) - All demo user accounts
- [README.md](./README.md) - Project overview and features
- [Architecture Documentation](./ARCHITECTURE.md) - Detailed architecture guide

### External Links
- [LambdaTest Documentation](https://www.lambdatest.com/support/docs/)
- [LambdaTest GitHub App](https://github.com/apps/lambdatest-ai-cloud)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

### Support
- **GitHub Issues**: [Report a bug](https://github.com/AbhishekLambda/Abhishek-Github-App-Demo/issues)
- **LambdaTest Support**: support@lambdatest.com
- **Project Maintainer**: Abhishek Kumar

---

## License

This project is for demonstration purposes. Please check the repository for license details.

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
6. Add `@LambdaTest Generate test cases` to trigger automated testing

---

**Last Updated**: October 27, 2024
