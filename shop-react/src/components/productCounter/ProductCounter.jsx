import React, { useContext, useEffect, useState } from "react";
import styled from "./productCounter.module.css";
import {
    HiMiniTrash,
    HiOutlineMinusSmall,
    HiOutlinePlusSmall,
    HiOutlineShoppingCart,
    HiTrash,
} from "react-icons/hi2";
import { CartContext } from "../../context/CartContext";

function ProductCounter({ product }) {
    const { state, dispatch } = useContext(CartContext);

    const cartItem = state.items.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    const quantity_fa = parseInt(quantity).toLocaleString("fa", quantity);
    const [isStockQuantity, setIsStockQuantity] = useState(false);

    const increaseQuantityCartHandler = () => {
        dispatch({
            type: "INCREASE",
            payload: product,
        });
    };
    const decreaseQuantityCartHandler = () => {
        dispatch({
            type: "DECREASE",
            payload: product,
        });
    };

    console.log(product.stock, quantity);

    useEffect(() => {
        quantity === product.stock
            ? setIsStockQuantity(true)
            : setIsStockQuantity(false);
    }, [quantity]);

    return (
        <>
            {quantity !== 0 ? (
                <div className={styled.counter_wrapper}>
                    <button
                        className={`${styled.plus_counter} ${
                            isStockQuantity ? `btn_disabled` : ""
                        }`}
                        onClick={increaseQuantityCartHandler}
                        disabled={isStockQuantity}
                    >
                        <HiOutlinePlusSmall className={styled.icon} size={30} />
                    </button>
                    <h5 className={styled.counter_number}>{quantity_fa}</h5>
                    <button
                        className={styled.minus_counter}
                        onClick={decreaseQuantityCartHandler}
                    >
                        {quantity === 1 ? (
                            <HiMiniTrash className={styled.icon} size={24} />
                        ) : (
                            <HiOutlineMinusSmall
                                className={styled.icon}
                                size={30}
                            />
                        )}
                    </button>
                </div>
            ) : (
                <button
                    className={`${styled.add_to_cart} ${
                        product.stock === 0
                            ? `btn_disabled ${styled.btn_disabled}`
                            : ""
                    }`}
                    onClick={
                        product.stock !== 0 && quantity === 0
                            ? increaseQuantityCartHandler
                            : () => {}
                    }
                >
                    <p className="row gap_5">
                        <HiOutlineShoppingCart size={23} /> افزودن به سبد خرید
                    </p>
                </button>
            )}
        </>
    );
}

export default ProductCounter;
