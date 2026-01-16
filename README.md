# Interactive Credit Card Details Form

A modern, interactive credit card details form built with React, TypeScript, and Vite. This application provides a real-time credit card preview that updates as users fill in their information, complete with form validation and a polished user experience.

## Features

- 🎴 **Interactive Card Preview** - Real-time visual representation of the credit card (front and back)
- ✅ **Form Validation** - Comprehensive validation using Yup schema with React Hook Form
- 🔒 **Luhn Algorithm** - Credit card number validation using the industry-standard Luhn algorithm
- 📱 **Responsive Design** - Fully responsive layout that works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Clean and professional design matching the provided Figma mockups
- ⚡ **Performance Optimized** - Optimized watch subscriptions and form reset functionality
- ♿ **Accessible** - Semantic HTML and proper form structure

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **React Hook Form** - Form state management and validation
- **Yup** - Schema validation
- **React Input Mask** - Input formatting for card number, date, and CVC

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Interactive-Credit-Card-details
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
src/
├── components/          # React components
│   ├── CardForm.tsx     # Form component with validation
│   ├── CardPreview.tsx  # Credit card visual preview
│   └── SuccessState.tsx # Success confirmation screen
├── types/               # TypeScript type definitions
│   └── form.ts          # Form input types
├── utils/               # Utility functions
│   └── validation.ts    # Yup validation schemas
├── assets/              # Images and icons
│   ├── images/          # Card backgrounds and main backgrounds
│   └── icons/           # SVG icons (card logo, success icon)
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Design

This project is based on the Frontend Mentor challenge design. You can view the original design files:

- [Figma Design](https://www.figma.com/file/tghNo2lZaUyBeM3NUWIpBS/interactive-card-details-form?type=design&node-id=0-361&t=5jmioPGoKa3SyqFc-0)

### Design Preview

![Active States](./public/design-preview/active-states.jpg)
![Complete State Desktop](./public/design-preview/complete-state-desktop.jpg)
![Complete State Mobile](./public/design-preview/complete-state-mobile.jpg)
![Desktop Design](./public/design-preview/desktop-design.jpg)
![Desktop Preview](./public/design-preview/desktop-preview.jpg)
![Mobile Design](./public/design-preview/mobile-design.jpg)

## Features in Detail

### Form Validation

- **Cardholder Name**: Required, 2-30 characters, must include both first and last name
- **Card Number**: Required, 16 digits, validated with Luhn algorithm
- **Expiration Date (MM/YY)**: Required, dynamic year validation (current year to 15 years ahead)
- **CVC**: Required, 3 digits

### Card Preview

- Real-time updates as user types
- Shows card number in 4-4-4-4 format
- Displays cardholder name and expiration date
- Shows CVC on the back of the card

### Dynamic Year Validation

The expiration year validation automatically adjusts based on the current year, ensuring cards are always validated correctly regardless of when the application is used.

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the deployment configuration.

### Deploying to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project on Vercel:

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

3. Vercel will automatically detect Vite and configure:

   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Click "Deploy" and your site will be live!

### Manual Deployment

If you prefer to deploy manually using Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Browser Support

This application works on all modern browsers that support:

- ES6+
- CSS Grid and Flexbox
- Modern JavaScript features

## License

This project is private and not licensed for public use.

## Author

- **Author**: Tamara Tava
- **LinkedIn**: [https://www.linkedin.com/in/tamara-tava/](https://www.linkedin.com/in/tamara-tava/)
