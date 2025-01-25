import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes/index.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Set up server
const app = express();
const PORT = process.env.PORT || 5555;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cors());

// Routes
app.use('/', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
