# Student Management REST API

A RESTful API built with **Node.js** and **Express.js** to manage student records using CRUD operations. Data is stored in an in-memory array (no database), so it resets whenever the server restarts.

Lab Assignment 2 – Web Dev III (Node.js & Express Backend), Unit 2.

## Features

- Full CRUD operations on student records
- Modular routing with Express Router
- Custom logger middleware (logs timestamp, method and URL)
- Input validation with proper HTTP status codes
- Global error handling (404 for unknown routes, 400 for bad JSON, 500 for server errors)

## Tech Stack

- Node.js
- Express.js
- Postman (for testing)

## Project Structure

```
Controllers/
├── app.js                       # Server setup, middleware, error handlers
├── package.json
├── controllers/
│   └── studentController.js     # CRUD logic for students
├── data/
│   └── students.js              # In-memory student data (array)
├── middleware/
│   └── logger.js                # Custom logger middleware
└── routes/
    └── studentRoutes.js         # Student routes
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed (v18 or above recommended)

### Installation

```bash
git clone <your-repo-link>
cd <your-repo-folder>
npm install
```

### Run the server

```bash
npm start
```

The server runs at `http://localhost:3000`.

For auto-restart during development:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| GET    | `/students`      | Get all students       |
| GET    | `/students/:id`  | Get a student by ID    |
| POST   | `/students`      | Add a new student      |
| PUT    | `/students/:id`  | Update a student       |
| DELETE | `/students/:id`  | Delete a student       |

### Student object

```json
{
  "id": 1,
  "name": "Dev",
  "course": "BCA"
}
```

### Example requests

**POST /students**

```json
{
  "name": "Riya",
  "course": "MCA"
}
```

Response (`201 Created`):

```json
{
  "success": true,
  "message": "Student created successfully",
  "data": { "id": 4, "name": "Riya", "course": "MCA" }
}
```

**PUT /students/1** (send one or both fields)

```json
{
  "name": "Dev Kumar"
}
```

Response (`200 OK`):

```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": { "id": 1, "name": "Dev Kumar", "course": "BCA" }
}
```

## Status Codes

| Code | Meaning      | When it is returned                                          |
|------|--------------|--------------------------------------------------------------|
| 200  | OK           | Successful GET, PUT or DELETE                                |
| 201  | Created      | Student created successfully                                 |
| 400  | Bad Request  | Missing or invalid fields, invalid ID format, malformed JSON |
| 404  | Not Found    | Student with the given ID does not exist, or unknown route   |
| 500  | Server Error | Unexpected server error                                      |

## Testing with Postman

1. Start the server with `npm start`.
2. Open Postman and create requests for each endpoint above.
3. For `POST` and `PUT`, set **Body → raw → JSON**.
4. Also test the error cases:
   - `GET /students/999` returns 404
   - `GET /students/abc` returns 400
   - `POST /students` with a missing `course` returns 400
   - `PUT /students/1` with an empty body returns 400

## Logger Middleware

Every request is logged to the console in this format:

```
[2026-10-06T15:54:19.952Z] GET /students
```

## Author

Raghav# Backend-Development-Assignment-2
