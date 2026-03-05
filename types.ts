export interface Portion {
    name: 'Quarter' | 'Half' | 'Full';
    price: number;
    description?: string;
}

export interface Dish {
    id: number;
    name: string;
    price: number;
    category: 'On The Run' | 'Chaat House' | 'Soups' | 'Tandoori Starters' | 'Chinese' | 'Shahi Sweet Vegetable' | 'Paneer Main Course' | 'Veg Main Course' | 'Dal' | 'Basmati Rice' | 'Indian Bread' | 'Salad' | 'Raita' | 'Roasted' | 'Beverages' | 'Egg Dishes' | 'Non-Veg Starters' | 'Non-Veg Tandoor' | 'Non-Veg Main Course Curry' | 'Fish' | 'Rice & Biryani' | 'Roll';
    imageUrl: string;
    portions?: Portion[];
}

export interface CartItem {
    dish: Dish;
    quantity: number;
    instructions: string;
    selectedPortion?: Portion;
}

export enum OrderStatus {
    Pending = 'Pending',
    Preparing = 'Preparing',
    Ready = 'Ready',
    Served = 'Served',
}

export interface Order {
    id: string;
    tableNumber: number;
    items: CartItem[];
    total: number;
    status: OrderStatus;
    timestamp: Date;
}
