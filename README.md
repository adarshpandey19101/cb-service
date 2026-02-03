# 🚀 CodingBits - Modern SaaS Project Management Platform

<div align="center">

![CodingBits Logo](public/logo.png)

**A full-stack SaaS application for project and requirements management**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://codingbits.in)
[![Built with React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![Powered by Supabase](https://img.shields.io/badge/Supabase-Backend-green)](https://supabase.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-black)](https://vercel.com/)

[Live Demo](https://codingbits.in) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📖 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Feature Deep Dive](#feature-deep-dive)
- [Database Schema](#database-schema)
- [API Layer](#api-layer)
- [Security](#security)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About The Project

**CodingBits** is a comprehensive SaaS (Software as a Service) platform designed for managing software projects and their requirements. Built with modern web technologies, it provides a seamless experience for project managers, developers, and teams to:

- **Organize Projects**: Create and manage multiple projects with status tracking, timelines, and budgets
- **Track Requirements**: Define, prioritize, and monitor project requirements with detailed categorization
- **Collaborate Effectively**: Unified authentication allows team members to access projects securely
- **Monitor Progress**: Real-time dashboards showing project statistics and recent activities
- **Manage Profiles**: Complete user profile management with photo uploads and professional details

### 🎨 What Makes It Special?

1. **Unified Authentication System**: 
   - Users can login via Email/Password, Google, or LinkedIn
   - **Unique Feature**: Same email works across all methods
   - OAuth users can set passwords to enable email/password login
   - Intelligent error messages guide users to correct login method

2. **Modern UX**:
   - Smooth animations with Framer Motion
   - Responsive design (mobile-first approach)
   - Real-time form validation
   - Intuitive drag-and-drop for requirement ordering

3. **Enterprise-Ready**:
   - Row-level security (RLS) in database
   - Secure file uploads with validation
   - Production-optimized build
   - Auto-deployment pipeline

4. **Developer-Friendly**:
   - Clean TypeScript codebase
   - Modular architecture
   - Well-documented API layer
   - Easy to extend and customize

---

## ✨ Key Features

### 🔐 Authentication & Authorization

#### Multi-Method Authentication
- **Email/Password**: Traditional signup with email verification
- **Google OAuth 2.0**: One-click login with Google account
- **LinkedIn OAuth**: Professional login for business users
- **Unified Login**: Same email works across all authentication methods

#### How It Works:
1. **OAuth Login** → Supabase handles OAuth flow → Auto-creates profile
2. **Email Signup** → Password validation → Profile creation → Auto-login
3. **Password Setting** → OAuth users can set password in Profile → Enables dual login
4. **Session Management** → JWT tokens → Auto-refresh → Persistent sessions

#### Security Features:
- Password minimum 6 characters
- Secure session storage
- Auto-logout on session expiry
- Protected routes requiring authentication

---

### 👤 User Profile Management

#### Features:
- **Profile Information**:
  - Full Name
  - Email (from auth, read-only)
  - Phone Number (with validation)
  - Company Name
  - Bio (multi-line text)
  - Address & City
  - Country (defaults to India)
  - LinkedIn Profile URL

- **Profile Photo**:
  - Upload to Supabase Storage
  - Image type validation (JPEG, PNG, WebP)
  - Max size: 5MB
  - Automatic compression
  - Preview before upload
  - Circular crop display

- **Set Password** (OAuth Users):
  - OAuth users see "Set Password" section
  - Password validation (min 6 chars, must match)
  - Enables email/password login
  - Success notification

#### How Profile Photo Upload Works:
```typescript
1. User selects image → File validation (type & size)
2. Upload to Supabase Storage bucket 'avatars'
3. Get public URL from Supabase
4. Update profile in database with URL
5. Display in UI instantly
```

#### Implementation Files:
- `src/app/pages/Profile.tsx` - Profile UI and logic
- `src/lib/api/profile.ts` - API functions for profile operations
- `src/hooks/useAuth.tsx` - Authentication context and hooks

---

### 📊 Dashboard

#### Features:
- **Header Section**:
  - Profile photo display (circular avatar)
  - Welcome message with user's name
  - **Edit Profile** button (navigates to Profile page)
  - **Logout** button (red, with confirmation)

- **Project Statistics**:
  - Total Projects count
  - Active Projects (in_progress status)
  - Completed Projects count
  - On Hold Projects count
  - Visual cards with icons and colors

- **Recent Projects**:
  - Last 5 projects created
  - Project name and description
  - Status badges with color coding
  - Quick navigation to project details

- **Quick Actions**:
  - Create New Project (blue card)
  - View All Projects (purple card)
  - Responsive grid layout

#### Data Flow:
```
Dashboard Load → useAuth (get user) → Parallel API calls:
  ├─ getUserProfile(userId) → Profile data
  ├─ getProjects(userId) → All projects
  └─ getProjectStats(userId) → Aggregated stats
→ Update state → Render UI
```

#### Why Dashboard is Special:
- **Consolidated View**: All user actions in one place (no separate Profile nav link)
- **Real-time Data**: Stats update on every visit
- **Performance**: Parallel API calls for faster loading
- **User-Centric**: Profile photo prominently displayed

---

### 📁 Project Management

#### Create Project
**Form Fields**:
- Project Name (required)
- Description (optional, multi-line)
- Status: New | In Progress | Completed | On Hold
- Priority: Low | Medium | High | Critical
- Start Date (date picker)
- Due Date (date picker)
- Budget (decimal, currency format)
- Estimated Hours (integer)

**Workflow**:
```
User fills form → Validation → API call to createProject() 
→ Insert into 'projects' table → Return new project ID 
→ Navigate to project detail page → Success message
```

#### View All Projects
- Grid layout (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
- Each card shows:
  - Project name
  - Description (truncated)
  - Status badge (color-coded)
  - Priority indicator
  - Created date
  - Click to view details

#### Project Detail Page
**Sections**:
1. **Project Header**:
   - Name, description, dates
   - Edit button (navigates to edit form)
   - Delete button (with confirmation)
   - Back to projects link

2. **Project Metrics**:
   - Budget visualization
   - Hours tracking (estimated vs actual)
   - Progress percentage
   - Status and priority badges

3. **Requirements Management**:
   - List all requirements for this project
   - Add new requirement button
   - Drag & drop to reorder
   - Edit/Delete individual requirements
   - Filter by status/priority

4. **Timeline** (if dates set):
   - Visual timeline showing start → due date
   - Days remaining/overdue indicator

#### Edit Project
- Pre-filled form with current values
- Same validation as create
- Update API call → Navigate back to detail
- Optimistic UI updates

#### Delete Project
- Confirmation dialog
- Cascade delete (removes all requirements)
- Navigate back to projects list
- Success toast notification

#### Technology Used:
- **React Router** for navigation
- **React Hook Form** for form management
- **Lucide Icons** for UI elements
- **Framer Motion** for animations
- **Supabase** for data persistence

---

### 📋 Requirements Management

#### What are Requirements?
Requirements are specific features, constraints, or assumptions for a project. They help track what needs to be built.

#### Requirement Types:
1. **Functional**: Features the system must have
2. **Non-Functional**: Performance, security, usability requirements
3. **Constraint**: Limitations or restrictions
4. **Assumption**: Things assumed to be true

#### Features:

**Create Requirement**:
- Title (required)
- Description (detailed explanation)
- Type (dropdown)
- Priority: Low | Medium | High | Critical
- Status: New | In Progress | Completed | Deferred
- Estimated Hours (decimal)
- Actual Hours (updates as work progresses)

**Drag & Drop Reordering**:
```typescript
Technology: react-dnd + react-dnd-html5-backend
Process:
1. User drags requirement card
2. Drop on new position
3. Calculate new order_index values
4. Batch update API call
5. Optimistic UI update
6. Sync with database
```

**Edit Requirement**:
- Inline editing or modal form
- Update all fields except project_id
- Real-time validation

**Delete Requirement**:
- Confirmation prompt
- Soft delete option (status → deferred)
- Hard delete from database

**Filter & Sort**:
- Filter by: Status, Priority, Type
- Sort by: Order, Priority, Status, Created Date
- Search by title/description

#### Statistics:
- Total requirements count
- Breakdown by status
- High priority count
- Completion percentage

#### Implementation Details:
```typescript
// API Layer (src/lib/api/requirements.ts)
- getRequirements(projectId): Fetch all for project
- createRequirement(data): Insert new
- updateRequirement(id, data): Update existing
- deleteRequirement(id): Remove
- reorderRequirements(projectId, updates): Batch update order

// State Management
- Local state for UI
- Optimistic updates for better UX
- Sync with Supabase on every change
```

---

### 🏠 Public Pages

#### Home Page (`/`)
**Sections**:
1. **Hero Section**:
   - Eye-catching headline
   - Call-to-action buttons
   - Animated background (gradient)
   - Responsive typography

2. **Services Section**:
   - Grid of services offered
   - Icons + descriptions
   - Hover animations
   - Links to detailed pages

3. **About Section**:
   - Company introduction
   - Mission & vision
   - Team highlights (if applicable)
   - Generated AI images for visuals

4. **Contact Form**:
   - Name, Email, Phone, Subject, Message
   - Form validation
   - Submission to `contact_submissions` table
   - Success confirmation

#### Navigation
**Desktop Menu**:
- Logo (links to home)
- Nav links: Home, About, Services, Careers, Blog, Contact
- Auth buttons: Login / Signup (if not logged in)
- Dashboard link (if logged in)

**Mobile Menu**:
- Hamburger icon
- Slide-in menu with smooth animation
- Same links as desktop
- Responsive touch targets

#### Footer
- Logo and tagline
- Quick links
- Social media icons
- Copyright information
- Terms, Privacy Policy links

---

## 🛠️ Tech Stack

### Frontend Technologies

#### **React 18.3.1**
- **Why**: Component-based architecture, excellent for SPAs
- **How Used**:
  - Functional components with hooks
  - Context API for global state (auth)
  - Custom hooks (`useAuth`)
  - Lazy loading for code splitting

#### **TypeScript**
- **Why**: Type safety, better developer experience
- **How Used**:
  - Typed props and state
  - Interface definitions for API responses
  - Type-safe routing
  - Compile-time error catching

#### **Vite 7.3.1**
- **Why**: Lightning-fast dev server, optimized builds
- **How Used**:
  - Development server with HMR
  - Production build optimization
  - Asset handling
  - Environment variable management

#### **React Router DOM 7.13.0**
- **Why**: Client-side routing for SPA
- **How Used**:
  - Route definitions in App.tsx
  - Protected routes (require auth)
  - Dynamic routes (`:id` params)
  - Navigation hooks (`useNavigate`, `useParams`)

#### **Tailwind CSS 4.1.12**
- **Why**: Utility-first CSS, rapid UI development
- **How Used**:
  - Responsive design utilities
  - Custom color palette
  - Dark mode support (future)
  - JIT compilation for smaller bundle

#### **Framer Motion (motion 12.23.24)**
- **Why**: Smooth, declarative animations
- **How Used**:
  - Page transitions
  - Component entrance animations
  - Hover effects
  - Gesture-based interactions

#### **Lucide React 0.487.0**
- **Why**: Beautiful, consistent icons
- **How Used**:
  - UI icons throughout app
  - Form field indicators
  - Status badges
  - Navigation elements

#### **Radix UI**
- **Why**: Accessible, unstyled components
- **How Used**:
  - Dialog/Modal components
  - Dropdown menus
  - Tooltips
  - Accordion (if needed)
  - Ensures WCAG compliance

---

### Backend Technologies

#### **Supabase (PostgreSQL)**
- **Why**: Open-source Firebase alternative, full SQL power
- **How Used**:
  - **Database**: PostgreSQL with extensions
  - **Authentication**: Built-in auth with OAuth
  - **Storage**: File uploads (profile photos)
  - **Real-time**: (Future) Live updates
  - **Row Level Security**: Data access control

**Supabase Features Used**:

1. **Auth**:
```typescript
// Email/Password
supabase.auth.signUp({ email, password })
supabase.auth.signInWithPassword({ email, password })

// OAuth
supabase.auth.signInWithOAuth({ provider: 'google' })
supabase.auth.signInWithOAuth({ provider: 'linkedin' })

// Session Management
supabase.auth.getSession()
supabase.auth.onAuthStateChange()
```

2. **Database**:
```typescript
// CRUD operations
supabase.from('projects').select('*').eq('user_id', userId)
supabase.from('projects').insert(newProject)
supabase.from('projects').update(updates).eq('id', projectId)
supabase.from('projects').delete().eq('id', projectId)

// Joins
supabase.from('requirements')
  .select('*, projects(*)')
  .eq('project_id', projectId)
```

3. **Storage**:
```typescript
// Upload file
supabase.storage.from('avatars').upload(path, file)

// Get public URL
supabase.storage.from('avatars').getPublicUrl(path)

// Delete file
supabase.storage.from('avatars').remove([path])
```

---

### State Management

#### **React Context API + Hooks**
- **Why**: Simple, built-in, sufficient for this app size
- **How Used**:
  - `AuthContext`: User authentication state
  - `useAuth` hook: Access auth anywhere
  - No external library needed (Redux overkill)

```typescript
// src/hooks/useAuth.tsx
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

// Provides:
// - user: Current user object
// - signIn, signUp, signOut: Auth methods
// - signInWithGoogle, signInWithLinkedIn: OAuth methods
// - loading: Auth loading state
```

---

### API Layer Architecture

#### **Modular API Structure**

```
src/lib/api/
├── profile.ts      # User profile operations
├── projects.ts     # Project CRUD + stats
└── requirements.ts # Requirements management
```

**Design Pattern**: 
- Each file exports typed functions
- Error handling in try-catch
- Return typed responses
- Consistent API across modules

**Example** (projects.ts):
```typescript
export async function getProjects(userId: string): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch projects');
  }
}
```

**Benefits**:
- Centralized data fetching
- Easy to test
- Type-safe responses
- Reusable across components

---

### Development Tools

#### **npm**
- Package management
- Scripts: `dev`, `build`, `preview`

#### **Git & GitHub**
- Version control
- Repository hosting
- Automated deployments via Vercel

#### **VS Code** (Recommended)
- Extensions:
  - ES7+ React/Redux snippets
  - Tailwind CSS IntelliSense
  - Prettier
  - ESLint

---

## 🏗️ Architecture

### Application Architecture

```
┌─────────────────────────────────────────┐
│           User Browser                  │
│  ┌─────────────────────────────────┐   │
│  │     React SPA (Vite)            │   │
│  │  ┌──────────┐  ┌──────────┐    │   │
│  │  │  Pages   │  │Components│    │   │
│  │  └────┬─────┘  └────┬─────┘    │   │
│  │       │             │           │   │
│  │  ┌────┴──────────────┴────┐    │   │
│  │  │    API Layer (lib/api) │    │   │
│  │  └────────┬───────────────┘    │   │
│  └───────────┼────────────────────┘   │
└──────────────┼────────────────────────┘
               │
               ├── HTTP/HTTPS + JWT
               │
┌──────────────┴────────────────────────┐
│        Supabase (Backend)             │
│  ┌────────────────────────────────┐  │
│  │  PostgreSQL Database           │  │
│  │  ┌──────────┐  ┌────────────┐ │  │
│  │  │  Tables  │  │  RLS       │ │  │
│  │  │ (5)      │  │  Policies  │ │  │
│  │  └──────────┘  └────────────┘ │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │  Authentication                │  │
│  │  ┌─────────┐  ┌─────────────┐ │  │
│  │  │  Email  │  │  OAuth      │ │  │
│  │  │  /Pass  │  │  (G,L)      │ │  │
│  │  └─────────┘  └─────────────┘ │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │  Storage (Buckets)             │  │
│  │  └─ avatars (profile photos)   │  │
│  └────────────────────────────────┘  │
└───────────────────────────────────────┘
               │
               │ CDN
               ▼
┌───────────────────────────────────────┐
│         Vercel (Hosting)              │
│  ┌────────────────────────────────┐  │
│  │  Static Assets (dist/)         │  │
│  │  - index.html                  │  │
│  │  - JS bundles                  │  │
│  │  - CSS                         │  │
│  │  - Images                      │  │
│  └────────────────────────────────┘  │
│  - Auto-deploy on git push           │
│  - Edge network (fast global access) │
│  - Analytics                         │
└───────────────────────────────────────┘
```

---

### Code Structure

```
SaaS Company Website/
├── public/                    # Static assets
│   └── logo.png
│
├── src/
│   ├── app/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.tsx    # Navigation with auth state
│   │   │   └── Footer.tsx    # Site footer
│   │   │
│   │   ├── pages/            # Route components
│   │   │   ├── Home.tsx      # Landing page
│   │   │   ├── Login.tsx     # Login page (Email + OAuth)
│   │   │   ├── Signup.tsx    # Registration page
│   │   │   ├── Dashboard.tsx # User dashboard (stats + recent)
│   │   │   ├── Profile.tsx   # Profile management + photo upload
│   │   │   ├── Projects.tsx  # All projects list
│   │   │   ├── ProjectDetail.tsx  # Single project view
│   │   │   ├── ProjectForm.tsx    # Create/Edit project
│   │   │   ├── About.tsx     # About page
│   │   │   ├── Services.tsx  # Services page
│   │   │   ├── Contact.tsx   # Contact form
│   │   │   ├── Careers.tsx   # Careers page
│   │   │   ├── PrivacyPolicy.tsx
│   │   │   └── TermsConditions.tsx
│   │   │
│   │   └── App.tsx           # Main app with routing
│   │
│   ├── hooks/
│   │   └── useAuth.tsx       # Auth context & hook
│   │
│   ├── lib/
│   │   ├── api/              # API layer (data fetching)
│   │   │   ├── profile.ts    # Profile CRUD + photo upload
│   │   │   ├── projects.ts   # Projects CRUD + stats
│   │   │   └── requirements.ts  # Requirements management
│   │   │
│   │   └── supabase.ts       # Supabase client initialization
│   │
│   ├── main.tsx              # App entry point (ReactDOM.render)
│   └── index.css             # Global styles + Tailwind imports
│
├── supabase/
│   ├── migrations/           # Database migration files (6 files)
│   │   ├── 01_create_user_profiles.sql
│   │   ├── 02_create_projects.sql
│   │   ├── 03_create_requirements.sql
│   │   ├── 04_create_project_updates.sql
│   │   ├── 05_add_linkedin_to_profiles.sql
│   │   └── add_phone_to_contact_submissions.sql
│   │
│   └── setup_database.sql    # Consolidated setup (all migrations)
│
├── .env                      # Environment variables (gitignored)
├── .env.example              # Example env file
├── .gitignore
├── vercel.json               # Vercel SPA routing config
├── package.json              # Dependencies & scripts
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.x or higher ([Download](https://nodejs.org/))
- **npm**: 9.x or higher (comes with Node)
- **Supabase Account**: Free tier available ([Sign up](https://supabase.com/))
- **Git**: For version control ([Download](https://git-scm.com/))

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/adarshpandey19101/cb-service.git
cd "SaaS Company Website"
```

#### 2. Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json` including:
- React, React Router
- Supabase client
- Tailwind CSS
- Framer Motion
- Lucide icons
- Radix UI components
- Development dependencies

#### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**How to get these values**:

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project (or create new)
3. Go to **Project Settings** → **API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Project API keys** → **anon/public** → `VITE_SUPABASE_ANON_KEY`

**Important**: Never commit `.env` file to version control!

---

### Database Setup

#### Option 1: Using Consolidated Setup File (Recommended)

1. Go to your Supabase project
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Open `supabase/setup_database.sql`
5. Copy entire contents
6. Paste in SQL Editor
7. Click **Run**

This creates:
- 5 tables (profiles, projects, requirements, project_updates, contact_submissions)
- Row Level Security policies
- Indexes for performance
- Triggers for auto-timestamps

#### Option 2: Running Migration Files Individually

If you prefer step-by-step setup:

```sql
-- Run each file in order in Supabase SQL Editor:

-- 1. User Profiles
-- Copy content from: supabase/migrations/01_create_user_profiles.sql
-- Run in SQL Editor

-- 2. Projects
-- Copy content from: supabase/migrations/02_create_projects.sql
-- Run in SQL Editor

-- 3. Requirements
-- Copy content from: supabase/migrations/03_create_requirements.sql
-- Run in SQL Editor

-- 4. Project Updates
-- Copy content from: supabase/migrations/04_create_project_updates.sql
-- Run in SQL Editor

-- 5. LinkedIn Field
-- Copy content from: supabase/migrations/05_add_linkedin_to_profiles.sql
-- Run in SQL Editor

-- 6. Contact Phone Field
-- Copy content from: supabase/migrations/add_phone_to_contact_submissions.sql
-- Run in SQL Editor
```

#### Storage Setup (Profile Photos)

1. Go to **Storage** in Supabase Dashboard
2. Click **New bucket**
3. Name: `avatars`
4. Public bucket: **Yes**
5. Click **Create bucket**

6. Set up policies:
   - Go to bucket settings
   - Add policies for read, create, update, delete
   - Allow authenticated users to manage their own folder

---

### OAuth Setup (Optional but Recommended)

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Add authorized redirect URI:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
7. Get **Client ID** and **Client Secret**

8. In Supabase Dashboard:
   - Go to **Authentication** → **Providers**
   - Enable **Google**
   - Paste Client ID and Secret
   - Save

#### LinkedIn OAuth

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create new app
3. Get **Client ID** and **Client Secret**
4. Add authorized redirect URL:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```

5. In Supabase Dashboard:
   - Go to **Authentication** → **Providers**
   - Enable **LinkedIn**
   - Paste Client ID and Secret
   - Add scopes: `r_liteprofile`, `r_emailaddress`
   - Save

---

### Running Locally

#### Development Server

```bash
npm run dev
```

- Starts Vite dev server
- Open [http://localhost:5173](http://localhost:5173)
- Hot Module Replacement (HMR) enabled
- Changes reflect instantly

#### Production Build

```bash
npm run build
```

- Creates optimized bundle in `dist/` folder
- Minifies code
- Optimizes assets
- Ready for deployment

#### Preview Production Build

```bash
npm run preview
```

- Serves the production build locally
- Test before deploying
- Runs on [http://localhost:4173](http://localhost:4173)

---

## 🔍 Feature Deep Dive

### Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   User Authentication                    │
└─────────────────────────────────────────────────────────┘

EMAIL/PASSWORD FLOW:
User → Signup Form → Validation → Supabase Auth
  → Create user in auth.users
  → Trigger: Create profile in profiles table
  → Auto sign-in
  → Redirect to Dashboard

GOOGLE OAUTH FLOW:
User → Click "Continue with Google"
  → Redirect to Google login
  → User authorizes
  → Google redirects back with code
  → Supabase exchanges code for tokens
  → Check if user exists in auth.users
    → If new: Create user + profile
    → If existing: Update last_sign_in
  → Sign in user
  → Redirect to Dashboard

UNIFIED AUTH (Set Password):
OAuth User → Profile page → "Set Password" section visible
  → Enter password (2 fields) → Validate → Update user
  → Supabase adds password to user account
  → User can now login with email/password OR OAuth
  → Both methods access same profile!
```

### Dashboard Data Loading

```typescript
// Detailed flow in Dashboard.tsx

useEffect(() => {
  if (user) loadDashboardData();
}, [user]);

async function loadDashboardData() {
  // Parallel API calls for performance
  const [profileData, projectsData, statsData] = await Promise.all([
    getUserProfile(user.id),       // Fetch profile
    getProjects(user.id),          // Fetch all projects
    getProjectStats(user.id)       // Calculate stats
  ]);

  setProfile(profileData);
  setRecentProjects(projectsData.slice(0, 5));  // Only 5 most recent
  setStats({
    total: statsData.total,
    active: statsData.active,
    completed: statsData.completed,
    onHold: statsData.onHold
  });
}

// Stats calculation in projects.ts
export async function getProjectStats(userId: string) {
  const projects = await getProjects(userId);
  return {
    total: projects.length,
    active: projects.filter(p => p.status === 'in_progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    onHold: projects.filter(p => p.status === 'on_hold').length
  };
}
```

### Requirement Drag & Drop

```typescript
// Using react-dnd for drag and drop

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Wrap component in DndProvider
<DndProvider backend={HTML5Backend}>
  {requirements.map((req, index) => (
    <DraggableRequirement
      key={req.id}
      requirement={req}
      index={index}
      moveRequirement={handleMove}
    />
  ))}
</DndProvider>

// Drag handler
function handleMove(dragIndex: number, hoverIndex: number) {
  const draggedReq = requirements[dragIndex];
  
  // Update local state (optimistic)
  const updatedReqs = [...requirements];
  updatedReqs.splice(dragIndex, 1);
  updatedReqs.splice(hoverIndex, 0, draggedReq);
  setRequirements(updatedReqs);
  
  // Update order_index in database
  const updates = updatedReqs.map((req, idx) => ({
    id: req.id,
    order_index: idx
  }));
  
  await reorderRequirements(projectId, updates);
}
```

---

## 📊 Database Schema

### Tables Overview

```sql
profiles (User information)
├── id (UUID, PK, FK to auth.users)
├── email (TEXT, UNIQUE)
├── full_name (TEXT)
├── phone (TEXT)
├── company (TEXT)
├── bio (TEXT)
├── role (TEXT, DEFAULT 'client')
├── profile_photo_url (TEXT)
├── address (TEXT)
├── city (TEXT)
├── country (TEXT, DEFAULT 'India')
├── linkedin_url (TEXT)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

projects (User projects)
├── id (UUID, PK)
├── user_id (UUID, FK to profiles)
├── name (TEXT)
├── description (TEXT)
├── status (TEXT: new|in_progress|completed|on_hold)
├── priority (TEXT: low|medium|high|critical)
├── start_date (DATE)
├── due_date (DATE)
├── budget (DECIMAL)
├── estimated_hours (INTEGER)
├── actual_hours (INTEGER)
├── progress (INTEGER, 0-100)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

requirements (Project requirements)
├── id (UUID, PK)
├── project_id (UUID, FK to projects, CASCADE DELETE)
├── user_id (UUID, FK to profiles)
├── title (TEXT)
├── description (TEXT)
├── type (TEXT: functional|non_functional|constraint|assumption)
├── priority (TEXT: low|medium|high|critical)
├── status (TEXT: new|in_progress|completed|deferred)
├── estimated_hours (DECIMAL)
├── actual_hours (DECIMAL)
├── order_index (INTEGER, for drag-drop ordering)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

project_updates (Activity log)
├── id (UUID, PK)
├── project_id (UUID, FK to projects, CASCADE DELETE)
├── user_id (UUID, FK to profiles)
├── title (TEXT)
├── description (TEXT)
├── type (TEXT: general|milestone|issue|decision)
└── created_at (TIMESTAMP)

contact_submissions (Contact form entries)
├── id (UUID, PK)
├── name (TEXT)
├── email (TEXT)
├── phone (TEXT)
├── subject (TEXT)
├── message (TEXT)
└── created_at (TIMESTAMP)
```

### Relationships

```
profiles (1) ──< (N) projects
projects (1) ──< (N) requirements
projects (1) ──< (N) project_updates
```

### Row Level Security Policies

**Profiles**:
```sql
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

**Projects**:
```sql
-- Users can view their own projects
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

-- Similar for INSERT, UPDATE, DELETE
```

**Requirements**:
```sql
-- Users can manage requirements for their projects
CREATE POLICY "Users can manage own requirements"
  ON requirements FOR ALL
  USING (auth.uid() = user_id);
```

### Indexes for Performance

```sql
-- Projects
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);

-- Requirements
CREATE INDEX idx_requirements_project_id ON requirements(project_id);
CREATE INDEX idx_requirements_user_id ON requirements(user_id);
CREATE INDEX idx_requirements_status ON requirements(status);

-- Project Updates
CREATE INDEX idx_project_updates_project_id ON project_updates(project_id);
CREATE INDEX idx_project_updates_created_at ON project_updates(created_at DESC);
```

---

## 🔌 API Layer

### Profile API (`src/lib/api/profile.ts`)

```typescript
// Get user profile
async function getUserProfile(userId: string): Promise<UserProfile>

// Update profile
async function updateUserProfile(userId: string, updates: ProfileUpdateData): Promise<UserProfile>

// Upload profile photo
async function uploadProfilePhoto(userId: string, file: File): Promise<string>
// Returns: Public URL of uploaded photo

// Delete profile photo
async function deleteProfilePhoto(userId: string, photoUrl: string): Promise<void>
```

### Projects API (`src/lib/api/projects.ts`)

```typescript
// Get all projects for user
async function getProjects(userId: string): Promise<Project[]>

// Get single project
async function getProject(projectId: string): Promise<Project>

// Create new project
async function createProject(data: ProjectCreateData): Promise<Project>

// Update project
async function updateProject(projectId: string, updates: ProjectUpdateData): Promise<Project>

// Delete project (cascades to requirements)
async function deleteProject(projectId: string): Promise<void>

// Get project statistics
async function getProjectStats(userId: string): Promise<ProjectStats>
// Returns: { total, active, completed, onHold }
```

### Requirements API (`src/lib/api/requirements.ts`)

```typescript
// Get all requirements for project
async function getRequirements(projectId: string): Promise<Requirement[]>

// Get single requirement
async function getRequirement(reqId: string): Promise<Requirement>

// Create requirement
async function createRequirement(data: RequirementCreateData): Promise<Requirement>

// Update requirement
async function updateRequirement(reqId: string, updates: RequirementUpdateData): Promise<Requirement>

// Delete requirement
async function deleteRequirement(reqId: string): Promise<void>

// Reorder requirements (batch update)
async function reorderRequirements(projectId: string, updates: OrderUpdate[]): Promise<void>

// Get requirement statistics
async function getRequirementStats(projectId: string): Promise<RequirementStats>
// Returns: { total, completed, inProgress, highPriority }
```

---

## 🔐 Security

### Authentication Security

1. **Password Requirements**:
   - Minimum 6 characters
   - No maximum (Supabase handles hashing)
   - Stored as bcrypt hash in Supabase

2. **Session Management**:
   - JWT tokens (short-lived)
   - Refresh tokens (long-lived, httpOnly)
   - Auto-refresh before expiry
   - Secure storage (localStorage for access, cookie for refresh)

3. **OAuth Security**:
   - State parameter prevents CSRF
   - Redirect URI validation
   - Tokens stored securely by Supabase

### Database Security (RLS)

**Row Level Security Enabled** on all tables:

- Users can ONLY access their own data
- Enforced at database level
- Cannot be bypassed from frontend
- Admin role can be added for broader access

**Example**: User A cannot see projects of User B, even if they know the project ID.

### File Upload Security

**Profile Photo Upload**:
```typescript
// Validation before upload
if (!file.type.startsWith('image/')) {
  throw new Error('Only images allowed');
}

if (file.size > 5 * 1024 * 1024) {  // 5MB
  throw new Error('File too large');
}

// Upload to user-specific folder
const filePath = `${userId}/${Date.now()}.${ext}`;
```

**Storage Policies**:
- Public read (for displaying images)
- Only owner can upload/update/delete
- File path includes user ID (prevents conflicts)

### Environment Variables

**Never exposed to client**:
- Database connection strings
- API secrets
- OAuth client secrets

**Exposed to client** (prefixed with `VITE_`):
- `VITE_SUPABASE_URL`: Safe, publicly accessible
- `VITE_SUPABASE_ANON_KEY`: Safe, can only perform allowed operations (RLS enforced)

### HTTPS & CORS

- **Production**: HTTPS enforced (Vercel automatically)
- **CORS**: Supabase configured to allow requests from your domain
- **CSP**: Content Security Policy headers can be added via `vercel.json`

---

## 🚀 Deployment

### Vercel Deployment (Automated)

#### Initial Setup

1. **Connect GitHub**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub
   - Select repo: `adarshpandey19101/cb-service`

2. **Configure Project**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables**:
   Add in Vercel settings:
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to finish
   - Get deployment URL

#### Custom Domain Setup

1. **Add Domain**:
   - Vercel → Project → Settings → Domains
   - Add `codingbits.in`
   - Add `www.codingbits.in`

2. **Configure DNS**:
   - Go to your domain registrar
   - Add A record:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21 (Vercel IP)
     ```
   - Add CNAME record:
     ```
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

3. **SSL Certificate**:
   - Automatically provisioned by Vercel
   - Free Let's Encrypt certificate
   - Auto-renewal

4. **Verify**:
   - Wait for DNS propagation (can take up to 48 hours)
   - Visit `https://codingbits.in`
   - Should show your app with HTTPS

#### Auto-Deployment

**How it works**:
```
Developer → git push to GitHub
  → Webhook triggers Vercel
  → Vercel pulls latest code
  → Runs npm run build
  → Deploys to edge network
  → Updates live site (zero downtime)
  → Sends deployment notification
```

**Deployment Preview**:
- Every pull request gets a preview URL
- Test changes before merging
- Automatic cleanup after PR is merged

---

### Manual Deployment (if needed)

#### Build Locally

```bash
npm run build
```

#### Deploy `dist/` folder to any static host:

**Options**:
- **Netlify**: Drag-drop `dist` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload to bucket with static hosting
- **Firebase Hosting**: `firebase deploy`

---

### Post-Deployment Checklist

- [ ] Test all auth methods (Email, Google, LinkedIn)
- [ ] Create a test account
- [ ] Upload profile photo
- [ ] Create a test project
- [ ] Add requirements
- [ ] Test drag & drop
- [ ] Check on mobile device
- [ ] Verify custom domain works
- [ ] Check SSL certificate (HTTPS)
- [ ] Test all navigation links
- [ ] Submit contact form
- [ ] Check analytics (Vercel Analytics)
- [ ] Monitor error logs

---

## 🤝 Contributing

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Make changes**
4. **Commit**:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
5. **Push**:
   ```bash
   git push origin feature/AmazingFeature
   ```
6. **Open Pull Request**

### Code Style

- Use TypeScript for type safety
- Follow existing file structure
- Use functional components with hooks
- Add comments for complex logic
- Use Prettier for formatting
- Write descriptive commit messages

---

## 📞 Support & Contact

- **Live Demo**: [https://codingbits.in](https://codingbits.in)
- **Email**: support@codingbits.in
- **GitHub Issues**: [Report a bug](https://github.com/adarshpandey19101/cb-service/issues)

---

## 📄 License

This project is proprietary software. All rights reserved.

© 2026 CodingBits. 

---

## 🙏 Acknowledgments

### Technologies
- [React](https://react.dev/) - UI framework
- [Supabase](https://supabase.com/) - Backend as a service
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library
- [Radix UI](https://www.radix-ui.com/) - Accessible components

### Inspiration
- Modern SaaS dashboards
- Project management tools (Jira, Asana, Trello)
- Authentication best practices

---

<div align="center">

**Made with ❤️ by CodingBits Team**

⭐ Star this repo if you found it helpful!

</div>
