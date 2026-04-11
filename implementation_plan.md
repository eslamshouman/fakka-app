# Charity Round-up App UI (Fakka) Proof of Concept

This document outlines the architecture, page structure, design system, and mock data for the mobile-first "Fakka" (Change) Charity Application. The app simulates rounding up transactions, managing balances, and donating percentages or direct amounts to various Egyptian non-profit organizations.

## User Review Required

> [!IMPORTANT]
> - Since this is a brand new project, I will use **Next.js with the App Router**.
> - As per guidelines, I will use **Vanilla CSS / CSS Modules** for styling. If you strictly prefer TailwindCSS, please let me know, and we can configure it instead.
> - I will add a few more well-known Egyptian charities to the mock data to cover the other categories (e.g., *Misr El Kheir* for Education, *Dar El Orman* for Social Support, *Resala*). Are you fine with these additions?

## Architecture & Tech Stack
- Framework: Next.js (React)
- Styling: Vanilla CSS / CSS Modules with custom variables for the provided palette.
- State Management: React Native Context or simple localized state for the POC (handling the Mock "Balance").
- Layout: Mobile-first responsive constraints (maximum width simulating a mobile phone viewport centered on larger screens).

## Design System (Color Palette)
- Primary Dark: `#275546` (Deep Forest Green) - Used for headers, primary buttons.
- Primary Light: `#7AA278` (Soft Green) - Used for secondary elements, highlighted cards.
- Accent Light: `#F3C775` (Soft Gold/Yellow) - Used for badges, warnings, impact highlights.
- Accent Dark: `#D39F4D` (Deep Gold/Bronze) - Used for selected states, icons, progress bars.
- Background: `#FFFFFF` (White) / Off-white for section separation.

## Proposed Pages and Features

### 1. Home Page (`/`)
- Top Section: Large display of the current Balance.
- Favorite Organizations: List of non-profits the user has chosen to donate to (taken from mock data).
- Action Button: "Add Non-profit Organization", directing to the Discovery page.
- Bottom Navigation Bar to easily switch between Home, Discovery, Transactions, and Profile.

### 2. Discovery & Categories (`/discovery`)
- A scrollable list of categories:
  - Orphanage and Social Support
  - Development and Humanitarian Aid
  - Disabled Individuals and Social Integration
  - Education
  - Poverty Alleviation and Food Security
  - Animal
  - Healthcare
- Expandable lists of organizations under each category based on the provided mock data.

### 3. Organization Profile & Donation Flow (`/org/[id]`)
- Profile View: Displays Logo (placeholder/colored circle), Name, Contact Info, and Description.
- Configurator:
  - Option to Add to Favorites with a percentage allocation of the total balance.
  - Frequency toggle: One-time vs Monthly.
  - Direct Transaction: Pay a specific one-time amount immediately.
- Confirmation: A polished "Thank You" popup message with micro-animations when a transaction is successful.

### 4. Transactions & Round-up Settings (`/transactions`)
- List of mock transactions (e.g., Grocery: 298 EGP).
- Display of the "Round-up" cut (e.g., +2 EGP added to balance).
- Settings Panel: A slider to set the "Max Round-up per transaction" (e.g., Round to nearest 5, 10, or customized limit).

### 5. Client Profile & Impact Dashboard (`/profile`)
- Top Section: Personal data (Name, Member since).
- Charts/Cards: Total donations spent, Average spend per month.
- Impact Dashboard: List of charities donated to, total amount given to each, and the *Impact* of that money (e.g., "500 EGP = 1 New Bed for Baheya", "200 EGP = 10 Meals for Egyptian Food Bank").

## Additional Mock Data Preparation
I will scaffold a `data.ts` file housing:
- A `USER` mock object (Balance, Name, Transaction History, Round-up Settings, Favorites).
- An `ORGANIZATIONS` array segmented by Categories.
- An `IMPACT_METRICS` mapping for charities to translate amounts to tangible impacts.

## Verification Plan
1. **Automated Setup:** Initialize the Next.js app inside `d:/Temp/Fatma/Fakka-app` using `npx create-next-app@latest`.
2. **Implementation:** Build the layout, standard components (Cards, Buttons, NavBar, Modals), and pages.
3. **Manual Verification:** Start the development server (`npm run dev`) and test the UI across the defined user flows (Adding an org, checking balance updates, adjusting sliders). We'll ensure it respects a mobile aspect ratio and the provided color scheme.
