
import type { Dish } from './types';

export const MENU_ITEMS: Dish[] = [
    // ON THE RUN
    { id: 101, name: 'French Fries', description: 'Classic crispy golden potato fries.', price: 180, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400' },
    { id: 102, name: 'Cheesy Loaded Fries', description: 'Crispy fries smothered in rich cheese sauce.', price: 350, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=400' },
    { id: 103, name: 'Garlic French Fries', description: 'Fries tossed with fresh garlic and herbs.', price: 190, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1623238914276-085c533bb2b7?auto=format&fit=crop&q=80&w=400' },
    { id: 104, name: 'Honey Chilli Potato', description: 'Crispy potato fingers glazed in honey chilli sauce.', price: 180, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1619194617062-5a61b9c6a049?auto=format&fit=crop&q=80&w=400' },
    { id: 105, name: 'Crispy Corn', description: 'Fried sweet corn kernels tossed in spices.', price: 350, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&q=80&w=400' },
    { id: 106, name: 'Cheese Balls (8pcs)', description: 'Melt-in-mouth cheese centers with a crispy shell.', price: 490, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=400' },
    
    // CHAAT HOUSE
    { id: 201, name: 'Paneer Chaat', description: 'Tangy and spicy paneer cubes with Indian chutneys.', price: 120, category: 'Chaat House', imageUrl: 'https://images.unsplash.com/photo-1601050633647-8f8f203d078a?auto=format&fit=crop&q=80&w=400' },
    { id: 202, name: 'Veg Aloo Tikki (2pcs)', description: 'Crispy potato patties served with tamarind sauce.', price: 80, category: 'Chaat House', imageUrl: 'https://images.unsplash.com/photo-1589670307596-a1767553e1d4?auto=format&fit=crop&q=80&w=400' },
    { id: 203, name: 'Masala Papd', description: 'Roasted papad topped with chopped onions and tomatoes.', price: 60, category: 'Chaat House', imageUrl: 'https://images.unsplash.com/photo-1626132644529-56e94e93fc9a?auto=format&fit=crop&q=80&w=400' },

    // TANDOORI STARTERS
    { id: 301, name: 'Paneer Tikka (6pcs)', description: 'Marinated paneer cubes grilled in a traditional tandoor.', price: 280, category: 'Tandoori Starters', imageUrl: 'https://images.unsplash.com/photo-1567184109411-47a7a39485ed?auto=format&fit=crop&q=80&w=400' },
    { id: 302, name: 'Dahi Kebab', description: 'Velvety kebabs made from hung curd and delicate spices.', price: 400, category: 'Tandoori Starters', imageUrl: 'https://images.unsplash.com/photo-1626508064441-799d057008ee?auto=format&fit=crop&q=80&w=400' },
    { id: 303, name: 'Mushroom Chilly', description: 'Fresh mushrooms tossed in a spicy Indo-Chinese sauce.', price: 350, category: 'Tandoori Starters', imageUrl: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=80&w=400' },

    // CHINESE
    { id: 401, name: 'Paneer 65 (8pcs)', description: 'Spicy, deep-fried paneer cubes marinated in ginger and garlic.', price: 350, category: 'Chinese', imageUrl: 'https://images.unsplash.com/photo-1626132644529-56e94e93fc9a?auto=format&fit=crop&q=80&w=400' },
    { id: 402, name: 'Manchurian Dry', description: 'Veggie dumplings in a concentrated soya-garlic glaze.', price: 280, category: 'Chinese', imageUrl: 'https://images.unsplash.com/photo-1623961980041-b82582c9c81b?auto=format&fit=crop&q=80&w=400' },

    // SHAHI VEGETABLE
    { id: 501, name: 'Shahi Paneer', description: 'Rich and creamy royal dish with paneer in tomato-butter gravy.', price: 260, category: 'Shahi Vegetable', imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400' },
    { id: 502, name: 'Malai Kofta', description: 'Soft paneer dumplings in a sweet and spicy creamy gravy.', price: 270, category: 'Shahi Vegetable', imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5c?auto=format&fit=crop&q=80&w=400' },
    { id: 503, name: 'Kaju Curry', description: 'Whole roasted cashews cooked in a rich, spicy masala.', price: 350, category: 'Shahi Vegetable', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=400' },

    // VEG MAIN COURSE
    { id: 601, name: 'Paneer Lababdar', description: 'Paneer in a luscious tomato and cashew nut gravy.', price: 280, category: 'Veg Main Course', imageUrl: 'https://images.unsplash.com/photo-1601050633647-8f8f203d078a?auto=format&fit=crop&q=80&w=400' },
    { id: 602, name: 'Kadhai Paneer', description: 'Paneer cooked with bell peppers and freshly ground spices.', price: 300, category: 'Veg Main Course', imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400' },
    { id: 603, name: 'Paneer Butter Masala', description: 'Iconic creamy paneer dish with a hint of sweetness.', price: 320, category: 'Veg Main Course', imageUrl: 'https://images.unsplash.com/photo-1601050633647-8f8f203d078a?auto=format&fit=crop&q=80&w=400' },
    { id: 604, name: 'Kargil Special (3 variety)', description: 'Our chef special platter featuring three unique flavors.', price: 750, category: 'Veg Main Course', imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400' },
    { id: 605, name: 'Veg Kolhapuri', description: 'Spicy vegetable medley from the heart of Maharashtra.', price: 240, category: 'Veg Main Course', imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5c?auto=format&fit=crop&q=80&w=400' },

    // DAL & RICE
    { id: 701, name: 'Dal Tadka', description: 'Yellow lentils tempered with garlic, cumin, and red chilies.', price: 200, category: 'Dal & Rice', imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400' },
    { id: 702, name: 'Zeera Rice', description: 'Aromatic basmati rice tempered with cumin seeds.', price: 180, category: 'Dal & Rice', imageUrl: 'https://images.unsplash.com/photo-1512058560366-cd2427ff56f3?auto=format&fit=crop&q=80&w=400' },
    { id: 703, name: 'Paneer Pulao', description: 'Basmati rice cooked with paneer chunks and mild spices.', price: 260, category: 'Dal & Rice', imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=400' },

    // INDIAN BREAD
    { id: 801, name: 'Tandoori Roti Butter', description: 'Whole wheat flatbread baked in tandoor with butter.', price: 25, category: 'Indian Bread', imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=400' },
    { id: 802, name: 'Butter Naan', description: 'Soft leavened refined flour bread with butter.', price: 80, category: 'Indian Bread', imageUrl: 'https://images.unsplash.com/photo-1601050633647-8f8f203d078a?auto=format&fit=crop&q=80&w=400' },
    { id: 803, name: 'Garlic Naan', description: 'Fluffy naan infused with crushed garlic and herbs.', price: 100, category: 'Indian Bread', imageUrl: 'https://images.unsplash.com/photo-1601050633647-8f8f203d078a?auto=format&fit=crop&q=80&w=400' },

    // SALAD & RAITA
    { id: 901, name: 'Mix Veg Raita', description: 'Cooling yogurt dip with mixed vegetables.', price: 160, category: 'Salad & Raita', imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c39bb9ed97c?auto=format&fit=crop&q=80&w=400' },
    { id: 902, name: 'Cucumber Salad', description: 'Fresh cucumber slices with a hint of lemon and salt.', price: 60, category: 'Salad & Raita', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400' },
];
