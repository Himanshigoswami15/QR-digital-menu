
export interface Dish {
    id: number;
    name: string;
    price: number;
    category: 'On The Run' | 'Chaat House' | 'Tandoori Starters' | 'Chinese' | 'Shahi Sweet Vegetable' | 'Paneer Main Course' | 'Veg Main Course' | 'Dal' | 'Basmati Rice' | 'Indian Bread' | 'Salad & Raita';
    imageUrl: string;
}

export interface CartItem {
    dish: Dish;
    quantity: number;
    instructions: string;
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
