# User Authentication API

This is a simple Node.js API for user registration and login functionality. It uses Express.js, MongoDB with Mongoose for database handling, and bcryptjs for password hashing.

## Features

- **User Registration**: Users can register with a unique username, email, and password. The password is hashed before saving to the database.
- **User Login**: Users can log in with their email and password. The password is compared with the hashed password stored in the database.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for Node.js to handle HTTP requests.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **bcryptjs**: Library to hash and compare passwords.
- **dotenv**: To manage environment variables securely.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.

## Installation

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone [https://github.com/Poonam-2704/EY-GDS-P3-FreshBite-App/tree/main/Backend]
cd user-auth-api
```

### 2. Install dependencies

Make sure you have Node.js installed. If not, you can download it [here](https://nodejs.org/).

Run the following command to install the required packages:

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory of the project and add the following:

```
MONGO_URI=mongodb+srv://<username>:<db_password>@cluster0.dtfss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
```

### 4. Start the server

```bash
npm start
```

The server will be running on port `5000` (or the port you set in `.env`).

## API Endpoints

### 1. Register a User

**POST** `/register`

Request body:
```json
{
  "username": "user1",
  "email": "user1@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "User Registered.."
}
```

### 2. Login a User

**POST** `/login`

Request body:
```json
{
  "email": "user1@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login Successful",
  "username": "user1"
}
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
