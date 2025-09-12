
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import type { CartItem, Order } from '../types';
import { OrderStatus } from '../types';

interface AppState {
    tableNumber: number | null;
    cart: CartItem[];
    order: Order | null;
    notification: string | null;
}

type Action =
    | { type: 'SET_TABLE'; payload: number }
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'UPDATE_CART_ITEM'; payload: { dishId: number; quantity: number; instructions: string } }
    | { type: 'REMOVE_FROM_CART'; payload: number }
    | { type: 'CLEAR_CART' }
    | { type: 'PLACE_ORDER'; payload: Omit<Order, 'id' | 'status' | 'timestamp'> }
    | { type: 'UPDATE_ORDER_STATUS'; payload: OrderStatus }
    | { type: 'SHOW_NOTIFICATION', payload: string }
    | { type: 'HIDE_NOTIFICATION' };

const initialState: AppState = {
    tableNumber: null,
    cart: [],
    order: null,
    notification: null,
};

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'SET_TABLE':
            return { ...state, tableNumber: action.payload };
        case 'ADD_TO_CART':
            const existingItemIndex = state.cart.findIndex(item => item.dish.id === action.payload.dish.id);
            if (existingItemIndex > -1) {
                const updatedCart = [...state.cart];
                updatedCart[existingItemIndex].quantity += action.payload.quantity;
                return { ...state, cart: updatedCart };
            }
            return { ...state, cart: [...state.cart, action.payload] };
        case 'UPDATE_CART_ITEM':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.dish.id === action.payload.dishId
                        ? { ...item, quantity: action.payload.quantity, instructions: action.payload.instructions }
                        : item
                ),
            };
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.dish.id !== action.payload) };
        case 'CLEAR_CART':
            return { ...state, cart: [] };
        case 'PLACE_ORDER':
            if (state.tableNumber === null) return state; // Should not happen
            return {
                ...state,
                cart: [],
                order: {
                    ...action.payload,
                    id: `ORD-${Date.now()}`,
                    status: OrderStatus.Pending,
                    timestamp: new Date(),
                    tableNumber: state.tableNumber,
                },
            };
        case 'UPDATE_ORDER_STATUS':
            if (!state.order) return state;
            return { ...state, order: { ...state.order, status: action.payload } };
        case 'SHOW_NOTIFICATION':
            return { ...state, notification: action.payload };
        case 'HIDE_NOTIFICATION':
            return { ...state, notification: null };
        default:
            return state;
    }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
