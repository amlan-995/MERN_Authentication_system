marnAuth_fixed/
├── server/                # Backend (Node.js + Express + MongoDB)
│   ├── config/            # Configuration files
│   │   └── mongodb.js     # MongoDB connection setup
│   │
│   ├── controllers/       # Controller logic for routes
│   │   ├── authController.js   # Register, login, email verify
│   │   └── userController.js   # Profile, dashboard data
│   │
│   ├── middleware/        # Express middlewares
│   │   ├── authMiddleware.js   # Protect routes using JWT
│   │   └── errorMiddleware.js  # Handle errors globally
│   │
│   ├── models/            # Mongoose models
│   │   ├── User.js        # User schema
│   │   └── Token.js       # Token for email verification or reset
│   │
│   ├── routes/            # Express routes
│   │   ├── authRoutes.js  # Routes for register/login/verify
│   │   └── userRoutes.js  # Routes for profile/dashboard
│   │
│   ├── utils/             # Helper functions
│   │   ├── generateToken.js   # Generate JWT
│   │   └── sendEmail.js       # Email utility (Nodemailer)
│   │
│   ├── .env               # Environment variables (you create this)
│   ├── package.json       # Server dependencies
│   └── server.js          # App entry point (Express)
│
└── client/                # Frontend (React)
    ├── public/
    │   └── index.html     # React HTML template
    │
    ├── src/
    │   ├── pages/         # Page components
    │   │   ├── Register.js
    │   │   ├── Login.js
    │   │   └── Dashboard.js
    │   │
    │   ├── services/      # (Optional) Axios API setup
    │   │   └── api.js     # Axios instance (baseURL, interceptors)
    │   │
    │   ├── App.js         # React routes and layout
    │   ├── index.js       # React entry point
    │   ├── App.css        # Global styles (optional)
    │   └── index.css      # Basic layout or Bootstrap import
    │
    ├── package.json       # Client dependencies
    └── package-lock.json
