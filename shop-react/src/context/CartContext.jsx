import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

function cartReducer(state, action) {
    switch (action.type) {
        case "INCREASE":
            console.log(state.items);
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) => {
                        return item.id === action.payload.id
                            ? {
                                  ...item,
                                  quantity: item.quantity + 1,
                                  //   stock: item.stock - 1,
                              }
                            : item;
                    }),
                };
            }

            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        ...action.payload,
                        quantity: 1,
                        // stock: action.payload.stock - 1,
                    },
                ],
            };

        case "REMOVE_FROM_CART":
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };

        case "DECREASE":
            return {
                ...state,
                items: state.items
                    .map((item) => {
                        console.log(item.stock);

                        return item.id === action.payload.id
                            ? {
                                  ...item,
                                  quantity: item.quantity - 1,
                                  //   stock: item.stock + 1,
                              }
                            : item;
                    })
                    .filter((item) => item.quantity > 0),
            };

        case "CLEAR_CART":
            return {
                ...state,
                items: [],
            };

        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
    }, [state.items]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}
