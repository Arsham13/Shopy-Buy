import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";

function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:categoryName" element={<Products />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:productId" element={<Home />} />
            </Routes>
    );
}

export default App;
