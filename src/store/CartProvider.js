import {useReducer} from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};
const cartReducer = (state, action) => {
        if (action.type === 'ADD') {
            console.log(action.item.unidad)
            let updatedTotalAmount;
            if(action.item.unidad === 'xunidad'){
                updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount) ;
            }else{
                updatedTotalAmount = state.totalAmount + (action.item.price / 1000) * action.item.amount;
            }
            


            const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
            const existingCartItem = state.items[existingCartItemIndex]

            let updatedItems;

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;

            } else {
                updatedItems = state.items.concat(action.item);
            }
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }
    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        let updatedTotalAmount;
        if(existingItem.unidad === 'xunidad'){
            updatedTotalAmount = state.totalAmount - existingItem.price;
        }else{
            updatedTotalAmount = state.totalAmount - (existingItem.price / 1000) * 100;
        }
        let updatedItems;
        if(existingItem.unidad === 'xunidad'){
            if (existingItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.id);
            } else {
                const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }

        }else{
            if (existingItem.amount === 100) {
                updatedItems = state.items.filter(item => item.id !== action.id);
            } else {
                const updatedItem = { ...existingItem, amount: existingItem.amount - 100 };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }
        }
       

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if(action.type === 'CLEAR'){
        return defaultCartState;
    }

    return defaultCartState;
};

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item})
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id})
    };

    const clearCardHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCardHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;