# Todo App QA Automation Project

## Overview
This project contains a simple full-stack Todo application with:

- A Node.js backend API for authentication and todo CRUD
- A React frontend UI
- Automated API tests with Supertest
- Automated UI tests with Playwright
- GitHub Actions workflow to run tests on push

## Setup

### Backend
```bash
cd server
npm install
npm start
```

### Frontend
```bash
cd client
npm install
npm start
```

## Running Tests

### API Tests
```bash
cd server
npm test
```

### UI Tests
```bash
cd client
npx playwright test
```

## CI
The project includes a GitHub Actions workflow `.github/workflows/ci.yml` that runs both backend and frontend tests automatically on pushes.

---

Feel free to customize and extend the app and tests!
