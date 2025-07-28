# Test Plan: Todo App QA Automation

## What is being tested
- Node.js backend API endpoints for authentication and CRUD operations on todos.
- React frontend UI functionalities including login, adding, viewing, and deleting todos.

## Test coverage areas
- API: login success/failure, CRUD endpoints with valid and invalid data, authorization handling.
- UI: Login flow, adding a todo, deleting a todo, and asserting the displayed data.

## Tools used and why
- **Supertest**: For API testing because it integrates well with Node.js/Express apps.
- **Playwright**: For UI automation due to fast execution, easy setup, and robust cross-browser support.
- **Jest**: As test runner for backend tests.
- **GitHub Actions**: To automate running tests on every push.

## How to run tests
1. Start backend server:
   ```bash
   cd server
   npm install
   npm start
   ```
2. Start frontend app:
   ```bash
   cd client
   npm install
   npm start
   ```
3. Run backend API tests:
   ```bash
   cd server
   npm test
   ```
4. Run UI tests:
   ```bash
   cd client
   npx playwright test
   ```

## Assumptions and limitations
- The app uses a fixed test user (`test`/`1234`) with a hardcoded token for simplicity.
- UI test covers core flows; manual input for invalid credentials not implemented.
- No database persistence — todos reset on server restart.
