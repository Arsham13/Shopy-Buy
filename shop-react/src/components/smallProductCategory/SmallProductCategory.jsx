import React, { useContext, useEffect, useRef } from "react";
import styled from "./smallProductCategory.module.css";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";

function SmallProductCategory({ isOpen, onClose, bottom }) {
    const { products } = useContext(ProductsContext);

    const wrapperRef = useRef(null);

    const categories = [];

    for (let i = 0; i < products.length; i++) {
        const category = products[i].category;
        // اگر دسته قبلا اضافه نشده، به آرایه اضافه کن
        if (!categories.includes(category)) {
            categories.push(category);
        }
    }

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e) => {
            // if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            onClose();
            // }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div
            onMouseDown={(e) => e.stopPropagation()}
            className={`${styled.product_cat} ${
                isOpen ? styled.show_product_cat : ""
            } ${bottom ? styled.bottom_style : ""}`}
            ref={wrapperRef}
        >
            {categories.map((cat) => (
                <Link
                    key={cat}
                    to={`/products?category=${cat}`}
                    onClick={() => {
                        document.body.style.overflow = "auto";
                        onClose();
                    }}
                >
                    {cat}
                </Link>
            ))}
        </div>
    );
}

export default SmallProductCategory;
