# Visa Slot Alerts Tool

A mini internal tool for The Flying Panda to track visa slot alerts. Built with a Node.js backend and a modern React frontend using Material-UI (MUI) for a clean, responsive UI.

**Light Theme**
<img width="1755" height="1213" alt="image" src="https://github.com/user-attachments/assets/b1841aac-4a7a-4632-a957-3ff2258fe695" />

**Dark Theme**
<img width="1755" height="1213" alt="image" src="https://github.com/user-attachments/assets/4e01653f-9599-4707-8637-35a7a383f897" />



## Features
- **Create Alerts**: Form to add new visa alerts with country, city, visa type, and status.
- **View Alerts**: Table (DataGrid) to list alerts with sorting, filtering, and pagination.
- **Update Status**: Button to mark alerts as "Booked".
- **Delete Alerts**: Confirmation dialog before deleting alerts.
- **Search & Filter**: Frontend search by country and status filter.
- **API Integration**: Full CRUD operations via REST API.
- **Modern UI**: Responsive design with cards, dialogs, and snackbar notifications.

## Tech Stack
- **Backend**: Node.js, Express.js, CORS, dotenv, UUID (in-memory storage).
- **Frontend**: React, Axios, Material-UI (MUI), MUI DataGrid.
- **Other**: In-memory data storage (for simplicity; replace with DB for production).

## Setup Steps
1. **Prerequisites**: Ensure Node.js (v14+), npm, and Git are installed.
2. **Clone the Repository**:
   ```
   git clone <your-github-repo-url>
   cd visa-alerts
   ```
3. **Backend Setup**:
   - Navigate to `backend/`: `cd backend`
   - Install dependencies: `npm install`
   - Create `.env` file: `echo "PORT=5000" > .env`
   - Start the server: `node server.js` (runs on http://localhost:5000)
4. **Frontend Setup**:
   - Navigate to `frontend/`: `cd ../frontend`
   - Install dependencies: `npm install`
   - Start the app: `npm start` (runs on http://localhost:3000)
5. **Test**:
   - Open http://localhost:3000 in a browser.
   - Create alerts via the form, view in the DataGrid, update/delete with confirmations.
   - API endpoints: Use Postman or curl to test GET/POST/PUT/DELETE on http://localhost:5000/alerts (e.g., `curl -X GET http://localhost:5000/alerts`).

## Usage
- **Creating an Alert**: Fill the form with country (e.g., "USA"), city (e.g., "New York"), visa type, and status. Click "Create Alert".
- **Viewing Alerts**: Alerts appear in the DataGrid below. Use search/filter for quick access.
- **Updating/Deleting**: Click "Book" to update status or "Delete" with confirmation.
- **API Example**: POST to create: `curl -X POST http://localhost:5000/alerts -H "Content-Type: application/json" -d '{"country":"USA","city":"New York","visaType":"Tourist","status":"Active"}'`

## Design Decisions
- **Backend**: Used in-memory array for storage to keep it lightweight (no DB setup). Implemented custom logger middleware for request tracking and centralized error handling for consistency. Query filters on GET for country/status. HTTP status codes for proper API responses.
- **Frontend**: React with hooks for state management. Integrated MUI for modern, accessible UI (e.g., DataGrid for table functionality, cards for forms). Axios for API calls. Added loading states, snackbars for feedback, and confirmation dialogs for better UX.
- **Data Model**: Followed the specified schema (id, country, city, visaType, status, createdAt). UUID for unique IDs, auto-generated timestamps.
- **Project Structure**: Separated backend/frontend for modularity. Used environment variables for port configuration.

## What You’d Improve for Production
- **Database**: Replace in-memory storage with a persistent DB like MongoDB or PostgreSQL for data durability and scalability.
- **Authentication**: Add JWT-based auth or OAuth for internal tool security.
- **Testing**: Implement unit/integration tests (Jest for backend, React Testing Library for frontend).
- **Deployment**: Use Docker for containerization, deploy backend to Heroku/AWS, frontend to Netlify/Vercel. Add CI/CD with GitHub Actions.
- **Performance**: Add caching (e.g., Redis), pagination on backend, and optimize API calls.
- **Features**: Real-time updates (WebSockets), email notifications for alerts, advanced filters, and user roles.
- **Security**: Input sanitization, rate limiting, and HTTPS enforcement.
- **TypeScript**: Migrate to TypeScript for type safety and better maintainability.

## Where AI Helped vs Where You Had to Think
- **AI Helped**: Boilerplate code generation (e.g., Express app setup, basic React components, MUI component integration like DataGrid and dialogs). This sped up initial scaffolding and UI styling.
- **Where I Had to Think**: Designed the API logic (routes, middleware, error handling), ensured frontend-backend integration (e.g., state management, API calls), handled custom features like confirmation dialogs and search/filter logic, and debugged issues (e.g., middleware exports). I also structured the project, chose MUI for modernization, and ensured realism for production improvements.

## License
MIT License. See LICENSE for details.
