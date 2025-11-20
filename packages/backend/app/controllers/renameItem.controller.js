const FileSystem = require("../models/FileSystem.model");
const fs = require("fs");
const path = require("path");

const updateChildernPathRecursive = (item) => {
  const children = FileSystem.findChildren(item._id);

  for (const child of children) {
    child.path = `${item.path}/${child.name}`;
    FileSystem.update(child._id, { path: child.path });

    if (child.isDirectory) updateChildernPathRecursive(child);
  }
};

const renameItem = async (req, res) => {
  // #swagger.summary = 'Renames a file/folder.'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: "#/definitions/RenameItem" }
      } */
  /*  #swagger.responses[200] = {
        schema: { message: "File or Folder renamed successfully!", item: {$ref: "#/definitions/FileSystem"} }
      }  
  */
  try {
    const { id, newName } = req.body;
    // Verify item exists and belongs to user
    const item = FileSystem.findByIdAndUserId(id, req.userId);
    if (!item) {
      return res.status(404).json({ error: "File or Folder not found!" });
    }

    const parentDir = `${path.dirname(item.path)}`;
    const newPath = `${parentDir}${parentDir === "/" ? "" : "/"}${newName}`;

    const oldFullPath = path.join(__dirname, "../../public/uploads", req.userId, item.path);
    const newFullPath = path.join(__dirname, "../../public/uploads", req.userId, newPath);

    if (fs.existsSync(newFullPath)) {
      return res.status(400).json({ error: "A file or folder with that name already exists!" });
    }

    await fs.promises.rename(oldFullPath, newFullPath);

    FileSystem.update(id, {
      name: newName,
      path: newPath,
    });

    const updatedItem = FileSystem.findById(id);

    if (updatedItem.isDirectory) {
      updateChildernPathRecursive(updatedItem);
    }

    res.status(200).json({ message: "File or Folder renamed successfully!", item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = renameItem;
