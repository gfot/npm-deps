import path from 'path';
import express from 'express';

const router = express.Router();

router.get('*', (req, res) => {
  // __dirname depends on webpack server configuration
  res.sendFile(path.join(__dirname, 'index.html'));
});

export default router;
