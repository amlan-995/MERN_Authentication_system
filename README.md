marnAuth/
├── .gitignore
├── README.md
├── server/                 # Backend (Node.js + Express + MongoDB)
│   ├── config/
│   │   └── mongodb.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Token.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── sendEmail.js
│   ├── .env.example       # Environment variables template
│   ├── package.json
│   └── server.js
└── client/                # Frontend (React)
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── pages/
    │   │   ├── Register.js
    │   │   ├── Login.js
    │   │   └── Dashboard.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   ├── App.css
    │   └── index.css
    ├── package.json
    └── package-lock.json
