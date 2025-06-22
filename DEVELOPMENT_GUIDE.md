# Casa Vis Development Guide

## 🐛 Issues Fixed

### 1. Network Error: Backend API Connection

**Problem**: The frontend couldn't connect to the backend API, causing "AxiosError: Network Error"

**Solution**:

- Added Vite proxy configuration with mock API fallbacks
- When backend is unavailable, the proxy serves mock property and team data
- Frontend now works independently of backend status

### 2. TypeError: properties.map is not a function

**Problem**: Properties state wasn't initialized as an array, causing mapping errors

**Solution**:

- Added fallback data in Index.tsx and Properties.tsx
- Created type-safe Property interface for API responses
- Ensured proper error handling in useProperties hook

## 🏃‍♂️ Running the Application

### Frontend Only (Recommended for Development)

```bash
npm run dev
```

The frontend will run on `http://localhost:8080` with mock API data.

### Full Stack (Frontend + Backend)

1. Start backend first:

```bash
node run-backend.js
```

2. In another terminal, start frontend:

```bash
npm run dev
```

### Alternative Backend Start

```bash
cd backend
node start-dev.js
```

## 🔧 Configuration

### Environment Variables

Backend uses `.env` file with:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=casavis2
JWT_SECRET=secret-ul-tau-super-sigur-1234567890-schimba-asta-urgent
JWT_EXPIRES_IN=24h
PORT=3001
```

### API Configuration

- Frontend API base URL: `http://localhost:3001/api`
- Proxy configuration in `vite.config.ts`
- Mock data fallbacks for offline development

## 📊 Mock Data Available

### Properties

- Garsonieră ultracentral (București)
- Apartament 2 camere (Cluj-Napoca)
- Casă cu grădină (Timișoara)

### Team Members

- Mihai Eminescu (Manager)
- Veronica Micle (Agent senior)

### Analytics

- Mock visitor stats
- Sample analytics data

## 🛠️ Development Tools

### Available Scripts

- `npm run dev` - Start frontend development server
- `npm run dev:backend` - Start backend server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run typecheck` - TypeScript validation

### Backend Scripts

- `npm run dev` - Start with nodemon (in backend directory)
- `npm start` - Start production server (in backend directory)

## 🔍 Troubleshooting

### Backend Connection Issues

1. Check if backend is running on port 3001
2. Verify `.env` file exists in backend directory
3. Test API directly: `curl http://localhost:3001/api/properties`
4. If backend fails, frontend will use mock data automatically

### Database Issues

- Backend has fallback to mock data when database is unavailable
- Check `backend/config/db.js` for database configuration
- Ensure MySQL is running if using real database

### Port Conflicts

- Frontend: 8080 (configurable in `vite.config.ts`)
- Backend: 3001 (configurable in `backend/.env`)
- Proxy automatically handles routing between them

## 🚀 Production Deployment

### Frontend

```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

### Backend

```bash
cd backend
npm start
# Ensure environment variables are set for production
```

## 📝 Key Files Modified

1. `vite.config.ts` - Added API proxy with mock fallbacks
2. `src/types/api.ts` - Simplified Property interface
3. `src/pages/Index.tsx` - Added error handling and fallback data
4. `src/pages/Properties.tsx` - Fixed mapping errors with fallback data
5. `backend/routes/*.js` - Added database fallbacks to mock data
6. `backend/start-dev.js` - Enhanced server startup with CORS

## 🔄 Next Steps

1. **Database Setup**: Import `backend/casavis2.sql` to MySQL for full functionality
2. **Environment Variables**: Update `.env` files for production
3. **Image Upload**: Configure file upload for property images
4. **Authentication**: Test admin login functionality
5. **Analytics**: Connect to real analytics service if needed

## 📞 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify all dependencies are installed (`npm install`)
3. Ensure ports 8080 and 3001 are available
4. Check this guide for common solutions
