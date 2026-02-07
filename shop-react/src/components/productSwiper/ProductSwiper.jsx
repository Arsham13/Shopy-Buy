import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "./productSwiper.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ShegeftProduct from "../shegeftProduct/ShegeftProduct";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

function ProductSwiper() {
    const { products, loading, error } = useContext(ProductsContext);

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>{error}</p>;

    console.log(products);

    return (
        <>

        <Swiper
            slidesPerView={1}
            spaceBetween={7}
            breakpoints={{
                0: { slidesPerView: 1.4 },
                500: { slidesPerView: 1.8 },
                550: { slidesPerView: 2.2 },
                650: { slidesPerView: 2.7 },
                800: { slidesPerView: 3.2 },
                850: { slidesPerView: 3.8 },
                1100: { slidesPerView: 4.5 },
                1500: { slidesPerView: 5.5 },
            }}
        >

            <SwiperSlide>
                <div className="column shegeft">
                    <p className="shegeftP">پیشنهاد</p>
                    <p className="shegeftP">شـگفت</p>
                    <p className="shegeftP">انـگـیـز</p>
                    <img src="/assets/images/Amazing.svg" alt="" />
                    <Link to={"/products"}>
                        مشاهده همه{" "}
                        <i className="arrow">
                            <HiMiniChevronLeft size={23} />
                        </i>
                    </Link>
                </div>
            </SwiperSlide>

            {products
                .filter((product) => {
                    if (product.takhfifprice === 0) return false;

                    return (
                        Math.round(
                            ((product.price - product.takhfifprice) /
                                product.price) *
                                100
                        ) >= 20
                    );
                })
                .map((product) => (
                    <SwiperSlide key={product.id}>
                        <ShegeftProduct
                            id={product.id}
                            title={product.name}
                            image={product.images[0]}
                            newprice={product.takhfifprice}
                            preprice={product.price}
                            stock={product.stock}
                        />
                    </SwiperSlide>
                ))}
        </Swiper>
        </>
    );
}

export default ProductSwiper;
