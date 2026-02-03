# CodingBits - SaaS Company Website

Modern SaaS company website with complete user authentication, project management, and requirements tracking system.

## 🚀 Features

### Authentication
- ✅ Email/Password signup and login
- ✅ Google OAuth integration
- ✅ LinkedIn OAuth integration
- ✅ Unified authentication (same email for multiple login methods)
- ✅ Password reset functionality
- ✅ Session management

### User Profile Management
- ✅ Profile photo upload
- ✅ Edit profile information (name, phone, company, bio, address, city, LinkedIn)
- ✅ Set password for OAuth users
- ✅ Logout functionality

### Project Management
- ✅ Create, read, update, delete projects
- ✅ Project status tracking (New, In Progress, Completed, On Hold)
- ✅ Project timeline and budget tracking
- ✅ Requirements management for each project
- ✅ Priority and status tracking for requirements

### Dashboard
- ✅ Overview of all projects
- ✅ Project statistics (total, active, completed, on hold)
- ✅ Recent projects display
- ✅ Quick actions

### UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern animations with Framer Motion
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Form validation

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 4.1.12
- **Routing**: React Router DOM 7.13.0
- **Animations**: Framer Motion (motion 12.23.24)
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for profile photos)
- **API**: Supabase REST API

### Deployment
- **Platform**: Vercel
- **Domain**: codingbits.in
- **Analytics**: Vercel Analytics

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd "SaaS Company Website"
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Get these values from your Supabase project:
- Go to https://app.supabase.com
- Select your project
- Go to Project Settings → API
- Copy the `URL` and `anon/public` key

4. **Database Setup**

Run migrations in Supabase SQL Editor (in order):
```sql
-- Run each file from supabase/migrations/ folder:
1. 01_create_user_profiles.sql
2. 02_create_projects.sql
3. 03_create_requirements.sql
4. 04_create_project_updates.sql
5. 05_add_linkedin_to_profiles.sql
6. add_phone_to_contact_submissions.sql
```

5. **Configure OAuth Providers** (Optional)

**Google OAuth**:
- Supabase Dashboard → Authentication → Providers → Google
- Add OAuth credentials from Google Cloud Console
- Add authorized redirect URI: `https://<your-project>.supabase.co/auth/v1/callback`

**LinkedIn OAuth**:
- Same process for LinkedIn provider
- Get credentials from LinkedIn Developers

6. **Start Development Server**
```bash
npm run dev
```

Visit http://localhost:5173

---

## 🏗️ Build & Deploy

### Production Build

```bash
npm run build
```

Build output will be in `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

1. **Connect Repository**
   - Go to Vercel Dashboard
   - Import GitHub repository
   - Select the project

2. **Configure Environment Variables**
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch

4. **Custom Domain**
   - Vercel → Project Settings → Domains
   - Add custom domain (e.g., codingbits.in)
   - Update DNS settings as instructed

---

## 📁 Project Structure

```
SaaS Company Website/
├── public/
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── components/     # Reusable components (Navbar, Footer, etc.)
│   │   ├── pages/          # Page components (Home, Login, Dashboard, etc.)
│   │   └── App.tsx         # Main app with routing
│   ├── hooks/
│   │   └── useAuth.tsx     # Authentication hook
│   ├── lib/
│   │   ├── api/            # API layer (profile, projects, requirements)
│   │   └── supabase.ts     # Supabase client
│   └── main.tsx            # App entry point
├── supabase/
│   └── migrations/         # Database migration files
├── .env                    # Environment variables (git-ignored)
├── .env.example            # Example environment variables
├── vercel.json             # Vercel SPA routing configuration
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🔐 Authentication Flow

### Email/Password Signup
1. User fills signup form
2. Account created in Supabase Auth
3. Profile created in `profiles` table
4. User logged in automatically

### OAuth Login (Google/LinkedIn)
1. User clicks OAuth button
2. Redirected to provider for authentication
3. Callback creates/updates user in Supabase
4. Profile auto-created if new user

### Unified Authentication
- Users can set password for OAuth accounts
- Same email works for both OAuth and email/password
- Go to Profile → Set Password section

---

## 🗄️ Database Schema

### Tables

**profiles**
- User profile information
- Linked to Supabase Auth users
- RLS enabled (users can only access their own data)

**projects**
- Project management
- Linked to user profiles
- Status, timeline, budget tracking

**requirements**
- Project requirements
- Linked to projects
- Priority and status tracking

**project_updates**
- Project update logs
- Linked to projects

**contact_submissions**
- Contact form submissions

---

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- File upload validation (type and size limits)
- Environment variables for sensitive keys
- OAuth providers properly configured
- HTTPS enforced on production

---

## 📱 Features by Page

### Home (`/`)
- Hero section with CTA
- Services overview
- About section
- Contact form

### Dashboard (`/dashboard`)
- Project statistics
- Recent projects
- Profile photo display
- Quick actions (Edit Profile, Logout)

### Profile (`/profile`)
- Edit user information
- Upload profile photo
- Set password (for OAuth users)
- Update LinkedIn profile

### Projects (`/projects`)
- View all projects
- Create new project
- Project list with status

### Project Detail (`/projects/:id`)
- View project details
- Edit project
- Manage requirements
- Delete project

### Login/Signup
- Multiple authentication methods
- Form validation
- Error handling
- Responsive design

---

## 🐛 Known Issues

None currently. Report issues via GitHub.

---

## 📝 Environment Variables

Required:
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

Optional:
- OAuth credentials configured in Supabase Dashboard

---

## 🚀 Deployment Checklist

- [x] Environment variables set in Vercel
- [x] Database migrations applied
- [x] OAuth providers configured
- [x] Custom domain connected
- [x] SSL certificate active
- [x] Analytics configured
- [x] vercel.json for SPA routing

---

## 📞 Support

For issues or questions, contact: support@codingbits.in

---

## 📄 License

Proprietary - All rights reserved

---

## 🙏 Acknowledgments

- Supabase for backend infrastructure
- Vercel for hosting
- Radix UI for accessible components
- Lucide for beautiful icons
