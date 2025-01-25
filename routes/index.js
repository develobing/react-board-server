import express from 'express';
import apiRoutes from './api/index.js';

const router = express.Router();

router.use('/api', apiRoutes);
router.get('*', (req, res) => {
  res.redirect('/api');
});

export default router;
