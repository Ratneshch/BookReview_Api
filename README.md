# Book Review API

**Book Review API** is a RESTful backend service for managing books and their reviews. It supports secure JWT authentication and full CRUD operations.

---

## Features

- User registration and login with JWT authentication
- Add, fetch all books, fetch book by ID
- Add, update, delete reviews per book
- Pagination, filtering, and search support
- Secure routes with authentication middleware

---

## Tech Stack

- Node.js, Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## Installation

1. **Clone the repository:**
   ```bash
   https://github.com/Ratneshch/BookReview_Api.git
   ```

2. **Navigate into the project folder:**
   ```bash
   cd BookReview_Api
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a `.env` file in the root directory and add the following:**
   ```
   PORT=your_port
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the server:**
   ```bash
   npm start
   ```

---

## Folder Structure

```
book-review-api/
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── reviewController.js
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Review.js
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── reviewRoutes.js
├── middleware/
│   └── authMiddleware.js
├── utils/
│   └── connectDB.js
├── .env
└── server.js
```

---

## Database Schema

**User**
- `_id` (ObjectId)
- `name` (String)
- `email` (String, unique)
- `password` (String, hashed)

**Book**
- `_id` (ObjectId)
- `title` (String)
- `author` (String)
- `genre` (String)
- `description` (String)
- `reviews` (Array of ObjectId referencing Review)

**Review**
- `_id` (ObjectId)
- `book` (ObjectId referencing Book)
- `user` (ObjectId referencing User)
- `rating` (Number)
- `comment` (String)
- `createdAt` (Date)

---

## Example API Requests

### 1. Register User
**POST** `/api/signup`  
Headers: `Content-Type: application/json`  
Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login User
**POST** `/api/login`  
Headers: `Content-Type: application/json`  
Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
_Response contains JWT token to be used Authorization header._

### 3. Get All Books
**GET** `/api/books?page=1&limit=10`  
No authentication required.

### 4. Get Book By ID
**GET** `/api/books/{bookId}`  
Replace `{bookId}` with actual book ID.  
No authentication required.

### 5. Add a Review (Authenticated)
**POST** `/api/books/{bookId}/reviews`  
Replace `{bookId}` with actual book ID.  
Headers:
- `Content-Type: application/json`
- `Authorization: Bearer <JWT_TOKEN>`

Body:
```json
{
  "rating": 5,
  "comment": "Amazing read!"
}
```

### 6. Update Review (Authenticated)
**PUT** `/api/reviews/{reviewId}`  
Replace `{reviewId}` with actual review ID.  
Headers:
- `Content-Type: application/json`
- `Authorization: Bearer <JWT_TOKEN>`

Body:
```json
{
  "rating": 4,
  "comment": "Updated my review comment."
}
```

### 7. Delete Review (Authenticated)
**DELETE** `/api/reviews/{reviewId}`  
Replace `{reviewId}` with actual review ID.  
Headers:
- `Authorization: Bearer <JWT_TOKEN>`

---

## License

This project is licensed under the [MIT License](LICENSE).
