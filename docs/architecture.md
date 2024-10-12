#  Fitness Tracker for Social Sharing:  MVP Architecture

This document outlines the architecture of the Fitness Tracker for Social Sharing MVP. It describes the key components, data flow, and dependencies that make up the application.

### 1. Frontend Architecture

The frontend of the application is built using Next.js 14 with App Router, React 18.3.1, and React-DOM 18.3.1. It utilizes Tailwind CSS 3.4.13 and Emotion 11.13.3 for styling and a robust state management system based on Zustand 5.0.0-rc.2.

**Key Components:**

- **Pages:**
    - `/index.tsx`: Landing Page - Welcomes users, displays features, and provides sign-up/login links.
    - `/login.tsx`: Login Page - Allows users to authenticate using Google Sign-In.
    - `/signup.tsx`: Signup Page - Enables new users to create accounts.
    - `/dashboard.tsx`: Dashboard - Displays user statistics, recent progress, and links to other features.
    - `/goals.tsx`: Goals List - Shows the user's goals and provides options to create, view, edit, and delete goals.
    - `/goals/[id].tsx`: Individual Goal - Displays detailed information about a specific goal, including progress.
    - `/progress.tsx`: Progress List -  Displays progress entries for a chosen goal.
    - `/progress/[id].tsx`: Individual Progress Entry - Displays details about a specific progress entry.
- **Components:**
    - `src/frontend/components/common/Button.tsx`: Reusable button component with customizable styling and functionality.
    - `src/frontend/components/common/Input.tsx`: Reusable input component for user data entry.
    - `src/frontend/components/common/Modal.tsx`:  Reusable modal component for displaying dialogs and overlays.
    - `src/frontend/components/common/Spinner.tsx`:  Reusable spinner component for indicating loading states.
    - `src/frontend/components/layout/Header.tsx`: Application header component - displays branding, navigation, and user profile.
    - `src/frontend/components/layout/Footer.tsx`: Application footer component - displays copyright information and links.
    - `src/frontend/components/layout/Sidebar.tsx`:  Application sidebar component - displays a navigation menu.

**Data Flow:**

1. **Authentication:**
    - `src/frontend/pages/api/auth/[...nextauth].ts` handles Google Sign-In authentication, interacts with the Supabase API, and manages user sessions.
    -  `src/frontend/hooks/useAuth.ts` manages the authentication state using the Zustand store.
2. **Goal Management:**
    - `src/frontend/pages/api/goals/[id].ts` handles CRUD operations for individual goals.
    - `src/frontend/pages/api/goals/route.ts` handles fetching a list of goals and creating new goals.
    - `src/frontend/hooks/useGoals.ts` manages goal data using the Zustand store and interacts with the `src/frontend/services/goals.ts` service.
3. **Progress Tracking:**
    - `src/frontend/pages/api/progress/[id].ts` handles CRUD operations for individual progress entries.
    - `src/frontend/pages/api/progress/route.ts` handles fetching a list of progress entries and creating new entries.
    - `src/frontend/hooks/useProgress.ts` manages progress data using the Zustand store and interacts with the `src/frontend/services/progress.ts` service.
4. **Data Visualization:**
    - `src/frontend/components/features/progress/ProgressChart.tsx` visualizes progress data using the Chart.js library.

### 2. Backend Architecture

The backend API is built using Express.js and utilizes the Prisma ORM for database interactions. The API leverages the Supabase API for user authentication, data storage, and retrieval. It's built with a focus on RESTful API design.

**Key Components:**

- **Controllers:**
    - `src/backend/src/controllers/authController.ts`: Handles user signup and login requests.
    - `src/backend/src/controllers/userController.ts`: Handles user creation, retrieval, update, and deletion.
    - `src/backend/src/controllers/goalController.ts`:  Handles goal creation, retrieval, update, and deletion.
    - `src/backend/src/controllers/progressController.ts`: Handles progress entry creation, retrieval, update, and deletion.
- **Middlewares:**
    - `src/backend/src/middlewares/authMiddleware.ts`: Authenticates API requests using JWT tokens.
    - `src/backend/src/middlewares/errorHandler.ts`: Handles global error handling for API requests.
- **Models:**
    - `src/backend/src/models/User.ts`: Defines the User model and related services.
    - `src/backend/src/models/Goal.ts`:  Defines the Goal model and related services.
    - `src/backend/src/models/Progress.ts`: Defines the Progress model and related services.
- **Services:**
    - `src/backend/src/services/authService.ts`: Manages user authentication, including token generation and verification.
    - `src/backend/src/services/userService.ts`: Provides user management functionalities.
    - `src/backend/src/services/goalService.ts`:  Provides goal management functionalities.
    - `src/backend/src/services/progressService.ts`: Provides progress entry management functionalities.
- **Routes:**
    - `src/backend/src/routes/authRoutes.ts`: Defines routes for user authentication.
    - `src/backend/src/routes/userRoutes.ts`: Defines routes for user management.
    - `src/backend/src/routes/goalRoutes.ts`:  Defines routes for goal management.
    - `src/backend/src/routes/progressRoutes.ts`: Defines routes for progress entry management.

**Data Flow:**

1. **Authentication:**
    - Frontend sends authentication requests to `src/backend/src/routes/authRoutes.ts`.
    - The `src/backend/src/controllers/authController.ts` uses the `src/backend/src/services/authService.ts` to authenticate users, generate JWT tokens, and store user data in the Supabase database.
2. **User Management:**
    -  Frontend sends user management requests to `src/backend/src/routes/userRoutes.ts`.
    - The `src/backend/src/controllers/userController.ts` uses the `src/backend/src/services/userService.ts` to create, retrieve, update, and delete user data in the Supabase database.
3. **Goal Management:**
    - Frontend sends goal management requests to `src/backend/src/routes/goalRoutes.ts`.
    - The `src/backend/src/controllers/goalController.ts` uses the `src/backend/src/services/goalService.ts` to create, retrieve, update, and delete goal data in the Supabase database.
4. **Progress Entry Management:**
    - Frontend sends progress entry management requests to `src/backend/src/routes/progressRoutes.ts`.
    - The `src/backend/src/controllers/progressController.ts` uses the `src/backend/src/services/progressService.ts` to create, retrieve, update, and delete progress entry data in the Supabase database.

### 3. Data Model

The data model is structured using the following tables in the Supabase database:

- **users:** Stores user information, including email, password, and username.
- **goals:** Stores user goals, including name, target, metric, progress status, and the associated user ID.
- **progress:**  Stores progress entries for goals, including date, value, description, associated user ID, and goal ID.

### 4. Security

The MVP implements the following security measures:

- **User Authentication:** Secure user signup and login with password hashing and email verification using NextAuth.js and Supabase.
- **JWT Authentication:**  API requests are authenticated using JWT tokens, ensuring authorized access to protected data.
- **Input Validation:** API requests are validated to prevent malicious input and ensure data integrity.
- **Data Encryption:** Sensitive user data (passwords) is encrypted using bcrypt.
- **Error Handling:** Robust error handling mechanisms are implemented to prevent unexpected errors and provide user-friendly feedback.

### 5. Deployment

The MVP is deployed using Vercel. Deployment is automated using the `vercel.json` file and a custom deployment script in `tools/scripts/deploy.sh`.

**Deployment Steps:**

1. Ensure all dependencies are installed (`npm install`).
2. Build the frontend application (`npm run build`).
3. Deploy the application to Vercel (`vercel deploy --prod --token=$VERCEL_TOKEN`).

### 6. Testing and Quality Assurance

The MVP uses Jest 29.7.0 for unit testing and integration testing. Code coverage is tracked to ensure a high level of code quality.

**Testing Strategies:**

- **Unit Testing:**  Each component and API route is tested independently to ensure functionality.
- **Integration Testing:**  Key features are tested together to verify seamless integration.
- **End-to-End Testing:**  (Optional) The application is tested from a user perspective to ensure functionality across the entire flow.

### 7.  Shared Components and Utilities

The MVP utilizes shared components from the `shared/ui-components` package and utility functions from the `shared/utils` package.

**Shared Components:**

- `src/shared/ui-components/src/Button/Button.tsx`: Reusable button component.
- `src/shared/ui-components/src/Card/Card.tsx`: Reusable card component.
- `src/shared/ui-components/src/Input/Input.tsx`: Reusable input component.
- `src/shared/ui-components/src/Modal/Modal.tsx`: Reusable modal component.

**Shared Utilities:**

- `src/shared/utils/src/date/formatDate.ts`:  Utility for formatting dates.
- `src/shared/utils/src/string/capitalize.ts`: Utility for capitalizing strings.

### 8. Key Technologies and Versions

- Next.js: `14.2.15`
- React: `18.3.1`
- React-DOM: `18.3.1`
- Tailwind CSS: `3.4.13`
- Emotion: `11.13.3`
- Zustand: `5.0.0-rc.2`
- Supabase: Latest version (for database and authentication)
- Prisma: `5.20.0`
- Chart.js: `4.4.4`
- Express.js: Latest version (for backend API)
- bcrypt: Latest version (for password hashing)
- jsonwebtoken: Latest version (for JWT token generation)
- ESLint: `9.12.0`
- Prettier: `3.3.3`
- Jest: `29.7.0`
- @testing-library/react: `16.0.1`

### Conclusion

This architecture document provides a high-level overview of the Fitness Tracker for Social Sharing MVP. It highlights the key components, data flow, dependencies, security measures, and deployment strategies involved. By adhering to this architecture and following best practices, the development team can build a robust and scalable application that meets the needs of fitness enthusiasts while providing a compelling user experience.