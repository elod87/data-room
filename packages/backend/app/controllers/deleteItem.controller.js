const FileSystem = require("../models/FileSystem.model");
const fs = require("fs");
const path = require("path");

const deleteRecursive = (item) => {
  const children = FileSystem.findChildren(item._id);

  for (const child of children) {
    deleteRecursive(child);
  }

  FileSystem.remove(item._id);
};

const deleteItem = async (req, res) => {
  // #swagger.summary = 'Deletes file/folder(s).'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: "#/definitions/DeleteItems" },
        description: 'An array of item IDs to delete.'
      }
  */
  /*  #swagger.responses[200] = {
        schema: {message: "File(s) or Folder(s) deleted successfully."}
      }  
  */
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Invalid request body, expected an array of ids." });
  }

  try {
    const items = FileSystem.findByIds(ids);
    if (items.length !== ids.length) {
      return res.status(404).json({ error: "One or more of the provided ids do not exist." });
    }

    const deletePromises = items.map(async (item) => {
      const itemPath = path.join(__dirname, "../../public/uploads", item.path);
      await fs.promises.rm(itemPath, { recursive: true });

      deleteRecursive(item);
    });

    await Promise.all(deletePromises);

    res.status(200).json({ message: "File(s) or Folder(s) deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteItem;
