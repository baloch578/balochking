# BALOCH KING LECTURE HUB 👑

## Overview

BALOCH KING LECTURE HUB is an educational platform that provides video lecture content across four subjects: Physics, Chemistry, Botany, and Zoology. The platform features a custom dark theme with 3D glowing effects inspired by radium/neon lighting aesthetics. Users must join a Telegram channel to access lectures, which are organized by subject and topic. The application includes an admin panel for managing lectures and monitoring visitor statistics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for UI components
- Vite as the build tool and development server
- Wouter for client-side routing
- TanStack Query (React Query) for data fetching and caching
- Shadcn UI components built on Radix UI primitives
- Tailwind CSS for styling with custom dark theme configuration

**Design System:**
- Custom 3D glowing border effects for visual hierarchy
- Subject-specific color coding (Physics: electric blue, Chemistry: magenta pink, Botany: vivid green, Zoology: orange gold)
- Pure black background (0% lightness) with elevated card backgrounds
- Inter font family for all typography
- Mobile-responsive design patterns

**Routing Structure:**
- `/` - Landing page with call-to-action
- `/telegram-verify` - Telegram channel verification gate
- `/subjects` - Subject selection page
- `/topics/:subject` - Topic listing for specific subject
- `/player/:id` - Video player for individual lectures
- `/admin-login` - Admin authentication
- `/admin` - Admin dashboard
- `/admin/lectures` - Lecture management interface
- `/admin/password` - Admin password change

**State Management:**
- React Query for server state and caching
- Session storage for authentication state (Telegram verification, admin login)
- Local storage for visitor count tracking

### Backend Architecture

**Technology Stack:**
- Express.js server with TypeScript
- In-memory storage implementation (MemStorage class)
- Drizzle ORM configured for PostgreSQL (schema defined but not yet connected)
- RESTful API design pattern

**API Endpoints:**
- `GET /api/lectures` - Fetch all lectures
- `GET /api/lectures/subject/:subject` - Fetch lectures by subject
- `GET /api/lectures/:id` - Fetch single lecture by ID
- `POST /api/lectures` - Create new lecture (admin only)
- `DELETE /api/lectures/:id` - Delete lecture (admin only)

**Data Models:**
- **Lectures**: id, subject, topic, title, date, duration, videoUrl
- **Users**: id, username, password (schema defined, not implemented)
- **Admin Passwords**: id, password (schema defined, not implemented)

**Current Storage Solution:**
- In-memory Map-based storage using MemStorage class
- Data persistence not implemented (data lost on server restart)
- IStorage interface defined to support future database integration

**Authentication:**
- Session-based admin authentication using sessionStorage
- Hardcoded admin password ("lamborghini.18#?") - requires database integration for secure storage
- Telegram verification using sessionStorage flag
- No JWT or OAuth implementation

### External Dependencies

**UI Component Libraries:**
- Radix UI primitives for accessible, unstyled components
- Shadcn UI as the component framework
- Embla Carousel for potential carousel functionality
- Lucide React for iconography

**Development Tools:**
- Replit-specific plugins (vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner)
- ESBuild for server-side bundling
- TypeScript compiler for type checking

**Database (Configured but Not Connected):**
- Neon Database (@neondatabase/serverless) configured in dependencies
- Drizzle ORM with PostgreSQL dialect
- Connection string expected via DATABASE_URL environment variable
- Migration scripts configured but not executed

**Third-Party Integrations:**
- Telegram channel verification (manual process, link to t.me/+55jFTFG5Xno3NTZl)
- Video hosting support for YouTube, Vimeo, direct MP4/M3U8/WebM/OGG files, and custom PHP-encoded URLs
- Google Fonts CDN for Inter font family

**Key Missing Implementations:**
- Database connection and persistence layer
- Secure admin authentication system
- User registration and login functionality
- Password change functionality (UI exists, backend not implemented)
- Visitor tracking with persistent storage