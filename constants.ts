
import type { Dish } from './types';

export const MENU_ITEMS: Dish[] = [
    {
        id: 1,
        name: 'Truffle Parmesan Fries',
        description: 'Crispy fries tossed in truffle oil, parmesan cheese, and fresh parsley.',
        price: 8.99,
        category: 'Appetizer',
        imageUrl: 'https://picsum.photos/seed/fries/400/300',
    },
    {
        id: 2,
        name: 'Bruschetta al Pomodoro',
        description: 'Toasted baguette slices topped with fresh tomatoes, garlic, basil, and balsamic glaze.',
        price: 10.50,
        category: 'Appetizer',
        imageUrl: 'https://picsum.photos/seed/bruschetta/400/300',
    },
    {
        id: 3,
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and our special sauce on a brioche bun.',
        price: 15.99,
        category: 'Main Course',
        imageUrl: 'https://picsum.photos/seed/burger/400/300',
    },
    {
        id: 4,
        name: 'Spaghetti Carbonara',
        description: 'A classic Roman pasta dish with pancetta, egg yolk, pecorino cheese, and black pepper.',
        price: 18.00,
        category: 'Main Course',
        imageUrl: 'https://picsum.photos/seed/pasta/400/300',
    },
    {
        id: 5,
        name: 'Grilled Salmon',
        description: 'Perfectly grilled salmon fillet served with asparagus and a lemon-dill sauce.',
        price: 24.50,
        category: 'Main Course',
        imageUrl: 'https://picsum.photos/seed/salmon/400/300',
    },
    {
        id: 6,
        name: 'Molten Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey molten center, served with vanilla bean ice cream.',
        price: 9.50,
        category: 'Dessert',
        imageUrl: 'https://picsum.photos/seed/cake/400/300',
    },
    {
        id: 7,
        name: 'New York Cheesecake',
        description: 'Creamy and rich cheesecake with a graham cracker crust, topped with berry compote.',
        price: 8.75,
        category: 'Dessert',
        imageUrl: 'https://picsum.photos/seed/cheesecake/400/300',
    },
    {
        id: 8,
        name: 'Fresh Lemonade',
        description: 'House-made lemonade, perfectly sweet and tart.',
        price: 4.50,
        category: 'Beverage',
        imageUrl: 'https://picsum.photos/seed/lemonade/400/300',
    },
];
