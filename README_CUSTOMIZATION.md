# 🚀 Ghid Rapid de Personalizare - Real Estate Admin

**Pentru dezvoltatori și utilizatori non-tehnici**

## ⚡ Start Rapid (5 minute)

### 1. Schimbă Numele Companiei

**Fișier**: `src/config/app.ts`

```typescript
export const COMPANY_CONFIG = {
  name: "NUMELE TAU COMPANIE", // ✏️ Schimbă aici
  tagline: "Slogan-ul companiei tale", // ✏️ Și aici
  logoText: "MC", // ✏️ Inițialele (Max 3 litere)
```

### 2. Actualizează Contact-ul

**În același fișier**:

```typescript
  contact: {
    phone: "+40 123 456 789", // ✏️ Telefonul tău
    email: "office@compania-ta.ro", // ✏️ Email-ul tău
    whatsapp: "+40 123 456 789", // ✏️ WhatsApp (poate fi diferit)
  },
```

### 3. Schimbă Culorile

```typescript
export const DESIGN_CONFIG = {
  colors: {
    primary: "#1e40af", // ✏️ Înlocuiește cu culoarea ta (ex: albastru)
    primaryDark: "#1e3a8a", // ✏️ Versiunea mai închisă
  },
```

### 4. Parola Admin

```typescript
export const ADMIN_CONFIG = {
  defaultPassword: "parola-ta-noua", // ✏️ Schimbă din "admin123"
```

**🎉 GATA! Restart server-ul cu `npm run dev`**

---

## 🎨 Personalizare Vizuală (15 minute)

### Logo Personal

1. **Salvează logo-ul** în `public/logo.png`
2. **În `src/config/app.ts`**:

```typescript
logoImage: "/logo.png", // ✏️ Activează logo imagine
logoText: undefined, // ✏️ Dezactivează text
logoSize: {
  width: 50, // ✏️ Ajustează dimensiunea
  height: 50,
},
```

### Imagini de Fundal

**Găsește imagini gratuite**:

- [Pexels](https://pexels.com) - Folosit acum
- [Unsplash](https://unsplash.com)
- [Pixabay](https://pixabay.com)

**Actualizează în config**:

```typescript
heroImages: {
  homepage: "URL_IMAGINE_NOUA", // ✏️ Fundal pagina principală
  properties: "URL_IMAGINE_PROPRIETATI", // ✏️ Fundal proprietăți
  team: "URL_IMAGINE_ECHIPA", // ✏️ Fundal echipă
},
```

---

## 🏠 Adaugă Proprietățile Tale (30 minute)

### Fișier: `src/pages/Properties.tsx` (linia ~8)

```typescript
const mockProperties = [
  {
    id: "1", // ✏️ ID unic
    title: "Apartament 2 camere ultracentral", // ✏️ Titlul proprietății
    price: 85000, // ✏️ Prețul în EUR
    location: "Str. Exemplu Nr. 123, București", // ✏️ Adresa
    area: 65, // ✏️ mp
    rooms: 2, // ✏️ Numărul de camere
    type: "Apartament cu 2 camere de vânzare", // ✏️ Tipul
    videoUrl: "https://your-video-url.mp4", // ✏️ Link video tur
    thumbnailUrl: "https://your-image-url.jpg", // ✏️ Poza principală
    badges: ["Nou", "Redus"], // ✏️ Badge-uri opționale
  },
  // Copiază și modifică pentru mai multe proprietăți...
];
```

### Tip Important: Imagini pentru Proprietăți

**Dimensiuni recomandate**: 400x300px
**Servicii gratuite**:

- [Pexels](https://pexels.com/search/real%20estate/) - Real estate photos
- [Unsplash](https://unsplash.com/s/photos/apartment) - Apartment photos

---

## 👥 Actualizează Echipa (15 minute)

### Fișier: `src/pages/Team.tsx` (linia ~6)

```typescript
const teamMembers = [
  {
    id: 1,
    name: "Numele Agentului", // ✏️ Numele complet
    role: "Manager", // ✏️ Funcția (vezi roluri mai jos)
    phone: "+40 123 456 789", // ✏️ Telefonul
    email: "agent@compania-ta.ro", // ✏️ Email-ul
    image: "https://your-profile-image.jpg", // ✏️ Poza de profil
  },
  // Adaugă mai mulți membri...
];
```

### Roluri Disponibile

- Manager
- Agent imobiliar
- Agent imobiliar senior
- Consultant imobiliar
- Director vânzări
- Coordinator marketing

**Adaugă roluri noi** în `src/components/admin/TeamMemberForm.tsx` (linia ~35)

---

## 🔐 Securitate și Backend

### JWT Secret Sigur

**Pentru producție**, generează un secret sigur:

```bash
# În terminal/cmd
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Actualizează în config**:

```typescript
jwt: {
  secret: "SECRET-UL-TAU-GENERAT-MAI-SUS", // ✏️ Înlocuiește
  issuer: "compania-ta-admin", // ✏️ Numele companiei
  audience: "compania-ta-frontend", // ✏️ Pentru ce este token-ul
},
```

### Environment Variables

**Creează `.env.local`**:

```bash
VITE_API_URL=http://localhost:3001/api    # Pentru dezvoltare
VITE_APP_NAME=Compania Ta Estate
VITE_ANALYTICS_ENABLED=true
```

**Pentru producție `.env.production`**:

```bash
VITE_API_URL=https://api.compania-ta.ro/api  # URL-ul backend-ului live
VITE_APP_ENV=production
```

---

## 🔌 Conectare la Backend

### Dacă ai Backend Gata

1. **În `src/App.tsx`**, înlocuiește linia ~16:

```typescript
// ÎNAINTE (mock data)
import { AdminAuthProvider } from "@/hooks/useAdminAuth";

// DUPĂ (backend real)
import { AdminAuthProvider } from "@/hooks/useAdminAuthBackend";
```

2. **Actualizează API URL** în `.env.local`:

```bash
VITE_API_URL=http://localhost:3001/api  # URL-ul backend-ului tău
```

### Dacă NU ai Backend

**Poți folosi aplicația așa cum este** - toate funcțiile admin funcționează cu date mock. Perfect pentru prezentări și teste!

---

## 📊 Analytics și Monitorizare

### Google Analytics (opțional)

**În `src/config/app.ts`**:

```typescript
googleAnalytics: {
  measurementId: "G-XXXXXXXXXX", // ✏️ ID-ul tău GA4
  enabled: true, // ✏️ Activează
},
```

### Disable Funcții

```typescript
export const FEATURES_CONFIG = {
  enableWhatsApp: true, // ✏️ Butonul WhatsApp
  enableContactForm: true, // ✏️ Formularul de contact
  enablePropertyFilters: true, // ✏️ Filtrele proprietăți
  enableAnalytics: true, // ✏️ Dashboard analytics
};
```

---

## 🚨 Probleme Frecvente

### ❌ Logo-ul nu se afișează

**Verifică**:

1. Fișierul există în `public/logo.png`?
2. Calea în config este corectă?
3. Refreshează cache-ul (Ctrl+F5)

### ❌ Culorile nu se schimbă

**Soluție**:

1. Restartează dev server: `npm run dev`
2. Șterge cache browser (Ctrl+Shift+R)
3. Verifică sintaxa culorilor: `#1e40af` (cu #)

### ❌ Nu pot accesa admin

**Verifică**:

1. URL-ul corect: `http://localhost:8080/admin/login`
2. Parola din config: `ADMIN_CONFIG.defaultPassword`
3. Consola browser pentru erori (F12)

### ❌ WhatsApp nu funcționează

**Verifică**:

1. Numărul în config (fără spații extra)
2. `enableWhatsApp: true` în config
3. Formatul: `+40123456789`

---

## 📱 Social Media Setup

### Actualizează în `src/config/app.ts`:

```typescript
social: {
  facebook: "https://facebook.com/pagina-ta", // ✏️ Facebook
  instagram: "https://instagram.com/contul-tau", // ✏️ Instagram
  linkedin: "https://linkedin.com/company/compania-ta", // ✏️ LinkedIn
  youtube: "https://youtube.com/@canal-tau", // ✏️ YouTube
},
```

**Lasă gol** (`""`) pentru a ascunde o rețea socială.

---

## 🎯 Checklist Final - Lansare

### ✅ Configurare de Bază

- [ ] Numele companiei actualizat
- [ ] Datele de contact corecte
- [ ] Logo personal încărcat
- [ ] Culorile companiei setate
- [ ] Parola admin schimbată

### ✅ Conținut

- [ ] Proprietățile tale adăugate
- [ ] Echipa actualizată cu poze reale
- [ ] Imaginile hero înlocuite
- [ ] Social media links actualizate

### ✅ Securitate

- [ ] JWT secret generat și setat
- [ ] Environment variables configurate
- [ ] Parolă admin sigură (min 8 caractere)

### ✅ Testing

- [ ] Toate paginile se încarcă
- [ ] Admin login funcționează
- [ ] WhatsApp button funcționează
- [ ] Responsive pe mobile

---

## 🆘 Suport Rapid

### Pentru probleme urgente:

1. **Consola Browser** (F12) → Console tab pentru erori
2. **Network tab** (F12) pentru probleme API
3. **Fișierele de config** în `src/config/app.ts`

### Resurse utile:

- **Ghid complet**: `CUSTOMIZATION_GUIDE.md`
- **Locații date**: `DATA_LOCATIONS.md`
- **Backend integration**: `BACKEND_INTEGRATION.md`

---

**🎉 Felicitări! Aplicația ta este gata de lansare!**

_Documentație creată pentru TRÂMBIȚAȘU ESTATE Admin System_
