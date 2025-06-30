# Simple Todo Authentication

## Overview
The application now uses a simplified authentication system without JWT tokens.

## How It Works

### Backend
- Users can register with name, email, and password
- Passwords are securely hashed using bcryptjs
- Login validates credentials and returns user data (without password)
- No tokens or sessions are used

### Frontend
- User data is stored in localStorage after successful login
- Authentication state is managed in React context
- Simple logout clears localStorage and redirects to login

## API Endpoints

### User Registration
```
POST /users/create
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com", 
    "password": "MySecure123"
}
```

### User Login
```
POST /users/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "MySecure123"
}

Response:
{
    "message": "Login successful",
    "user": {
        "id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

## Security Features
- Password hashing with bcryptjs (salt rounds: 12)
- Password validation (min 8 chars, uppercase, lowercase, numbers)
- No plain text password storage
- Input validation and error handling

## Limitations
- No session management or expiration
- Authentication state only persists in localStorage
- No server-side session tracking
- Suitable for development/demo purposes

## Starting the Application

### Backend
```bash
cd server
npm run dev
```

### Frontend
```bash
cd client
npm run dev
```

The app will be available at `http://localhost:5174` (frontend) and `http://localhost:3000` (backend).
