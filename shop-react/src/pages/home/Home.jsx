import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ImageSwiper from "../../components/imageSwiper/ImageSwiper";
import ProductSwiper from "../../components/productSwiper/ProductSwiper";
import InfiniteScroller from "../../components/infiniteScroller/InfiniteScroller";
import MostSale from "../../components/mostSale/MostSale";
import ProductsCategory from "../../components/productsCategory/ProductsCategory";
import LoopNavar from "../../components/loopNavar/LoopNavar";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { useEffect } from "react";

function Home() {
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
        <>
            <Navbar isWide={isWide} />
            <main>
                {/* <TypeWriter text={text} speed={3} /> */}
                <ImageSwiper />
                <LoopNavar />
                <ProductSwiper />
                <InfiniteScroller />
                <MostSale />
                {isWide && <ProductsCategory />}
            </main>
            <Footer />
        </>
    );
}

export default Home;
