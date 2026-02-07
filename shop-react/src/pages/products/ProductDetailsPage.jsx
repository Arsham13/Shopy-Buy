import React, { useContext } from "react";
import ProductDetails from "../../components/productDetails/ProductDetails";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import PrePageNav from "../../components/prePageNav/PrePageNav";

function ProductDetailsPage({ isWide }) {
    window.scroll(0, 0);
    const { productId } = useParams();
    const { products, loading, error } = useContext(ProductsContext);

    const product = products.find((p) => p.id == productId);

    return (
        <>
            {isWide ? (
                <Navbar isWide={isWide} />
            ) : (
                <PrePageNav title={product?.name || ""} />
            )}
            <main>
                {loading ? (
                    <p>در حال بارگذاری محصول...</p>
                ) : error ? (
                    <p>خطا در دریافت محصول: {error}</p>
                ) : product ? (
                    <>
                        <Breadcrumb product={product} />
                        <ProductDetails
                            product={product}
                            loading={loading}
                            error={error}
                        />
                    </>
                ) : (
                    <p>محصول موردنظر پیدا نشد.</p>
                )}
            </main>
            <Footer />
        </>
    );
}

export default ProductDetailsPage;
