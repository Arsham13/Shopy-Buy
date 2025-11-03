import React from "react";
import styled from "./rightNavbar.module.css";
import {
    HiMiniListBullet,
    HiOutlineBuildingStorefront,
    HiOutlineChatBubbleLeftRight,
    HiOutlineFire,
    HiOutlinePercentBadge,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../../../context/ProductsContext";
import { useRef } from "react";
import { useState } from "react";

function RightNavbar() {
    const { products } = useContext(ProductsContext);

    const categories = [];

    for (let i = 0; i < products.length; i++) {
        const category = products[i].category;
        // اگر دسته قبلا اضافه نشده، به آرایه اضافه کن
        if (!categories.includes(category)) {
            categories.push(category);
        }
    }

    const product_cat = useRef(null);
    const [productCatActive, setProductCatActive] = useState(false);

    const handleProductCatEnter = () => {
        product_cat.current.classList.add(styled.show_product_cat);
        setProductCatActive(true);
        document.body.style.overflow = "hidden";
    };
    const handleProductCatLeave = () => {
        product_cat.current.classList.remove(styled.show_product_cat);
        setProductCatActive(false);
        document.body.style.overflow = "auto";
    };
    return (
        <>
            <div className={styled.right_navbar}>
                <div className={styled.links}>
                    <span
                        onMouseEnter={handleProductCatEnter}
                        onMouseLeave={handleProductCatLeave}
                        className={`${styled.links} ${
                            productCatActive ? styled.active : ""
                        }`}
                        to={"#"}
                    >
                        <HiMiniListBullet className="icons" />

                        <h4>دسته بندی ها</h4>
                        <div ref={product_cat} className={styled.product_cat}>
                            {categories.map((cat) => (
                                <Link key={cat} to={`/category/${cat}`}>
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    </span>
                </div>

                <span className={styled.space_line}></span>

                <div className={styled.links}>
                    <Link to={"#"} className={styled.links}>
                        <HiOutlinePercentBadge className="icons" />
                        <h4>پیشنهاد شگفت انگیز</h4>
                    </Link>
                </div>

                <div className={styled.links}>
                    <Link to={"#"} className={styled.links}>
                        <HiOutlineFire className="icons" />
                        <h4>پرفروش ترین ها</h4>
                    </Link>
                </div>

                <div className={styled.links}>
                    <Link to={"#"} className={styled.links}>
                        <HiOutlineChatBubbleLeftRight className="icons" />

                        <h4>سوالات متداول</h4>
                    </Link>
                </div>

                <div className={styled.links}>
                    <Link to={"#"} className={styled.links}>
                        <HiOutlineBuildingStorefront className="icons" />
                        <h4>درباره ما</h4>
                    </Link>
                </div>
            </div>
            {productCatActive && (
                <div className={styled.products_category}></div>
            )}
        </>
    );
}

export default RightNavbar;
