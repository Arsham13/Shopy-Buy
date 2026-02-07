import React, { useContext, useId, useRef, useState } from "react";
import styled from "./productDetails.module.css";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
    HiOutlineCheckCircle,
    HiOutlineSquares2X2,
    HiOutlineTruck,
    HiShieldCheck,
} from "react-icons/hi2";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCounter from "../productCounter/ProductCounter";
import Prices from "../prices/Prices";

function ProductDetails({ product, loading, error }) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);

    const [scale, setScale] = useState(1);
    const [pos, setPos] = useState({ x: 50, y: 50 });

    const SENSITIVITY = 1.9;

    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return;
        const container = e.currentTarget;

        const rect = container.getBoundingClientRect();

        let x =
            ((e.clientX - rect.left) / rect.width - 0.5) * 100 * SENSITIVITY +
            50;

        let y =
            ((e.clientY - rect.top) / rect.height - 0.5) * 100 * SENSITIVITY +
            50;

        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));

        container.querySelector("img").style.transformOrigin = `${x}% ${y}%`;
        container.querySelector("img").style.transform = `scale(1.4)`;
    };

    const reset = (e) => {
        const container = e.currentTarget;
        // container.querySelector("img").style.transformOrigin = `${x}% ${y}%`;
        container.querySelector("img").style.transform = `scale(1)`;
    };

    const handleTouchMove = (e) => {
        if (e.touches.length === 1) {
            const rect = containerRef.current.getBoundingClientRect();
            const touch = e.touches[0];

            const x = ((touch.clientX - rect.left) / rect.width) * 100;
            const y = ((touch.clientY - rect.top) / rect.height) * 100;

            setPos({ x, y });
        }

        if (e.touches.length === 2) {
            const d = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );

            imgRef.current._lastDist ||= d;
            setScale(Math.min(3, Math.max(1, d / imgRef.current._lastDist)));
        }
    };
    const imageId = useId();
    const product_status = product.stock !== 0;
    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className={styled.product_container}>
            {/* <h2>{product.stock}</h2> */}
            {/* <h2>{product.category}</h2> */}
            {/* <h2>{product.rating}</h2> */}
            {/* <h2>{product.price}</h2> */}
            {/* <h2>{product.takhfifprice}</h2> */}
            {/* <h2>{product.saleCount}</h2> */}
            <div className={styled.product_details}>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    className={styled.images_swiper}
                >
                    {product.images.map((image, index) => (
                        <SwiperSlide
                            key={index}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={reset}
                            style={{ overflow: "hidden" }}
                        >
                            <img
                                src={image}
                                draggable={false}
                                width={200}
                                style={{
                                    objectFit: "cover",
                                    transition: "transform 0.2s ease-out",
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className={styled.details}>
                    <h2 className={styled.product_title}>{product.name}</h2>
                    <div className={styled.product_features}>
                        {/* <h4>ویژگی های محصول</h4> */}
                        {(product.stock && product.stock <= 5 && (
                            <h5 className={styled.product_stock}>
                                تنها{" "}
                                {parseInt(product.stock).toLocaleString(
                                    "fa",
                                    product.stock
                                )}{" "}
                                عدد در انبار باقی مانده
                            </h5>
                        )) ||
                            (product.stock === 0 && "")}
                        <div className={styled.features_info}>
                            <h4 className={styled.feature}>
                                <HiOutlineCheckCircle size={25} />
                                <div>
                                    وضعیت :{" "}
                                    <span
                                        className={`${styled.product_status} ${
                                            !product_status
                                                ? styled.red_status
                                                : styled.green_status
                                        }`}
                                    >
                                        {!product_status ? "ناموجود" : "موجود"}
                                    </span>
                                </div>
                            </h4>
                            <h4 className={styled.feature}>
                                <HiOutlineSquares2X2 size={25} />
                                <div>
                                    دسته بندی :{" "}
                                    <span>
                                        <Link
                                            to={`/products?category=${product.category}`}
                                        >
                                            {product.category}
                                        </Link>
                                    </span>
                                </div>
                            </h4>
                            <h4 className={styled.feature}>
                                <HiOutlineTruck size={25} />
                                <div>
                                    تعداد فروش :{" "}
                                    <span>
                                        {parseInt(
                                            product.saleCount
                                        ).toLocaleString(
                                            "fa",
                                            product.saleCount
                                        )}
                                    </span>
                                </div>
                            </h4>
                        </div>
                    </div>
                    <div className={styled.product_features}>
                        <h4 className={styled.feature}>
                            <h3>توضیحات محصول : </h3>
                            <div>
                                <p>
                                    <span>{product.description}</span>
                                </p>
                            </div>
                        </h4>
                    </div>

                    <h6
                        className={`row gap_5 f_size_12 ${styled.garanty_text}`}
                        style={{ color: "var(--primary-lighter-text-color)" }}
                    >
                        <HiShieldCheck size={17} />
                        گارانتی اصالت و سلامت فیزیکی کالا
                    </h6>
                </div>
            </div>
            <div className={styled.product_counter}>
                <div className={styled.prices}>
                    <Prices
                        newprice={product.takhfifprice}
                        preprice={product.price}
                        stock={product.stock}
                        big={true}
                    />
                </div>
                <div className={styled.counter_btns}>
                    <ProductCounter product={product} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
