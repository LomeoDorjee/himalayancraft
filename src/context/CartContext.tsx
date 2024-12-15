"use client";

import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import {
    createContext,
    useReducer,
    useContext,
    useEffect,
    ReactNode,
    useMemo,
    useRef
} from 'react';

interface CartState {
    items: TY_CartItem[];
    isLoading: boolean;
}

interface CartAction {
    type: 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'MODIFY_CART_ITEM' | 'LOAD_CART' | 'SET_LOADING';
    payload: TY_CartItem[] | TY_CartItem | boolean;
}

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, items: [...state.items, { ...action.payload as TY_CartItem, quantity: (action.payload as TY_CartItem).quantity }] };
        case 'REMOVE_FROM_CART':
            return { ...state, items: state.items.filter(item => item.productid !== (action.payload as TY_CartItem).productid) };
        case 'MODIFY_CART_ITEM':
            return {
                ...state,
                items: state.items.map(item =>
                    item.productid === (action.payload as TY_CartItem).productid ? { ...item, ...(action.payload as TY_CartItem) } : item
                ),
            };
        case 'LOAD_CART':
            return { ...state, items: action.payload as TY_CartItem[], isLoading: false };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload as boolean };
        default:
            return state;
    }
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {

    const [state, dispatch] = useReducer(cartReducer, { items: [], isLoading: true });

    const lastActionType = useRef<string | null>(null);

    const { isLoaded, isSignedIn, user } = useUser();

    const loadCartFromDatabase = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await axios.get('/api/cart');
            dispatch({ type: 'LOAD_CART', payload: response.data.data });
        } catch (error) {
            console.error('Failed to load cart from database', error);
        }
        dispatch({ type: 'SET_LOADING', payload: false });
    };

    // // Load cart state from local storage
    const loadCartFromLocalStorage = () => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            dispatch({ type: 'LOAD_CART', payload: parsedCart });
        }
    };

    // // Save cart state to local storage
    const saveCartToLocalStorage = () => {
        const stringifiedCart = JSON.stringify(state.items, (key, value) =>
            typeof value === 'bigint' ? `${value}n` : value
        );
        localStorage.setItem('cart', stringifiedCart);
    };

    useEffect(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
        loadCartFromLocalStorage();
        if (isLoaded && isSignedIn) {
            loadCartFromDatabase();
        }
    }, [isLoaded, isSignedIn]);

    useEffect(() => {
        if (!state.isLoading) {
            saveCartToLocalStorage();
        }
    }, [state.items, saveCartToLocalStorage]);

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        state,
        dispatch
    }), [state, dispatch]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartActions = () => {

    const { dispatch } = useCart();

    const addItemToCart = async (item: TY_CartItem) => {

        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await axios.post('/api/cart', { item });
            dispatch({ type: 'ADD_TO_CART', payload: item });
        } catch (error) {
            console.error('Failed to add item to database', error);
        }
        dispatch({ type: 'SET_LOADING', payload: false });
    };

    const removeItemFromCart = async (item: TY_CartItem) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await axios.delete('/api/cart', { data: { productid: item.productid } });
            dispatch({ type: 'REMOVE_FROM_CART', payload: item });
        } catch (error) {
            console.error('Failed to delete item from database', error);
        }
        dispatch({ type: 'SET_LOADING', payload: false });
    };

    const updateItemInCart = async (item: TY_CartItem) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await axios.put('/api/cart', { item });
            dispatch({ type: 'MODIFY_CART_ITEM', payload: item });
        } catch (error) {
            console.error('Failed to update item in database', error);
        }
        dispatch({ type: 'SET_LOADING', payload: false });
    };

    return { addItemToCart, removeItemFromCart, updateItemInCart };
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
