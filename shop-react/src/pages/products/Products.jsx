import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import Footer from "../../components/footer/Footer";
import ProductsPage from "../../components/productsPage/ProductsPage";

function Products() {
    const [isWide, setIsWide] = useState(window.innerWidth > 710);
    const [isProductRow, setIsProductRow] = useState(window.innerWidth < 630);
    const [isShowFilters, setIsShowFilters] = useState(window.innerWidth < 956);

    useEffect(() => {
        const handleResize = () => {
            setIsWide(window.innerWidth > 710);
            setIsProductRow(window.innerWidth < 630);
            setIsShowFilters(window.innerWidth < 956);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <>
            <Navbar isWide={isWide} />
            <main>
                <ProductsPage
                    isRow={isProductRow}
                    isShowFilters={isShowFilters}
                />
            </main>
            <Footer />
        </>
    );
}

export default Products;
