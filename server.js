import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
dotenv.config({ path: './config/.env' });
const app = express();

connectDB();

import indexRouter from './src/routes/index.js';
import router from './src/routes/urls.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/api', router);

// Server Setup
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});