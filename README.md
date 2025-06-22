# 🏠 Casa Vis - Real Estate Management System

**Modern real estate platform with comprehensive admin dashboard**

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd casa-vis

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:8080
```

### Admin Access

- **URL**: `http://localhost:8080/admin/login`
- **Password**: `admin123`

---

## 📁 Project Structure

```
casa-vis/
├── src/
│   ├── config/
│   │   └── app.ts              # 🎛️ Configurare centralizată
│   ├── components/
│   │   ├── ui/                 # 🎨 Componente UI Radix
│   │   ├── admin/              # 👨‍💼 Componente admin
│   │   ├── Banner.tsx          # 📢 Banner homepage
│   │   ├── Footer.tsx          # 🦶 Footer cu Maps
│   │   └── Navigation.tsx      # 🧭 Navbar
│   ├── pages/
│   │   ├── admin/              # 📊 Pagini admin
│   │   ├── Index.tsx           # 🏠 Homepage
│   │   ├── Properties.tsx      # 🏘️ Lista proprietăți
│   │   └── Team.tsx            # 👥 Echipa
│   ├── hooks/                  # 🪝 Custom hooks
│   ├── services/               # 🔌 API services
│   ├── types/                  # 📝 TypeScript types
│   └── utils/                  # 🛠️ Utilități
├── public/                     # 📁 Fișiere statice
└── docs/                       # 📚 Documentație
```

---

## ⚙️ Configurare Rapidă

### 1. Schimbă Datele Companiei

Editează `src/config/app.ts`:

```typescript
export const COMPANY_CONFIG = {
  name: "Casa Vis", // ✏️ Numele companiei
  tagline: "Experți în tranzacții", // ✏️ Slogan
  logoText: "CV", // ✏️ Logo text
  contact: {
    phone: "+40 768 111 564", // ✏️ Telefon
    email: "office@casavis.ro", // ✏️ Email
    whatsapp: "+40 768 111 564", // ✏️ WhatsApp
  },
  address: {
    street: "Str. Bulevardul Republicii 17",
    city: "Onești",
    county: "Bacău",
    coordinates: "46.248576915439685, 26.766675025241923",
  },
};
```

### 2. Personalizează Culorile

```typescript
export const DESIGN_CONFIG = {
  colors: {
    primary: "#dc2626", // ✏️ Culoarea principală
    primaryDark: "#b91c1c", // ✏️ Hover effects
  },
};
```

### 3. Configurează Banner-ul

```typescript
banner: {
  enabled: true,
  title: "Găsește-ți casa visurilor tale!",
  subtitle: "Consultanță gratuită pentru toate proprietățile noastre",
  buttonText: "Contactează-ne acum",
  buttonLink: "/contact",
  backgroundColor: "#dc2626",
},
```

---

## 🎨 Design Features

### Fonts & Typography

- **Primary**: Poppins (modern, clean)
- **Headings**: Playfair Display (elegant, luxury)
- **Optimized for Real Estate**: Professional, trustworthy

### Color Scheme

- **Primary**: Red (#dc2626) - attention-grabbing
- **Supporting**: Slate grays for balance
- **Customizable**: Easy theme switching

### Responsive Design

- **Mobile-first** approach
- **Tablet** optimized layouts
- **Desktop** full experience
- **Touch-friendly** interfaces

---

## 👨‍💼 Admin Dashboard Features

### 🏠 Properties Management

- ✅ **CRUD Operations**: Create, Read, Update, Delete
- ✅ **Rich Media**: Video tours, image galleries
- ✅ **SEO Optimization**: Meta titles, descriptions
- ✅ **Status Management**: Draft, Published, Sold
- ✅ **Analytics Integration**: View counts, engagement

### 👥 Team Management

- ✅ **Agent Profiles**: Photos, bio, specializations
- ✅ **Role Management**: Manager, Senior Agent, Agent
- ✅ **Performance Tracking**: Sales count, properties managed
- ✅ **Contact Integration**: Direct communication

### 📊 Analytics & Reporting

- ✅ **Real-time Statistics**: Visitors, page views, sessions
- ✅ **Interactive Charts**: Daily stats, popular pages
- ✅ **Visitor Logs**: IP tracking, device info, duration
- ✅ **Export Functionality**: CSV downloads
- ✅ **Custom Periods**: 24h, 7d, 30d, 90d

### ⚙️ Site Settings

- ✅ **Global Configuration**: Company info, contact details
- ✅ **Banner Management**: Homepage banner customization
- ✅ **Design Controls**: Colors, logo, branding
- ✅ **Maps Integration**: Google Maps coordinates
- ✅ **Feature Toggles**: Enable/disable functionality

---

## 🔌 Backend Integration Ready

### Database Models

Complete TypeScript models in `src/types/models.ts`:

- **Property**: Full real estate listing structure
- **TeamMember**: Agent/staff management
- **Contact**: Lead management system
- **VisitorSession**: Analytics tracking
- **SiteSettings**: Configuration management

### API Services

Pre-built API integration in `src/services/api.ts`:

- **RESTful endpoints** structure
- **React Query** hooks for data fetching
- **Error handling** and loading states
- **Caching strategies** built-in

### Environment Configuration

```bash
# .env.local
VITE_API_URL=http://localhost:3001/api
VITE_APP_ENV=development
VITE_ANALYTICS_ENABLED=true
```

---

## 📱 Frontend Features

### 🏠 Homepage

- **Hero Section**: Compelling call-to-action
- **Property Search**: Integrated search functionality
- **Banner**: Customizable promotional banner
- **WhatsApp Integration**: Direct contact button

### 🏘️ Properties Listing

- **Grid Layout**: Responsive property cards
- **Video Players**: Virtual tour integration
- **Filtering**: Advanced property filters
- **Pagination**: Optimized loading

### 👥 Team Page

- **Agent Profiles**: Professional presentation
- **Contact Integration**: Direct communication
- **Role Hierarchy**: Clear organization structure

### 🦶 Footer

- **Three-column Layout**: Contact, Maps, Navigation
- **Google Maps Integration**: Direct location access
- **Social Media**: Configurable social links
- **SEO Links**: Legal pages, policies

---

## 🔒 Security Features

### Authentication

- **JWT Tokens**: Secure admin authentication
- **Session Management**: Persistent login state
- **Role-based Access**: Granular permissions
- **Password Protection**: Secure admin panel

### Data Protection

- **Input Validation**: Zod schema validation
- **XSS Prevention**: Sanitized inputs
- **CSRF Protection**: Secure form submissions
- **Environment Variables**: Secure configuration

---

## 📈 SEO & Performance

### Search Engine Optimization

- **Meta Tags**: Dynamic page titles, descriptions
- **Structured Data**: Real estate schema markup
- **Clean URLs**: SEO-friendly routing
- **Sitemap Ready**: Automatic sitemap generation

### Performance Optimization

- **Code Splitting**: Lazy loading routes
- **Image Optimization**: Responsive images
- **Caching**: React Query caching strategy
- **Bundle Analysis**: Optimized build size

---

## 🚀 Deployment

### Development

```bash
npm run dev          # Start development server
npm run typecheck    # TypeScript validation
npm test            # Run tests
```

### Production Build

```bash
npm run build       # Create production build
npm run preview     # Preview production build
```

### Environment Setup

```bash
# Production environment variables
VITE_API_URL=https://api.casavis.ro/api
VITE_APP_ENV=production
VITE_ANALYTICS_ENABLED=true
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 📚 Documentation

### Quick Guides

- **`README_CUSTOMIZATION.md`**: 5-minute setup guide
- **`CUSTOMIZATION_GUIDE.md`**: Complete customization
- **`DATA_LOCATIONS.md`**: Find any hardcoded data
- **`BACKEND_INTEGRATION.md`**: Backend developer guide

### Technical Documentation

- **TypeScript Models**: `src/types/models.ts`
- **API Services**: `src/services/api.ts`
- **Configuration**: `src/config/app.ts`

---

## 🛠️ Technology Stack

### Frontend

- **React 18**: Latest React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **TailwindCSS**: Utility-first styling
- **React Router**: Client-side routing

### UI Components

- **Radix UI**: Accessible component primitives
- **Lucide Icons**: Modern icon library
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **Recharts**: Data visualization

### State Management

- **React Query**: Server state management
- **Context API**: Global state management
- **LocalStorage**: Persistent settings

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Vitest**: Unit testing
- **TypeScript**: Static type checking

---

## 🆘 Support & Troubleshooting

### Common Issues

**Logo not displaying**

- Check file exists in `public/` folder
- Verify path in `src/config/app.ts`
- Clear browser cache (Ctrl+F5)

**Colors not changing**

- Restart dev server: `npm run dev`
- Check CSS syntax in configuration
- Verify hex color format: `#dc2626`

**Admin login issues**

- Correct URL: `/admin/login`
- Default password: `admin123`
- Check browser console for errors

**WhatsApp not working**

- Verify phone number format
- Check `enableWhatsApp: true` in config
- Ensure number includes country code

### Performance Tips

- Use WebP images for better compression
- Implement lazy loading for large image galleries
- Enable gzip compression on server
- Use CDN for static assets

### Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

---

## 📊 Analytics Integration

### Google Analytics 4

```typescript
// src/config/app.ts
googleAnalytics: {
  measurementId: "G-XXXXXXXXXX",
  enabled: true,
},
```

### Custom Analytics

- **Visitor Tracking**: IP, device, location
- **Page Views**: Duration, scroll depth
- **Conversion Tracking**: Contact forms, calls
- **Performance Metrics**: Load times, errors

---

## 🔮 Future Enhancements

### Planned Features

- **Multi-language Support**: Romanian/English
- **Advanced Search**: Map-based property search
- **Virtual Tours**: 360° property views
- **CRM Integration**: Lead management system
- **Mobile App**: React Native companion

### API Extensions

- **Property Favorites**: User wishlist
- **Price Alerts**: Automated notifications
- **Market Analytics**: Price trends, insights
- **Document Management**: Contracts, certificates

---

## 🤝 Contributing

### Development Guidelines

1. **Follow TypeScript**: Strict type checking
2. **Use Existing Components**: Radix UI library
3. **Maintain Consistency**: Follow design system
4. **Write Tests**: Unit tests for utilities
5. **Document Changes**: Update README

### Code Style

- **ESLint**: Follow linting rules
- **Prettier**: Automatic formatting
- **Conventional Commits**: Structured commit messages
- **Component Structure**: Consistent file organization

---

## 📄 License

**Private Project** - All rights reserved

---

## 📞 Contact & Support

**Casa Vis Development Team**

- 📧 Email: office@casavis.ro
- 📱 Phone: +40 768 111 564
- 🌐 Website: [casavis.ro](https://casavis.ro)

---

**🏠 Built with ❤️ for the Romanian real estate market**
