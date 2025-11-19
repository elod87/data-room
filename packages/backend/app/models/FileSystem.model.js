let fileSystemStore = [];
let idCounter = 1;

const generateId = () => String(idCounter++);

const find = () => [...fileSystemStore];

const findById = (id) => fileSystemStore.find((item) => item._id === id);

const findByPath = (path) => fileSystemStore.find((item) => item.path === path);

const findChildren = (parentId) =>
    fileSystemStore.filter((item) => item.parentId === parentId);

const findByIds = (ids) => fileSystemStore.filter((item) => ids.includes(item._id));

const save = (item) => {
    if (!item._id) {
        item._id = generateId();
        item.createdAt = new Date();
        item.updatedAt = new Date();
        fileSystemStore.push(item);
    } else {
        const existingIndex = fileSystemStore.findIndex((i) => i._id === item._id);
        if (existingIndex > -1) {
            item.updatedAt = new Date();
            fileSystemStore[existingIndex] = item;
        } else {
            item.updatedAt = new Date();
            fileSystemStore.push(item);
        }
    }
    return item;
};

const remove = (id) => {
    const index = fileSystemStore.findIndex((item) => item._id === id);
    if (index > -1) {
        fileSystemStore.splice(index, 1);
    }
};

const update = (id, updates) => {
    const item = findById(id);
    if (item) {
        Object.assign(item, updates);
        item.updatedAt = new Date();
        return item;
    }
    return null;
};

module.exports = {
    find,
    findById,
    findByPath,
    findChildren,
    findByIds,
    save,
    remove,
    update,
};