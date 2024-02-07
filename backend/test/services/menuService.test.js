const { addMenuItem, getAllMenuItems, updateMenuItem, deleteMenuItem } = require('../../src/services/menuService');
// Mock the Menu model
jest.mock('../../src/models/menuModel', () => ({
    Menu: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn()
    }
}));

const { Menu } = require('../../src/models/menuModel'); // This is the mocked Menu

describe('menuService', () => {
    beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
    });

    describe('addMenuItem', () => {
    it('should add a new menu item', async () => {
        const newItem = { name: 'Salad', description: "Veggies" ,price: 5 };
        Menu.create.mockResolvedValue(newItem);

        const result = await addMenuItem(newItem);
    
        expect(Menu.create).toHaveBeenCalledWith(newItem);
        expect(result).toEqual(newItem);
    });
    });

    describe('getAllMenuItems', () => {
    it('should return all menu items', async () => {
        const items = [{ ame: 'Salad', description: "Veggies" ,price: 5 }, { name: 'Pizza', description:"Cheese", price: 10 }];
        Menu.findAll.mockResolvedValue(items);

        const result = await getAllMenuItems();

        expect(Menu.findAll).toHaveBeenCalled();
        expect(result).toEqual(items);
    });
    });

    describe('updateMenuItem', () => {
    it('should update an existing menu item', async () => {
        const updatedData = { name: 'Updated Salad', price: 6 };
        const menuItem = { id: 1, update: jest.fn().mockResolvedValue(updatedData) };
        Menu.findByPk.mockResolvedValue(menuItem);

        const result = await updateMenuItem(1, updatedData);

        expect(Menu.findByPk).toHaveBeenCalledWith(1);
        expect(menuItem.update).toHaveBeenCalledWith(updatedData);
        expect(result).toEqual(menuItem);
    });

    it('should throw an error if menu item not found', async () => {
        Menu.findByPk.mockResolvedValue(null);

        await expect(updateMenuItem(999, {})).rejects.toThrow('Menu item not found');
    });
    });

    describe('deleteMenuItem', () => {
    it('should delete an existing menu item', async () => {
        const menuItem = { id: 1, destroy: jest.fn().mockResolvedValue({}) };
        Menu.findByPk.mockResolvedValue(menuItem);

        const result = await deleteMenuItem(1);

        expect(Menu.findByPk).toHaveBeenCalledWith(1);
        expect(menuItem.destroy).toHaveBeenCalled();
        expect(result).toEqual({ message: 'Menu item deleted successfully' });
    });

    it('should throw an error if menu item not found', async () => {
        Menu.findByPk.mockResolvedValue(null);
    
        await expect(deleteMenuItem(999)).rejects.toThrow('Menu item not found');
    });
    });
});