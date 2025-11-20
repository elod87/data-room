const FileSystem = require("../models/FileSystem.model");
const fs = require("fs");
const path = require("path");

const recursiveMove = (sourceItem, destinationFolder, userId) => {
  const children = FileSystem.findChildren(sourceItem._id);
  const oldId = sourceItem._id;

  const newPath = destinationFolder
    ? `${destinationFolder.path}/${sourceItem.name}`
    : `/${sourceItem.name}`;

  const moveItem = FileSystem.save({
    name: sourceItem.name,
    isDirectory: sourceItem.isDirectory,
    path: newPath,
    parentId: destinationFolder?._id || null,
    size: sourceItem.size,
    mimeType: sourceItem.mimeType,
    userId: userId,
  });

  FileSystem.remove(oldId);

  for (const child of children) {
    recursiveMove(child, moveItem, userId);
  }
};

const moveItem = async (req, res) => {
  // #swagger.summary = 'Moves file/folder(s) to the destination folder.'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: "#/definitions/CopyItems" },
        description: 'An array of item IDs to move and the destination folder ID.'
      } */
  /*  #swagger.responses[200] = {
        schema: {message: "Item(s) moved successfully!"}
      }  
  */

  const { sourceIds, destinationId } = req.body;
  const isRootDestination = !destinationId;

  if (!sourceIds || !Array.isArray(sourceIds) || sourceIds.length === 0) {
    return res.status(400).json({ error: "Invalid request body, expected an array of sourceIds." });
  }
  try {
    // Verify all source items exist and belong to user
    const sourceItems = sourceIds.map(id => FileSystem.findByIdAndUserId(id, req.userId)).filter(Boolean);
    if (sourceItems.length !== sourceIds.length) {
      return res.status(404).json({ error: "One or more of the provided sourceIds do not exist or you don't have access." });
    }

    const movePromises = sourceItems.map(async (sourceItem) => {
      const srcFullPath = path.join(__dirname, "../../public/uploads", req.userId, sourceItem.path);

      if (isRootDestination) {
        const destFullPath = path.join(__dirname, "../../public/uploads", req.userId, sourceItem.name);
        await fs.promises.cp(srcFullPath, destFullPath, { recursive: true });
        await fs.promises.rm(srcFullPath, { recursive: true });

        recursiveMove(sourceItem, null, req.userId);
      } else {
        // Verify destination folder exists and belongs to user
        const destinationFolder = FileSystem.findByIdAndUserId(destinationId, req.userId);
        if (!destinationFolder || !destinationFolder.isDirectory) {
          throw new Error("Invalid destinationId!");
        }

        const destFullPath = path.join(
          __dirname,
          "../../public/uploads",
          req.userId,
          destinationFolder.path,
          sourceItem.name
        );
        await fs.promises.cp(srcFullPath, destFullPath, { recursive: true });
        await fs.promises.rm(srcFullPath, { recursive: true });

        recursiveMove(sourceItem, destinationFolder, req.userId);
      }
    });

    try {
      await Promise.all(movePromises);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Item(s) moved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = moveItem;
