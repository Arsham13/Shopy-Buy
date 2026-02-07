import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import ProductDetails from "./components/productDetails/ProductDetails";
import { useEffect, useState } from "react";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";

function App() {
    const [isWide, setIsWide] = useState(window.innerWidth > 710);

    useEffect(() => {
        const handleResize = () => {
            setIsWide(window.innerWidth > 710);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route
                path="/products/:productId"
                element={<ProductDetailsPage isWide={isWide} />}
            />
        </Routes>
    );
}

export default App;
