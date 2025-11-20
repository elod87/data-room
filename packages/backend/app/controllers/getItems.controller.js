const FileSystem = require("../models/FileSystem.model");

const getItems = async (req, res) => {
  // #swagger.summary = 'Get all items (files & folders)'
  try {
    // Safety check - userId should be set by auth middleware
    if (!req.userId) {
      console.error('getItems: req.userId is undefined');
      return res.status(401).json({ error: 'User ID not found in request' });
    }

    // Only return items for the authenticated user
    const files = FileSystem.findByUserId(req.userId);
    /* 
    #swagger.responses[200] = {
      description: 'Successful response',
      schema:[{$ref: "#/definitions/FileSystem"}]
    } 
    */
    res.status(200).json(files);
  } catch (error) {
    console.error('getItems error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: error.message, stack: process.env.NODE_ENV === 'development' ? error.stack : undefined });
  }
};

module.exports = getItems;
