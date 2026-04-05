# Finance Data Processing and Access Control Backend

##  Overview

This project is a backend system for managing financial data with role-based access control (RBAC). It allows users to securely perform operations on financial records based on their assigned roles.

---

##  Features

* User Management (Admin, Analyst, Viewer)
* Financial Records CRUD (Create, Read, Update, Delete)
* Role-Based Access Control (RBAC) using middleware
* Dashboard Summary API (Total Income, Expense, Balance)
* Input Validation and Error Handling
* Record Filtering using query parameters
* Record Sorting (ascending/descending)

---

##  Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)

---

##  Setup Instructions

1. Clone the repository
2. Install dependencies:

   ```
   npm install
   ```
3. Create a `.env` file and add:

   ```
   MONGO_URI=your_mongodb_uri
   ```
4. Run the server:

   ```
   npm run dev
   ```

---

##  API Endpoints

### Users

* `POST /api/users` → Create user
* `GET /api/users` → Get all users

### Records

* `POST /api/records` → Create record (admin/analyst only)
* `GET /api/records` → Get all records
* `GET /api/records?type=income` → Filter records
* `GET /api/records?sort=amount` → Sort records
* `PUT /api/records/:id` → Update record (admin only)
* `DELETE /api/records/:id` → Delete record (admin only)

### Dashboard

* `GET /api/records/summary` → Get financial summary

---

##  Roles & Permissions

* **Admin** → Full access (CRUD)
* **Analyst** → Create & Read
* **Viewer** → Read-only

---

##  Assumptions

* Role is passed via request headers for simplicity
* Authentication (JWT) is not implemented due to scope

---

##  Future Improvements

* JWT Authentication
* Pagination support
* Advanced validation
* Deployment on cloud (Render / AWS)

---

##  Testing

All APIs were tested using Postman.
