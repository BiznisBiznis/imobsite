# 🎨 Ghid de Personalizare - TRÂMBIȚAȘU ESTATE

Acest ghid îți arată exact unde și cum să personalizezi toate aspectele aplicației.

## 📋 Cuprins

1. [Configurare Rapidă](#configurare-rapidă)
2. [Schimbarea Logo-ului](#schimbarea-logo-ului)
3. [Modificarea Datelor Companiei](#modificarea-datelor-companiei)
4. [Personalizarea Culorilor](#personalizarea-culorilor)
5. [Înlocuirea Imaginilor](#înlocuirea-imaginilor)
6. [Modificarea Datelor Hardcodate](#modificarea-datelor-hardcodate)
7. [Configurarea JWT și Securității](#configurarea-jwt-și-securității)
8. [Conectarea la Backend](#conectarea-la-backend)
9. [Configurarea Analytics](#configurarea-analytics)

---

## 🚀 Configurare Rapidă

### Pasul 1: Configurează datele de bază

Editează fișierul **`src/config/app.ts`** și modifică:

```typescript
export const COMPANY_CONFIG = {
  name: "NUMELE TAU COMPANIE", // ✏️ Schimbă aici
  tagline: "Slogan-ul tău", // ✏️ Schimbă aici
  logoText: "LC", // ✏️ Inițialele companiei
  contact: {
    phone: "+40 123 456 789", // ✏️ Numărul tău
    email: "office@compania-ta.ro", // ✏️ Email-ul tău
  },
};
```

### Pasul 2: Schimbă culorile

În același fișier:

```typescript
export const DESIGN_CONFIG = {
  colors: {
    primary: "#your-color", // ✏️ Culoarea ta principală
    primaryDark: "#your-dark-color", // ✏️ Varianta mai închisă
  },
};
```

---

## 🎯 Schimbarea Logo-ului

### Opțiunea 1: Logo cu Imagine

1. **Pune imaginea** în folderul `public/`:

   ```
   public/
   ├── logo.png        ← Pune logo-ul aici
   ├── logo-white.png  ← Versiunea albă (pentru footer)
   └── favicon.ico     ← Iconița din browser
   ```

2. **Configurează în** `src/config/app.ts`:
   ```typescript
   export const COMPANY_CONFIG = {
     logoImage: "/logo.png", // ✏️ Calea către logo
     logoSize: {
       width: 40, // ✏️ Lățimea logo-ului
       height: 40, // ✏️ Înălțimea logo-ului
     },
   };
   ```

### Opțiunea 2: Logo cu Text

Dacă preferi text în loc de imagine:

```typescript
export const COMPANY_CONFIG = {
  logoText: "MC", // ✏️ Inițialele companiei
  logoImage: undefined, // ✏️ Lasă undefined pentru text
};
```

### Unde se afișează logo-ul:

- **Navbar**: `src/components/Navigation.tsx` (linia ~47)
- **Footer**: `src/components/Footer.tsx` (linia ~25)
- **Admin Sidebar**: `src/components/admin/AdminSidebar.tsx` (linia ~28)

---

## 🏢 Modificarea Datelor Companiei

### Contact și Adresa

În `src/config/app.ts`:

```typescript
export const COMPANY_CONFIG = {
  contact: {
    phone: "+40 XXX XXX XXX", // ✏️ Telefonul companiei
    email: "office@compania-ta.ro", // ✏️ Email-ul companiei
    whatsapp: "+40 XXX XXX XXX", // ✏️ WhatsApp (poate fi diferit)
  },

  address: {
    street: "Str. Ta Nr. 123", // ✏️ Strada
    city: "Orașul Tău", // ✏️ Orașul
    county: "Județul Tău", // ✏️ Județul
    country: "România", // ✏�� Țara
    postalCode: "123456", // ✏️ Codul poștal
  },

  social: {
    facebook: "https://facebook.com/pagina-ta", // ✏️ Facebook
    instagram: "https://instagram.com/contul-tau", // ✏️ Instagram
    linkedin: "https://linkedin.com/company/...", // ✏️ LinkedIn
    youtube: "https://youtube.com/@canalul-tau", // ✏️ YouTube
  },
};
```

---

## 🎨 Personalizarea Culorilor

### Schimbarea Culorilor Principale

În `src/config/app.ts`:

```typescript
export const DESIGN_CONFIG = {
  colors: {
    primary: "#your-main-color", // ✏️ Culoarea principală (butoane, linkuri)
    primaryDark: "#your-dark-color", // ✏️ Pentru hover effects
    secondary: "#your-secondary", // ✏️ Culoare secundară
    accent: "#your-accent", // ✏️ Culoare accent
  },
};
```

### Exemple de combinații de culori:

```typescript
// Albastru profesional
colors: {
  primary: "#2563eb",      // Albastru
  primaryDark: "#1d4ed8",  // Albastru închis
  secondary: "#64748b",    // Gri
  accent: "#f59e0b",       // Galben
},

// Verde natural
colors: {
  primary: "#059669",      // Verde
  primaryDark: "#047857",  // Verde închis
  secondary: "#6b7280",    // Gri
  accent: "#ea580c",       // Portocaliu
},

// Mov elegant
colors: {
  primary: "#7c3aed",      // Mov
  primaryDark: "#6d28d9",  // Mov închis
  secondary: "#64748b",    // Gri
  accent: "#f59e0b",       // Galben
},
```

### Unde să aplici culorile manual

Dacă vrei să personalizezi și mai mult, editează fișierul `src/index.css`:

```css
:root {
  --primary: your-color-code;
  --primary-dark: your-dark-color-code;
}
```

---

## 🖼️ Înlocuirea Imaginilor

### Imaginile Hero (de fundal)

În `src/config/app.ts`:

```typescript
export const DESIGN_CONFIG = {
  heroImages: {
    homepage: "URL_LA_IMAGINEA_HOMEPAGE", // ✏️ Pagina principală
    properties: "URL_LA_IMAGINEA_PROPRIETATI", // ✏️ Pagina proprietăți
    team: "URL_LA_IMAGINEA_ECHIPA", // ✏️ Pagina echipă
    contact: "URL_LA_IMAGINEA_CONTACT", // ✏️ Pagina contact
  },
};
```

### Cum să găsești imagini gratuite:

1. **Pexels**: https://pexels.com (folosit acum)
2. **Unsplash**: https://unsplash.com
3. **Pixabay**: https://pixabay.com

### Dimensiuni recomandate:

- **Hero images**: 1920x1080px (Full HD)
- **Logo**: 200x200px (pătrat) sau 300x100px (dreptunghi)
- **Proprietăți**: 400x300px
- **Echipă**: 400x400px (pătrat pentru profiluri)

### Salvarea imaginilor local

Dacă vrei să salvezi imaginile local în loc să folosești URL-uri:

1. **Pune imaginile** în `public/images/`:

   ```
   public/
   └── images/
       ├── hero-home.jpg
       ├── hero-properties.jpg
       ├── hero-team.jpg
       └── hero-contact.jpg
   ```

2. **Actualizează config**:
   ```typescript
   heroImages: {
     homepage: "/images/hero-home.jpg",     // ✏️ Cale locală
     properties: "/images/hero-properties.jpg",
     // ...
   },
   ```

---

## 📝 Modificarea Datelor Hardcodate

### Proprietăți (Mock Data)

**Locația**: `src/pages/Properties.tsx` (linia ~8-80)

```typescript
const mockProperties = [
  {
    id: "1",
    title: "Titlul proprietății tale", // ✏️ Modifică aici
    price: 85000, // ✏️ Prețul în EUR
    location: "Locația ta", // ✏️ Adresa
    area: 65, // ✏️ Suprafața în mp
    rooms: 2, // ✏️ Numărul de camere
    type: "Apartament cu 2 camere de vânzare", // ✏️ Tipul
    videoUrl: "URL_CATRE_VIDEO", // ✏️ Link video
    thumbnailUrl: "URL_CATRE_IMAGINE", // ✏️ Imagine preview
    badges: ["Nou", "Exclusiv"], // ✏️ Badge-uri opționale
  },
  // Adaugă mai multe proprietăți...
];
```

### Echipa (Mock Data)

**Locația**: `src/pages/Team.tsx` (linia ~6-50)

```typescript
const teamMembers = [
  {
    id: 1,
    name: "Numele Agentului", // ✏️ Numele complet
    role: "Agent imobiliar", // ✏️ Funcția
    phone: "+40 123 456 789", // ✏️ Telefonul
    email: "agent@compania-ta.ro", // ✏️ Email-ul
    image: "URL_CATRE_POZA_PROFIL", // ✏️ Poza de profil
  },
  // Adaugă mai mulți membri...
];
```

### Categoriile de Proprietăți

**Locația**: `src/components/admin/PropertyForm.tsx` (linia ~40-50)

```typescript
const propertyTypes = [
  "Apartament cu 1 camera de vânzare", // ✏️ Modifică sau adaugă
  "Apartament cu 2 camere de vânzare",
  "Casa de vânzare",
  "Vila de vânzare",
  "Teren de vânzare",
  "Spațiu comercial de vânzare",
  // Adaugă tipurile tale...
];
```

### Rolurile Echipei

**Locația**: `src/components/admin/TeamMemberForm.tsx` (linia ~35-42)

```typescript
const roles = [
  "Manager", // ✏️ Modifică sau adaugă
  "Agent imobiliar",
  "Agent imobiliar senior",
  "Consultant imobiliar",
  "Director vânzări",
  // Adaugă rolurile tale...
];
```

---

## 🔐 Configurarea JWT și Securității

### Setări JWT pentru Producție

În `src/config/app.ts`:

```typescript
export const ADMIN_CONFIG = {
  // Pentru dezvoltare (va fi înlocuit de backend)
  defaultPassword: "parola-ta-admin", // ✏️ Parola temporară

  jwt: {
    // ⚠️ IMPORTANT: Schimbă acest secret în producție!
    secret: "secret-ul-tau-super-sigur-1234567890-schimba-asta-urgent",
    expiresIn: "24h", // ✏️ Durata token-ului
    issuer: "compania-ta-admin", // ✏️ Numele companiei
    audience: "compania-ta-frontend", // ✏️ Pentru ce este token-ul
  },

  api: {
    baseUrl: "https://api.compania-ta.ro/api", // ✏️ URL-ul backend-ului
    authEndpoint: "/auth/login",
    validateEndpoint: "/auth/validate",
  },
};
```

### Generarea unui Secret JWT Sigur

Pentru un secret JWT sigur, folosește una din aceste metode:

```bash
# Metoda 1: Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Metoda 2: Online generator
# Mergi la: https://randomkeygen.com/ (256-bit WPA Key)

# Metoda 3: OpenSSL
openssl rand -hex 64
```

### Variables de Mediu pentru Producție

Creează fișierul `.env.production`:

```bash
# Backend API
VITE_API_URL=https://api.compania-ta.ro/api

# JWT Settings
VITE_JWT_SECRET=secret-ul-tau-generat-de-mai-sus
VITE_JWT_EXPIRES_IN=24h

# App Info
VITE_APP_NAME=Compania Ta Estate
VITE_APP_VERSION=1.0.0

# Analytics
VITE_ANALYTICS_ENABLED=true
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🔌 Conectarea la Backend

### Pasul 1: Pregătirea pentru Backend

În `.env.local`:

```bash
VITE_API_URL=http://localhost:3001/api         # ✏️ URL-ul backend-ului local
VITE_APP_ENV=development
```

În `.env.production`:

```bash
VITE_API_URL=https://api.compania-ta.ro/api    # ✏️ URL-ul backend-ului live
VITE_APP_ENV=production
```

### Pasul 2: Activarea Backend-ului

În `src/App.tsx`, înlocuiește import-ul:

```typescript
// ÎNAINTE (mock data)
import { AdminAuthProvider } from "@/hooks/useAdminAuth";

// DUPĂ (backend real)
import { AdminAuthProvider } from "@/hooks/useAdminAuthBackend";
```

### Pasul 3: Înlocuirea Mock Data cu API

#### Pentru Proprietăți

În `src/pages/admin/AdminProperties.tsx`:

```typescript
// ÎNAINTE (mock data)
const [properties, setProperties] = useState(mockProperties);

// DUPĂ (API calls)
import {
  useProperties,
  useCreateProperty,
  useUpdateProperty,
  useDeleteProperty,
} from "@/hooks/useApi";

const { data: properties, isLoading, error } = useProperties();

const createProperty = useCreateProperty();
const updateProperty = useUpdateProperty();
const deleteProperty = useDeleteProperty();
```

#### Pentru Echipă

În `src/pages/admin/AdminTeam.tsx`:

```typescript
// ÎNAINTE (mock data)
const [teamMembers, setTeamMembers] = useState(mockTeamMembers);

// DUPĂ (API calls)
import {
  useTeam,
  useCreateTeamMember,
  useUpdateTeamMember,
  useDeleteTeamMember,
} from "@/hooks/useApi";

const { data: teamMembers, isLoading, error } = useTeam();
```

### Pasul 4: Backend API Endpoints

Backend-ul trebuie să implementeze:

```
Authentication:
POST   /api/auth/login          # Login admin
GET    /api/auth/validate       # Validare token

Properties:
GET    /api/properties          # Lista proprietăți
POST   /api/properties          # Creează proprietate
GET    /api/properties/:id      # Proprietate specifică
PUT    /api/properties/:id      # Actualizează proprietate
DELETE /api/properties/:id      # Șterge proprietate

Team:
GET    /api/team               # Lista echipă
POST   /api/team               # Creează membru
GET    /api/team/:id           # Membru specific
PUT    /api/team/:id           # Actualizează membru
DELETE /api/team/:id           # Șterge membru

Analytics:
GET    /api/analytics/stats    # Statistici generale
GET    /api/analytics/logs     # Loguri vizitatori
POST   /api/analytics/track    # Înregistrează vizită
```

---

## 📊 Configurarea Analytics

### Google Analytics

În `src/config/app.ts`:

```typescript
export const ANALYTICS_CONFIG = {
  googleAnalytics: {
    measurementId: "G-XXXXXXXXXX", // ✏️ ID-ul tău GA4
    enabled: true, // ✏️ Activează GA
  },
};
```

### Custom Analytics

Pentru analytics propriu:

```typescript
export const ANALYTICS_CONFIG = {
  enabled: true, // ✏️ Activează tracking
  advancedTracking: true, // ✏️ IP, device info, etc.
  dashboardRefreshInterval: 5 * 60 * 1000, // ✏️ Refresh la 5 minute
};
```

---

## 🎛️ Configurări Avansate

### Funcții On/Off

În `src/config/app.ts`:

```typescript
export const FEATURES_CONFIG = {
  enableWhatsApp: true, // ✏️ Butonul WhatsApp
  enableContactForm: true, // ✏️ Formularul de contact
  enablePropertyFilters: true, // ✏️ Filtrele proprietăți
  enableTeamProfiles: true, // ✏️ Profilurile echipei
  enableAnalytics: true, // ✏️ Dashboard analytics

  pagination: {
    propertiesPerPage: 9, // ✏️ Proprietăți per pagină
    logsPerPage: 50, // ✏️ Loguri per pagină
  },
};
```

### Validări Formular

```typescript
export const FEATURES_CONFIG = {
  validation: {
    minPasswordLength: 8, // ✏️ Lungime minimă parolă
    maxTitleLength: 100, // ✏️ Lungime maximă titlu
    maxDescriptionLength: 1000, // ✏️ Lungime maximă descriere
    allowedImageTypes: [
      // ✏️ Tipuri imagine permise
      "image/jpeg",
      "image/png",
      "image/webp",
    ],
    maxImageSize: 10 * 1024 * 1024, // ✏️ Dimensiune maximă: 10MB
  },
};
```

---

## 🚀 Lista de Verificare - Launch

Înainte să lansezi aplicația în producție:

### ✅ Configurare de bază

- [ ] Schimbat numele companiei în `src/config/app.ts`
- [ ] Actualizat datele de contact (telefon, email)
- [ ] Înlocuit logo-ul (`public/logo.png`)
- [ ] Personalizat culorile companiei

### ✅ Conținut

- [ ] Înlocuit toate imaginile hero
- [ ] Actualizat datele proprietăților mock
- [ ] Actualizat informațiile echipei
- [ ] Verificat toate textele și descrierile

### ✅ Securitate

- [ ] Generat secret JWT sigur
- [ ] Configurat backend API URL-urile
- [ ] Setat parole admin sigure
- [ ] Configurat HTTPS pentru producție

### ✅ Analytics și SEO

- [ ] Configurat Google Analytics
- [ ] Actualizat meta tags și favicon
- [ ] Testat tracking-ul vizitatorilor

### ✅ Testing

- [ ] Testat toate funcțiile admin
- [ ] Verificat responsive design
- [ ] Testat pe diferite browsere
- [ ] Verificat performanțele

---

## 🆘 Suport și Troubleshooting

### Probleme Frecvente

**1. Logo-ul nu se afișează**

- Verifică calea în `src/config/app.ts`
- Asigură-te că fișierul există în `public/`

**2. Culorile nu se schimbă**

- Refreshează cache-ul browserului (Ctrl+F5)
- Verifică sintaxa CSS în configurare

**3. Datele nu se actualizează**

- Verifică că ai modificat fișierele corecte
- Restartează dev server-ul

**4. Erori de autentificare**

- Verifică JWT secret-ul
- Controlează URL-ul backend-ului

### Unde să cauți ajutor

1. **Fișiere de configurare**: `src/config/app.ts`
2. **Documentația backend**: `BACKEND_INTEGRATION.md`
3. **Console browser**: F12 → Console tab
4. **Network tab**: Pentru debugging API calls

---

🎉 **Felicitări!** Ai personalizat cu succes aplicația pentru compania ta!
