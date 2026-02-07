import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "./swipers.css";
import styled from "./textTypeSwiperStyles.module.css";

import "swiper/css/effect-fade";
import TypeWriter from "../typeWriter/TypeWriter";

const TextTypeSwiper = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const describes = [
        {
            id: 1,
            title: "کیفیتی باور نکردنی",
            content:
                "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون رایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعهشلات پیو گیرد.",
            image: "/assets/images/undraw_invest_t695.svg",
        },
        {
            id: 2,
            title: "خریدی به صرفه و راحت",
            content:
                "لورم ایپسوم متن ساختگی با تولید  لوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنار گیرد.",
            image: "/assets/images/undraw_wallet_diag.svg",
        },
        {
            id: 3,
            title: "هر آنچه که میخواهید",
            content:
                "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت قرار گیرد.",
            image: "/assets/images/undraw_order-delivered_puaw.svg",
        },
    ];
    return (
        <>
            <img src="/assets/images/stars.svg" className="stars" />
            <img src="/assets/images/stars.svg" className="stars" />

            <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                slidesPerView={1}
                speed={1500}
                loop={true}
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 9000 }}
                allowTouchMove={false}
                grabCursor={false}
                navigation={false}
                className="imageSwiper"
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // 👈 گرفتن ایندکس اسلاید فعال
            >
                {describes.map((item, index) => (
                    <>
                        <SwiperSlide key={item.id} className={styled.swiper}>
                            <div className={styled.image_infos}>
                                <img
                                    src="/assets/images/stars.svg"
                                    className={`${styled.swiper_star} stars`}
                                />

                                <div>
                                    <h2>
                                        {activeIndex === index && ( // 👈 فقط اسلاید فعال
                                            <TypeWriter
                                                text={item.title}
                                                speed={50}
                                            />
                                        )}
                                    </h2>
                                    <p>
                                        {activeIndex === index && (
                                            <TypeWriter
                                                text={item.content}
                                                speed={2}
                                            />
                                        )}
                                    </p>
                                </div>
                                <img src={item.image} alt="slide" />
                            </div>
                            <div className={styled.counter}>
                                <div
                                    style={{
                                        width:
                                            activeIndex === index ? "100%" : "",
                                    }}
                                ></div>
                            </div>
                        </SwiperSlide>
                    </>
                ))}
            </Swiper>
        </>
    );
};

export default TextTypeSwiper;
