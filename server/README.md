# Gaming Platform Backend API

A robust Node.js/Express backend API for a gaming platform that handles user authentication, game management, and user game data tracking. Built with MongoDB for data persistence and JWT for secure authentication.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Game Management**: CRUD operations for games with detailed metadata
- **User Game Data**: Track high scores, play history, and user preferences
- **Security**: Password hashing with bcrypt, JWT authentication middleware
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Configurable cross-origin resource sharing

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Environment Management**: dotenv
- **Development**: nodemon

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or cloud service like MongoDB Atlas)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gaming-platform-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Or create a `.env` file in the root directory with the following variables:
   ```env
   # Server Configuration
   PORT=4000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/gaming-platform
   # For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/gaming-platform
   
   # JWT Secret (use a strong, random string)
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the application**
   
   **Development mode:**
   ```bash
   npm run dev
   ```
   
   **Production mode:**
   ```bash
   npm start
   ```

The server will start on `http://localhost:4000` (or your specified PORT).

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "userName": "johndoe",
  "emailId": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User created"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "emailId": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Game Endpoints

#### Get All Games
```http
GET /api/games/all
```

**Response:**
```json
[
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "game_id": "snake-game",
    "title": "Snake Game",
    "genre": "Arcade",
    "description": "Classic snake game with modern twist",
    "instructions": "Use arrow keys to control the snake",
    "rating": 4.5,
    "embed_code": "<iframe src='...'></iframe>"
  }
]
```

#### Get Game by ID
```http
GET /api/games/snake-game
```

**Response:**
```json
{
  "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
  "game_id": "snake-game",
  "title": "Snake Game",
  "genre": "Arcade",
  "description": "Classic snake game with modern twist",
  "instructions": "Use arrow keys to control the snake",
  "rating": 4.5,
  "embed_code": "<iframe src='...'></iframe>"
}
```

### User Endpoints (Protected)

#### Get User Game Data
```http
GET /api/user/games
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
[
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e9",
    "userId": "64a7b8c9d1e2f3a4b5c6d7e7",
    "gameId": "snake-game",
    "highScore": 1250,
    "lastPlayed": "2024-01-15T10:30:00.000Z"
  }
]
```

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "API is running",
  "environment": "development"
}
```

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. After successful login, include the token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

Protected routes require this header to access user-specific data.

## 📊 Database Schema

### User Model
```javascript
{
  userName: String (required),
  emailId: String (required, unique),
  password: String (required, hashed),
  currentLoginStreak: Number (default: 0),
  longestLoginStreak: Number (default: 0),
  favoriteGames: Array of Strings (default: [])
}
```

### Game Model
```javascript
{
  game_id: String (required, unique),
  title: String,
  genre: String,
  description: String,
  instructions: String,
  rating: Number,
  embed_code: String
}
```

### UserGame Model
```javascript
{
  userId: ObjectId (ref: User, required),
  gameId: String (required),
  highScore: Number (default: 0),
  lastPlayed: Date (default: Date.now)
}
```

## 🧪 Testing the API

### Using cURL

**Register a user:**
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"userName":"testuser","emailId":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"emailId":"test@example.com","password":"password123"}'
```

**Get user games (replace TOKEN with actual JWT):**
```bash
curl -X GET http://localhost:4000/api/user/games \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:4000/api`
3. For protected routes, add Authorization header with Bearer token
4. Test each endpoint with sample data

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gaming-platform
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://yourdomain.com
```

### Deployment Platforms
- **Heroku**: Add buildpacks for Node.js
- **Railway**: Connect GitHub repository
- **DigitalOcean**: Use App Platform
- **AWS**: Use Elastic Beanstalk or EC2

## 🔧 Development Scripts

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests (when implemented)
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Roadmap

### Backend Enhancements
- [ ] Add comprehensive API testing
- [ ] Implement rate limiting
- [ ] Add API documentation with Swagger
- [ ] User profile management endpoints
- [ ] Game favorites and wishlist functionality
- [ ] Leaderboards and achievements system
- [ ] File upload for game assets

### Frontend Integration (Coming Soon)
- [ ] React.js frontend application
- [ ] User dashboard and profile management
- [ ] Game library and search functionality
- [ ] Real-time game embedding
- [ ] Social features and user interactions

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or check Atlas connection string
- Verify network access and credentials

**JWT Token Issues:**
- Check JWT_SECRET in environment variables
- Ensure token is sent in correct format: `Bearer <token>`

**CORS Errors:**
- Update CORS_ORIGIN in .env file
- Ensure frontend URL matches CORS configuration

**Port Already in Use:**
- Change PORT in .env file
- Kill process using the port: `lsof -ti:4000 | xargs kill -9`

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact: [lokeshgpta04@gmail.com]

---

**Note**: This is the backend API only. Frontend integration will be added in future updates to create a complete gaming platform experience.