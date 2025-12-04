# One Tap, Better Map 🗺️

A Micro-SaaS tool for analyzing and improving Google Maps visibility for local businesses.

## 🎯 Features (MVP)

- **GeoGrid Rank Scanner**: 7×7 grid analysis (49 points) around business location
- **Competitor Insights**: Analyze top 20 competitors (reviews, photos, categories)
- **Visibility Score**: 0-100 score with weighted metrics
- **Optimization Checklist**: AI-powered actionable recommendations
- **Real-time Scanning**: Async job processing with status updates
- **Clean Apple/Farfetch UI**: Minimal, whitespace-heavy design

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **APIs**: Google Places API
- **Auth**: Supabase Auth
- **Deployment**: Vercel + Supabase

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/digiroiio-lgtm/onetapbettermap.git
cd onetapbettermap
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file:

```env
# Google Places API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cron Secret
CRON_SECRET=your_random_secret_string
```

### 4. Setup Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Run SQL from `supabase/schema.sql`

### 5. Setup Google Places API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable Places API
3. Create API Key
4. Add to `.env.local`

### 6. Run Development Server

```bash
npm run dev
```

## 📊 Core Features

### GeoGrid Scan (7×7)
- 49 points around business location
- Real-time rank checking via Places API
- Heatmap visualization (green/yellow/red)

### Competitor Analysis
- Top 20 competitors identified
- Metrics: rating, reviews, photos, categories
- Gap analysis for optimization

### Visibility Score (0-100)
- Rank: 50%
- Reviews: 20%
- Categories: 15%
- Photos: 15%

### Optimization Checklist
- Photo recommendations
- Review request strategies
- Category suggestions
- Profile completeness checks

## 🚀 Deployment

### Digital Ocean
1. Connect GitHub repository
2. Select `main` branch
3. Add environment variables
4. Deploy automatically

## 📝 TODO

- [ ] Dashboard UI (Apple/Farfetch style)
- [ ] Authentication pages
- [ ] Pricing tiers ($19/$49/$99)
- [ ] Cron jobs for daily scans
- [ ] PDF export
- [ ] White-label reports

## 📄 License

ISC
