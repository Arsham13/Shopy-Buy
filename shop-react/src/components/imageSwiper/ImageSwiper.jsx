import React from "react";
import styled from "./imageSwiper.module.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function imageSwiper() {
    const baners = [
        "/assets/images/baner1.jpg",
        "/assets/images/baner2.jpg",
        "/assets/images/baner4.jpg",
    ];
    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={3}
                slidesPerView={1}
                navigation
                loop
                autoplay
                pagination={{ clickable: true }}
                className={styled.images_swiper}
            >
                {baners.map((image, index) => (
                    <SwiperSlide key={index}>
                            <img src={image} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default imageSwiper;
