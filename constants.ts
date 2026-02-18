
import type { Dish } from './types';

export const MENU_ITEMS: Dish[] = [
    // ON THE RUN
    { id: 101, name: 'French Fries', price: 180, category: 'On The Run', imageUrl: 'https://ik.imagekit.io/j1fgksdwx/french%20fries.webp?updatedAt=1758211132814' },
    { id: 102, name: 'Cheesy Loaded Fries', price: 350, category: 'On The Run', imageUrl: 'https://ik.imagekit.io/j1fgksdwx/Louisiana%20Voodoo%20Fries%20(Wingstop%20Copycat).jpg?updatedAt=1771257633313' },
    { id: 107, name: 'Perry Perry French Fries', price: 260, category: 'On The Run', imageUrl: 'https://ik.imagekit.io/j1fgksdwx/Peri%20Peri%20Fries__.jpg?updatedAt=1771257841371' },
    { id: 103, name: 'Garlic French Fries', price: 190, category: 'On The Run', imageUrl: 'https://ik.imagekit.io/j1fgksdwx/Peri%20Peri%20Fries__.jpg?updatedAt=1771257841371' },
    { id: 104, name: 'Honey Chilli Potato', price: 180, category: 'On The Run', imageUrl: 'https://ik.imagekit.io/j1fgksdwx/honey%20chilli%20potato.webp?updatedAt=1758211139092' },
    { id: 108, name: 'Baby Corn Chilli', price: 350, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400' },
    { id: 109, name: 'Crispy Baby Corn Chilli', price: 360, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400' },
    { id: 110, name: 'Baby Corn Salt Pepper', price: 350, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5c?auto=format&fit=crop&q=80&w=400' },
    { id: 105, name: 'Crispy Corn', price: 350, category: 'On The Run', imageUrl: 'https://ik.imagekit.io/j1fgksdwx/CRISPY%20CORN.webp?updatedAt=1758292974618' },
    { id: 111, name: 'Malai Chap (6pcs)', price: 280, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1601050633647-8f8f203d078a?auto=format&fit=crop&q=80&w=400' },
    { id: 112, name: 'Paneer Pakoda (10pcs)', price: 180, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1601050633647-8f8f203d078a?auto=format&fit=crop&q=80&w=400' },
    { id: 113, name: 'Crispy Chap (6pcs)', price: 180, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1567184109411-47a7a39485ed?auto=format&fit=crop&q=80&w=400' },
    { id: 114, name: 'Soya Chap', price: 380, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1567184109411-47a7a39485ed?auto=format&fit=crop&q=80&w=400' },
    { id: 115, name: 'Soya Malai Chap', price: 450, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1567184109411-47a7a39485ed?auto=format&fit=crop&q=80&w=400' },
    { id: 116, name: 'Veg Pakoda (8pcs)', price: 100, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=400' },
    { id: 106, name: 'Cheese Balls (8pcs)', price: 490, category: 'On The Run', imageUrl: 'https://ik.imagekit.io/j1fgksdwx/Reisb%C3%A4llchen%20aus%20dem%20Airfryer%20_%20knuspriger%20Snack%20zur%20Resteverwertung.jpg' },
    { id: 117, name: 'French Paneer', price: 180, category: 'On The Run', imageUrl: 'https://images.unsplash.com/photo-1567184109411-47a7a39485ed?auto=format&fit=crop&q=80&w=400' },
    
    // CHAAT HOUSE
    { id: 201, name: 'Paneer Chaat', price: 120, category: 'Chaat House', imageUrl: 'https://ik.imagekit.io/j1fgksdwx/paneer%20chat.webp' },
    { id: 202, name: 'Veg Aloo Tikki (2pcs)', price: 80, category: 'Chaat House', imageUrl: 'https://images.unsplash.com/photo-1589670307596-a1767553e1d4?auto=format&fit=crop&q=80&w=400' },
    { id: 203, name: 'Masala Papd', price: 60, category: 'Chaat House', imageUrl: 'https://images.unsplash.com/photo-1626132644529-56e94e93fc9a?auto=format&fit=crop&q=80&w=400' },

    // TANDOORI STARTERS
    { id: 301, name: 'Paneer Tikka (6pcs)', price: 280, category: 'Tandoori Starters', imageUrl: 'https://images.unsplash.com/photo-1567184109411-47a7a39485ed?auto=format&fit=crop&q=80&w=400' },
    { id: 302, name: 'Dahi Kebab', price: 400, category: 'Tandoori Starters', imageUrl: 'https://images.unsplash.com/photo-1626508064441-799d057008ee?auto=format&fit=crop&q=80&w=400' },
    { id: 303, name: 'Mushroom Chilly', price: 350, category: 'Tandoori Starters', imageUrl: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=80&w=400' },

    // CHINESE
    { id: 401, name: 'Paneer 65 (8pcs)', price: 350, category: 'Chinese', imageUrl: 'https://images.unsplash.com/photo-1626132644529-56e94e93fc9a?auto=format&fit=crop&q=80&w=400' },
    { id: 402, name: 'Manchurian Dry', price: 280, category: 'Chinese', imageUrl: 'https://images.unsplash.com/photo-1623961980041-b82582c9c81b?auto=format&fit=crop&q=80&w=400' },

    // SHAHI VEGETABLE
    { id: 501, name: 'Shahi Paneer', price: 260, category: 'Shahi Vegetable', imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400' },
    { id: 502, name: 'Malai Kofta', price: 270, category: 'Shahi Vegetable', imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5c?auto=format&fit=crop&q=80&w=400' },
    { id: 503, name: 'Kaju Curry', price: 350, category: 'Shahi Vegetable', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=400' },

    // VEG MAIN COURSE
    { id: 601, name: 'Paneer Lababdar', price: 280, category: 'Veg Main Course', imageUrl: 'https://images.unsplash.com/photo-1601050633647-8f8f203d078a?auto=format&fit=crop&q=80&w=400' },
    { id: 602, name: 'Kadhai Paneer', price: 300, category: 'Veg Main Course', imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400' },
    { id: 603, name: 'Paneer Butter Masala', price: 320, category: 'Veg Main Course', imageUrl: 'https://images.unsplash.com/photo-1601050633647-8f8f203d078a?auto=format&fit=crop&q=80&w=400' },
    { id: 604, name: 'Kargil Special (3 variety)', price: 750, category: 'Veg Main Course', imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400' },
    { id: 605, name: 'Veg Kolhapuri', price: 240, category: 'Veg Main Course', imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5c?auto=format&fit=crop&q=80&w=400' },

    // DAL & RICE
    { id: 701, name: 'Dal Tadka', price: 200, category: 'Dal & Rice', imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400' },
    { id: 702, name: 'Zeera Rice', price: 180, category: 'Dal & Rice', imageUrl: 'https://images.unsplash.com/photo-1512058560366-cd2427ff56f3?auto=format&fit=crop&q=80&w=400' },
    { id: 703, name: 'Paneer Pulao', price: 260, category: 'Dal & Rice', imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=400' },

    // INDIAN BREAD
    { id: 801, name: 'Tandoori Roti Butter', price: 25, category: 'Indian Bread', imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=400' },
    { id: 802, name: 'Butter Naan', price: 80, category: 'Indian Bread', imageUrl: 'https://images.unsplash.com/photo-1601050633647-8f8f203d078a?auto=format&fit=crop&q=80&w=400' },
    { id: 803, name: 'Garlic Naan', price: 100, category: 'Indian Bread', imageUrl: 'https://images.unsplash.com/photo-1601050633647-8f8f203d078a?auto=format&fit=crop&q=80&w=400' },

    // SALAD & RAITA
    { id: 901, name: 'Mix Veg Raita', price: 160, category: 'Salad & Raita', imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c39bb9ed97c?auto=format&fit=crop&q=80&w=400' },
    { id: 902, name: 'Cucumber Salad', price: 60, category: 'Salad & Raita', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400' },
];
