# Inkle Frontend Intern Assignment

A pixel-perfect tax management table built with React, TypeScript, and modern web technologies. This application demonstrates proficiency in building production-ready UI components with clean architecture and best practices.

🔗 **Live Demo**: [GitHub Repository](https://github.com/Rajesh-k11/Inkle)

##  Overview

This project implements a complete tax records management interface with features for viewing, filtering, and editing customer tax information. The application fetches data from a REST API and provides an intuitive user interface matching the provided design specifications.

##  Features

### Core Functionality
- **Data Table**: Built using `@tanstack/react-table` v8 (mandatory requirement)
- **Country Filter**: Dynamic filter dropdown with all 25 countries from API
- **Edit Modal**: Update customer name and country with form validation
- **Real-time Updates**: Changes reflect immediately in the table
- **API Integration**: Full CRUD operations with REST endpoints

### UI/UX Highlights
-  Pixel-perfect design implementation
-  Responsive layout with hover states
-  Smooth animations and transitions
-  Click-outside detection for dropdowns
-  Loading states and error handling
-  Form validation with required fields

##  Tech Stack

### Core Technologies
- **Vite** - Fast build tool and dev server
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS v3** - Utility-first styling

### State Management & Data Fetching
- **@tanstack/react-query v5** - Server state management
- **@tanstack/react-table v8** - Powerful table implementation (mandatory)
- **axios** - HTTP client for API requests

### Form Handling & UI
- **react-hook-form** - Form validation and management
- **lucide-react** - Beautiful icon library
- **clsx & tailwind-merge** - Dynamic class management

##  Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Rajesh-k11/Inkle.git
cd Inkle
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── CustomSelect.tsx      # Custom dropdown with Map Pin icons
│   ├── EditModal.tsx          # Edit customer modal with form
│   ├── GenderBadge.tsx        # Pill-shaped gender badges
│   └── TaxTable.tsx           # Main table with filtering
├── utils/
│   └── mockUtils.ts           # Data enrichment utilities
├── types.ts                   # TypeScript type definitions
├── api.ts                     # API client and endpoints
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
└── index.css                  # Tailwind directives and global styles
```

## 🔌 API Integration

### Endpoints Used

**Taxes API**: 
- `GET /taxes` - Fetch all tax records
- `PUT /taxes/:id` - Update a specific record

**Countries API**: 
- `GET /countries` - Fetch list of countries (25 total)

## 🎨 Design Implementation

### Color Scheme
- Primary (Entity text): `#6366F1` (Indigo)
- Purple (Buttons): `#6D28D9` 
- Red badges: `bg-red-50 text-red-500`
- Blue badges: `bg-blue-50 text-blue-500`

### Key Design Elements
- **Entity Column**: Blue/purple colored text for emphasis
- **Gender Badges**: Pill-shaped badges with color-coded styling
- **Filter Icon**: Purple filter icon with dropdown functionality
- **Edit Modal**: Clean modal layout with custom country selector
- **Custom Select**: Dropdown with Map Pin and Pencil icons

## 🧪 Features in Detail

### 1. Tax Records Table
- Displays all customer tax records fetched from API
- Columns: Entity, Gender, Request Date, Country, Actions
- Responsive design with hover effects
- Built exclusively with `@tanstack/react-table`

### 2. Country Filter
- Dynamic filter with all 25 countries from API
- Multi-select checkbox functionality
- Real-time table filtering
- Click-outside to close behavior

### 3. Edit Customer Modal
- Pre-filled form with existing customer data
- Name field with validation (required)
- Country dropdown with all 25 countries
- Custom select component (no native `<select>`)
- Map Pin icons for visual clarity
- Cancel and Save actions

### 4. Data Persistence
- PUT request sends all existing fields + updates
- React Query handles cache invalidation
- Immediate UI updates on successful save

##  Architecture Highlights

### Type Safety
- Full TypeScript implementation with strict mode
- Type-only imports for optimal bundle size
- Comprehensive interface definitions

### Code Quality
- Clean component architecture
- Reusable utility functions
- Separation of concerns (API, types, utils, components)
- Consistent naming conventions

### Performance Optimizations
- React Query caching for reduced API calls
- Memoized table columns
- Debounced filtering logic
- Efficient re-rendering with proper dependencies

##  Assignment Requirements

| Requirement | Status |
|------------|--------|
| Use `@tanstack/react-table` |  Mandatory requirement met |
| Design accuracy |  Pixel-perfect implementation |
| Edit functionality |  Modal with name and country fields |
| Country from API |  All 25 countries dynamically loaded |
| PUT API integration |  Complete data persistence |
| Working product |  Fully functional, no bugs |
| Quality code |  TypeScript strict, clean architecture |
| Seamless flow |  Smooth UX with proper states |
| Pixel perfect UI |  Exact color and spacing match |
| **Bonus**: Good UI/UX |  Hover states, animations, interactions |

##  Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript strict mode enabled
- ESLint configuration included
- Consistent formatting with Prettier-compatible rules

## 📦 Dependencies

### Production
```json
{
  "@tanstack/react-query": "^5.62.14",
  "@tanstack/react-table": "^8.20.6",
  "axios": "^1.7.9",
  "clsx": "^2.1.1",
  "lucide-react": "^0.469.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.54.2",
  "tailwind-merge": "^2.6.0"
}
```

### Development
- TypeScript 5.6.2
- Tailwind CSS 3.4.17
- Vite 6.0.5
- ESLint 9.17.0

##  What I Learned

Through this assignment, I demonstrated:
- Proficiency with modern React patterns and hooks
- State management with React Query
- Complex table implementation with `@tanstack/react-table`
- Form handling and validation
- API integration and data persistence
- TypeScript type safety in production apps
- Creating pixel-perfect UIs from designs
- Building reusable component libraries
- Performance optimization techniques

##  Author

**Rajesh K**
- GitHub: [@Rajesh-k11](https://github.com/Rajesh-k11)

## 📄 License

This project was created as part of the Inkle Frontend Intern assignment.

---

⭐ If you found this implementation helpful, please consider giving it a star!
