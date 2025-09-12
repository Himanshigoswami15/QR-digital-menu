
export interface Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    category: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';
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
