const { Menu } = require('../models');

const addMenuItem = async (menuItemData) => {
    const menuItem = await Menu.create(menuItemData);
    return menuItem;
};


const getAllMenuItems = async () => {
    const menuItems = await Menu.findAll();
    return menuItems;
};


const updateMenuItem = async (menuItemId, updateData) => {
    const menuItem = await Menu.findByPk(menuItemId);
    if (!menuItem) {
        throw new Error('Menu item not found');
    }
    await menuItem.update(updateData);
    return menuItem;
};

const deleteMenuItem = async (menuItemId) => {
    const menuItem = await Menu.findByPk(menuItemId);
    if (!menuItem) {
        throw new Error('Menu item not found');
    }
    await menuItem.destroy();
    return { message: 'Menu item deleted successfully' };
};


module.exports = {
    addMenuItem,
    getAllMenuItems,
    updateMenuItem,
    deleteMenuItem,
};
