# Finance Data Processing and Access Control Backend

## Overview

This project is a backend system for managing financial data with role-based access control. It allows users to manage financial records securely based on their roles.

## Features

* User Management (Admin, Analyst, Viewer)
* Financial Records CRUD
* Role-Based Access Control (RBAC)
* Dashboard Summary API (Income, Expense, Balance)
* Validation and Error Handling
* Record Filtering and Sorting using query        parameters

## Tech Stack

* Node.js
* Express.js
* MongoDB

## Setup Instructions

1. Clone the project
2. Run: npm install
3. Create a .env file:
   MONGO_URI=your_mongodb_uri
4. Run server:
   npx nodemon src/server.js

## API Endpoints

### Users

* POST /api/users
* GET /api/users

### Records

* POST /api/records
* GET /api/records
* PUT /api/records/:id
* DELETE /api/records/:id

### Dashboard

* GET /api/records/summary

## Roles

* Admin → Full access
* Analyst → Create & Read
* Viewer → Read-only

## Assumptions

* Role is passed via headers for simplicity
* Authentication is not implemented

## Future Improvements

* JWT Authentication
* Filtering & Pagination
* Better validation
