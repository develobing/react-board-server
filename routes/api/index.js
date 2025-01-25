import path from 'path';
import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';
import postRoutes from './posts.js';
import commentRoutes from './comments.js';

const __dirname = path.resolve();
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'api.html'));
});

export default router;
