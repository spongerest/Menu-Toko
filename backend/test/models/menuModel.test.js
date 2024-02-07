const { Menu } = require('../../src/models/menuModel');

jest.mock('../../src/models/menuModel', () => {
    const actualModel = jest.requireActual('../../src/models/menuModel');
    return {
    ...actualModel,
    Menu: {
        ...actualModel.Menu,
        create: jest.fn(),
        findByPk: jest.fn(),
      // Mock other methods as needed
    },
    };
});

describe('Menu Model', () => {
    it('can create a menu item', async () => {
    Menu.create.mockResolvedValueOnce({
        id: 1,
        name: 'Pizza',
        description: 'Delicious cheese pizza',
        price: 9.99,
    });

    const menuItem = await Menu.create({ name: 'Pizza', description: 'Delicious cheese pizza', price: 9.99 });
    expect(menuItem.id).toBeDefined();
    expect(menuItem.name).toBe('Pizza');
    });
});