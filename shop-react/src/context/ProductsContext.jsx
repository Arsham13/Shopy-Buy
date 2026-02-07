import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get("http://localhost:5000/products");
            setProducts(res.data);
        } catch (err) {
            setError("خطا در دریافت محصولات");
        } finally {
            setLoading(false);
        }
    };
    console.log(products);
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider
            value={{ products, loading, error, refresh: fetchProducts }}
        >
            {children}
        </ProductsContext.Provider>
    );
}
