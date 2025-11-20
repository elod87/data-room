const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  console.error('Error handler caught:', err);
  console.error('Error stack:', err.stack);
  
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.code });
  }

  res.status(500).json({ 
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;
