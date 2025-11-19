const FileSystem = require("../models/FileSystem.model");
const fs = require("fs");
const path = require("path");

const recursiveCopy = (sourceItem, destinationFolder) => {
  const newPath = destinationFolder
    ? `${destinationFolder.path}/${sourceItem.name}`
    : `/${sourceItem.name}`;

  const copyItem = FileSystem.save({
    name: sourceItem.name,
    isDirectory: sourceItem.isDirectory,
    path: newPath,
    parentId: destinationFolder?._id || null,
    size: sourceItem.size,
    mimeType: sourceItem.mimeType,
  });

  const children = FileSystem.findChildren(sourceItem._id);

  for (const child of children) {
    recursiveCopy(child, copyItem);
  }
};

const copyItem = async (req, res) => {
  // #swagger.summary = 'Copies file/folder(s) to the destination folder.'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: "#/definitions/CopyItems" },
        description: 'An array of item IDs to copy and the destination folder ID.'
      }
  */
  /*  #swagger.responses[200] = {
        schema: {message: "Item(s) copied successfully!"}
      }  
  */

  const { sourceIds, destinationId } = req.body;
  const isRootDestination = !destinationId;

  if (!sourceIds || !Array.isArray(sourceIds) || sourceIds.length === 0) {
    return res.status(400).json({ error: "Invalid request body, expected an array of sourceIds." });
  }

  try {
    const sourceItems = FileSystem.findByIds(sourceIds);
    if (sourceItems.length !== sourceIds.length) {
      return res.status(404).json({ error: "One or more of the provided sourceIds do not exist." });
    }

    const copyPromises = sourceItems.map(async (sourceItem) => {
      const srcFullPath = path.join(__dirname, "../../public/uploads", sourceItem.path);

      if (isRootDestination) {
        const destFullPath = path.join(__dirname, "../../public/uploads", sourceItem.name);
        await fs.promises.cp(srcFullPath, destFullPath, { recursive: true });
        recursiveCopy(sourceItem, null);
      } else {
        const destinationFolder = FileSystem.findById(destinationId);
        if (!destinationFolder || !destinationFolder.isDirectory) {
          throw new Error("Invalid destinationId!");
        }
        const destFullPath = path.join(
          __dirname,
          "../../public/uploads",
          destinationFolder.path,
          sourceItem.name
        );
        await fs.promises.cp(srcFullPath, destFullPath, { recursive: true });
        recursiveCopy(sourceItem, destinationFolder);
      }
    });

    try {
      await Promise.all(copyPromises);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Item(s) copied successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = copyItem;
