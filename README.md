# Gemini Cleaning - Frontend Documentation

## Project Overview
This is a React-based frontend application for Gemini Cleaning services, built with modern tools and best practices. The application features a responsive design, authentication system, and a consistent design language.

## Tech Stack
- React 
- TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- React Router (Navigation)
- Zustand (State Management)

## Project Structure
```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── store/            # Zustand state management
├── styles/           # Global styles
└── App.tsx           # Root component
```

## Design System

### Color Scheme
We use a semantic color system defined in `tailwind.config.js`. Always use these color tokens instead of hard-coded values:

- **Primary Colors** (Blue) - Main brand colors
  - Use for: Primary actions, brand elements, and key highlights
  - Example: `text-primary-600`, `bg-primary-500`
  ```js
  primary: {
    50: '#ebf5ff',   // Lightest
    100: '#d0e2ff',
    200: '#a6c8ff',
    300: '#78a9ff',
    400: '#4589ff',
    500: '#0f62fe',  // Base
    600: '#0043ce',
    700: '#002d9c',
    800: '#001d6c',
    900: '#001141',
    950: '#000a29'   // Darkest
  }
  ```

- **Secondary Colors** (Gray) - Interface colors
  - Use for: Text, backgrounds, borders, and non-interactive elements
  - Example: `text-secondary-900`, `bg-secondary-50`

- **Accent Colors** (Yellow) - Highlight colors
  - Use for: Calls to action, warnings, and important highlights
  - Example: `bg-accent-500`, `text-accent-700`

### Typography
- Use Tailwind's built-in text utilities
- Heading hierarchy: `text-4xl` for main headings, `text-3xl` for subheadings, etc.
- Body text: `text-base` for regular content

### Spacing
- Use Tailwind's spacing scale
- Common values: `p-4`, `m-2`, `gap-6`
- Maintain consistent spacing within components

## Component Guidelines

### Best Practices
1. **Component Structure**
   - Keep components focused and single-responsibility
   - Use TypeScript interfaces for props
   - Export components as default when they're the main export

2. **Styling**
   - Use Tailwind classes exclusively
   - Follow mobile-first responsive design
   - Use semantic color tokens from the theme
   - Maintain consistent spacing using Tailwind utilities

3. **State Management**
   - Use Zustand for global state
   - Keep component state local when possible
   - Follow the existing auth store pattern for new stores

### Example Component
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, size = 'md', children }) => {
  const baseClasses = "rounded-md font-medium";
  const variantClasses = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white",
    secondary: "bg-secondary-200 hover:bg-secondary-300 text-secondary-900",
    accent: "bg-accent-500 hover:bg-accent-600 text-white"
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </button>
  );
};
```

## Authentication
- Test account credentials:
  - Email: admin@geminicleaning.com
  - Password: admin123
- Protected routes are wrapped with `ProtectedRoute` component
- Auth state is managed in `src/store/authStore.ts`

## Routing
- All routes are defined in `App.tsx`
- Protected routes use the `ProtectedRoute` wrapper
- Follow the existing pattern for adding new routes

## Adding New Features

### New Pages
1. Create a new file in `src/pages`
2. Add the route in `App.tsx`
3. Update navigation if needed in `Navbar.tsx`

### New Components
1. Create component in `src/components`
2. Follow the existing naming and structure pattern
3. Use TypeScript interfaces for props
4. Maintain consistent styling with design system

### New State
1. Create a new store file in `src/store`
2. Follow the Zustand pattern from `authStore.ts`
3. Keep stores focused and single-purpose

## Development Workflow
1. Follow the existing Git workflow
2. Maintain consistent code formatting
3. Test across different screen sizes
4. Ensure type safety with TypeScript
5. Keep components and functions pure when possible

## Running the Project
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Common Issues and Solutions
- If styling isn't applying, check that you're using the correct color tokens
- For protected route issues, verify auth state in dev tools
- Component updates not reflecting? Check the HMR connection

## Future Considerations
- Keep the color scheme in `tailwind.config.js` synchronized
- Maintain type safety across the application
- Follow the component structure for consistency
- Use semantic color tokens for all new features
