# 📍 Locații Date Hardcodate - Ghid de Modificare

Acest document listează exact unde să găsești și să modifici toate datele hardcodate din aplicație.

## 🏠 PROPRIETĂȚI - Mock Data

### 📁 Locația Principală: `src/pages/Properties.tsx`

**Linia**: 8-80

```typescript
const mockProperties = [
  {
    id: "1", // ✏️ ID unic
    title: "Garsonieră dublă ultracentral...", // ✏️ Titlul proprietății
    price: 61000, // ✏️ Prețul în EUR
    location: "Apartament cu 1 camera...", // ✏️ Descrierea locației
    area: 35, // ✏️ Suprafața în mp
    rooms: 1, // ✏️ Numărul de camere
    type: "Apartament cu 1 camera de vânzare", // ✏️ Tipul proprietății
    videoUrl: "https://sample-videos.com...", // ✏️ Link către video
    thumbnailUrl: "https://images.unsplash...", // ✏️ Imagine preview
    badges: [], // ✏️ Badge-uri (ex: "Nou", "Redus")
  },
  // Adaugă mai multe proprietăți aici...
];
```

### 📁 Folosit și în: `src/pages/Index.tsx`

**Linia**: 10-80 (același array)

---

## 👥 ECHIPA - Mock Data

### 📁 Locația: `src/pages/Team.tsx`

**Linia**: 6-50

```typescript
const teamMembers = [
  {
    id: 1, // ✏️ ID unic
    name: "Alexandra Trâmbițașu", // ✏️ Numele complet
    role: "Manager", // ✏️ Funcția în echipă
    phone: "+40750840620", // ✏️ Numărul de telefon
    email: "alexandra.trambițașu@gmail.com", // ✏️ Adresa de email
    image: "https://images.unsplash.com...", // ✏️ URL poza de profil
  },
  // Adaugă mai mulți membri aici...
];
```

---

## 🎨 IMAGINI - Hardcodate

### 🖼️ Imagini Hero (Fundal)

#### Homepage Hero

**Locația**: `src/pages/Index.tsx`
**Linia**: ~112

```typescript
backgroundImage: 'url("https://images.pexels.com/photos/18788673/...")',
```

#### Properties Page

**Locația**: `src/pages/Properties.tsx` (dacă există hero)

```typescript
// Caută după "backgroundImage" sau "background-image"
```

### 🖼️ Imagini Proprietăți

**Locația**: În `mockProperties` array

```typescript
thumbnailUrl: "https://images.unsplash.com/photo-1560448204...",
videoUrl: "https://sample-videos.com/zip/10/mp4/...",
```

### 🖼️ Imagini Echipă

**Locația**: În `teamMembers` array

```typescript
image: "https://images.unsplash.com/photo-1494790108755...",
```

---

## 🏢 INFORMAȚII COMPANIE

### 📁 Configurare Centralizată: `src/config/app.ts`

**Tot fișierul este configurabil**

```typescript
export const COMPANY_CONFIG = {
  name: "TRÂMBIȚAȘU ESTATE", // ✏️ Numele companiei
  tagline: "Experți în tranzacții imobiliare", // ✏️ Slogan
  logoText: "TE", // ✏️ Logo text
  logoImage: "/logo.png", // ✏️ Logo imagine

  contact: {
    phone: "+40 768 111 564", // ✏️ Telefon principal
    email: "office@trambitas.ro", // ✏️ Email principal
    whatsapp: "+40 768 111 564", // ✏️ WhatsApp
  },

  address: {
    street: "Str. Exemplu Nr. 123", // ✏️ Strada
    city: "București", // ✏️ Orașul
    county: "Sector 1", // ✏️ Sectorul/Județul
    country: "România", // ✏️ Țara
    postalCode: "010123", // ✏️ Codul poștal
  },

  social: {
    facebook: "https://facebook.com/...", // ✏️ Facebook URL
    instagram: "https://instagram.com/...", // ✏️ Instagram URL
    linkedin: "https://linkedin.com/...", // ✏️ LinkedIn URL
    youtube: "https://youtube.com/...", // ✏️ YouTube URL
  },
};
```

---

## 🎨 DESIGN ȘI CULORI

### 📁 Locația: `src/config/app.ts`

```typescript
export const DESIGN_CONFIG = {
  colors: {
    primary: "#dc2626", // ✏️ Roșu principal
    primaryDark: "#b91c1c", // ✏️ Roșu hover
    secondary: "#64748b", // ✏️ Gri secundar
    accent: "#f59e0b", // ✏️ Accent galben
  },

  heroImages: {
    homepage: "https://images.pexels.com...", // ✏️ Fundal homepage
    properties: "https://images.pexels.com...", // ✏️ Fundal proprietăți
    team: "https://images.pexels.com...", // ✏️ Fundal echipă
    contact: "https://images.pexels.com...", // ✏️ Fundal contact
  },
};
```

---

## 📊 ANALYTICS - Mock Data

### 📁 Locația: `src/pages/admin/AdminAnalytics.tsx`

**Linia**: 20-80

```typescript
const mockVisitorLogs = [
  {
    id: 1,
    ip: "192.168.1.45", // ✏️ IP vizitator
    location: "București, România", // ✏️ Locația
    device: "Desktop", // ✏️ Tipul device
    browser: "Chrome 120", // ✏️ Browser-ul
    page: "/proprietati", // ✏️ Pagina vizitată
    timestamp: "2024-01-15 14:30:25", // ✏️ Data și ora
    duration: "2:45", // ✏️ Durata sesiunii
    referrer: "Google Search", // ✏️ Sursa traficului
  },
  // Adaugă mai multe loguri...
];

const mockDailyStats = [
  {
    date: "2024-01-09",
    visitors: 45, // ✏️ Vizitatori
    pageViews: 123, // ✏️ Vizualizări
    newUsers: 23, // ✏️ Utilizatori noi
  },
  // Adaugă mai multe statistici...
];
```

---

## 📝 FORMULARE - Opțiuni Dropdown

### 🏠 Tipuri Proprietăți

**Locația**: `src/components/admin/PropertyForm.tsx`
**Linia**: ~40

```typescript
const propertyTypes = [
  "Apartament cu 1 camera de vânzare", // ✏️ Adaugă/modifică tipuri
  "Apartament cu 2 camere de vânzare",
  "Apartament cu 3 camere de v��nzare",
  "Casa de vânzare",
  "Vila de vânzare",
  "Teren de vânzare",
  "Spațiu comercial de vânzare",
  "Apartament de închiriat", // ✏️ Pentru închirieri
  // Adaugă tipurile tale...
];
```

### 👥 Roluri Echipă

**Locația**: `src/components/admin/TeamMemberForm.tsx`
**Linia**: ~35

```typescript
const roles = [
  "Manager", // ✏️ Adaugă/modifică roluri
  "Agent imobiliar",
  "Agent imobiliar senior",
  "Consultant imobiliar",
  "Director vânzări",
  "Coordinator marketing",
  // Adaugă rolurile tale...
];
```

---

## 🔐 SECURITATE ȘI ADMIN

### 📁 Parola Admin: `src/config/app.ts`

```typescript
export const ADMIN_CONFIG = {
  defaultPassword: "admin123", // ✏️ Schimbă parola admin

  jwt: {
    secret: "your-super-secret-jwt-key...", // ✏️ Secret JWT (OBLIGATORIU de schimbat!)
    expiresIn: "24h", // ✏️ Durata token
    issuer: "trambitas-estate-admin", // ✏️ Cine emite token-ul
    audience: "trambitas-estate-frontend", // ✏️ Pentru cine este token-ul
  },
};
```

---

## 📱 WHATSAPP ȘI CONTACT

### 📁 Număr WhatsApp: `src/config/app.ts`

```typescript
contact: {
  whatsapp: "+40 768 111 564",                  // ✏️ Numărul WhatsApp
}
```

### 📁 Mesaj WhatsApp: `src/components/WhatsAppButton.tsx`

**Linia**: ~15

```typescript
const message = encodeURIComponent(
  `Bună ziua! Sunt interesat(ă) de proprietățile ${COMPANY_CONFIG.name}. Aș dori să aflu mai multe informații.`,
);
// ✏️ Modifică mesajul aici
```

---

## 🎯 TEXTE ȘI DESCRIERI

### 🏠 Homepage

#### Hero Section

**Locația**: `src/pages/Index.tsx`
**Linia**: ~130

```typescript
<h1>Bine ați venit la {COMPANY_CONFIG.name}</h1>
<p>{COMPANY_CONFIG.tagline}. Găsiți proprietatea perfectă...</p>
// ✏️ Modifică textele aici
```

#### Featured Properties Section

**Locația**: `src/pages/Index.tsx`
**Linia**: ~170

```typescript
<h2>Oferte imobiliare {COMPANY_CONFIG.name}</h2>
<p>Descoperă cele mai bune proprietăți din portofoliul nostru</p>
// ✏️ Modifică descrierile aici
```

### 📋 Properties Page

**Locația**: `src/pages/Properties.tsx`
**Linia**: ~100

```typescript
<h1>Oferte imobiliare TRÂMBIȚAȘU ESTATE</h1>
<p>Descoperă cele mai bune proprietăți din portofoliul nostru</p>
// ✏️ Modifică titlurile și descrierile aici
```

### 👥 Team Page

**Locația**: `src/pages/Team.tsx`
**Linia**: ~70

```typescript
<h1>Echipa noastră</h1>
<h2>Alătură-te echipei noastre!</h2>
<p>Suntem mereu în căutarea unor profesioniști...</p>
// ✏️ Modifică textele echipei aici
```

---

## 🔍 CUM SĂ GĂSEȘTI RAPID DATE HARDCODATE

### Caută în Visual Studio Code:

1. **Pentru prețuri**: Caută `price:` sau `€`
2. **Pentru telefoane**: Caută `"+40` sau `07`
3. **Pentru email-uri**: Caută `@gmail` sau `@`
4. **Pentru URL-uri imagini**: Caută `https://images` sau `unsplash`
5. **Pentru nume**: Caută `"Alexandru"` sau `"Alexandra"`
6. **Pentru locații**: Caută `"București"` sau `"Sector"`

### Folosește Grep în terminal:

```bash
# Găsește toate prețurile
grep -r "price:" src/

# Găsește toate imaginile
grep -r "https://images" src/

# Găsește toate telefoanele
grep -r "+40" src/

# Găsește toate email-urile
grep -r "@gmail" src/
```

---

## ⚡ SFATURI RAPIDE

### 🎯 Modificări Rapide (5 minute):

1. **Schimbă numele companiei**: `src/config/app.ts` → `COMPANY_CONFIG.name`
2. **Schimbă telefonul**: `src/config/app.ts` → `COMPANY_CONFIG.contact.phone`
3. **Schimbă culorile**: `src/config/app.ts` → `DESIGN_CONFIG.colors.primary`
4. **Schimbă parola admin**: `src/config/app.ts` → `ADMIN_CONFIG.defaultPassword`

### 🎨 Modificări Medii (30 minute):

1. **Înlocuiește proprietățile**: `src/pages/Properties.tsx` → `mockProperties`
2. **Actualizează echipa**: `src/pages/Team.tsx` → `teamMembers`
3. **Schimbă imaginile hero**: `src/config/app.ts` → `DESIGN_CONFIG.heroImages`

### 🔧 Modificări Avansate (2 ore):

1. **Conectează la backend**: Urmează `BACKEND_INTEGRATION.md`
2. **Customizează formulare**: Modifică `PropertyForm.tsx` și `TeamMemberForm.tsx`
3. **Adaugă funcții noi**: Folosește hook-urile din `src/hooks/useApi.ts`

---

📝 **Notă**: După orice modificare, restartează dev server-ul cu `npm run dev` pentru a vedea schimbările!
