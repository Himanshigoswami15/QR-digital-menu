export interface Portion {
    name: 'Quarter' | 'Half' | 'Full';
    price: number;
    description?: string;
}

export interface Dish {
    id: number;
    name: string;
    price: number;
    category: 'Veg Soups' | 'On The Run' | 'Chaat House' | 'Tandoori Starters' | 'Chinese' | 'Shahi Sweet Vegetable' | 'Paneer Main Course' | 'Veg Main Course' | 'Dal' | 'Basmati Rice' | 'Indian Bread' | 'Salad' | 'Raita' | 'Roasted' | 'Beverages' | 'Veg Roll' | 'Non-veg soups' | 'Egg Dishes' | 'Non-Veg Roll' | 'Non-Veg Starters' | 'Non-Veg Tandoor' | 'Non-Veg Main Course Curry' | 'Fish' | 'Rice & Biryani';
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
