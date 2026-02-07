import React, { useEffect } from "react";
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
import SmallProductCategory from "../../smallProductCategory/SmallProductCategory";

function RightNavbar() {
    const [productCatActive, setProductCatActive] = useState(false);

    const categoryWrapperRef = useRef(null);

    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (
    //             productCatActive &&
    //             categoryWrapperRef.current &&
    //             !categoryWrapperRef.current.contains(e.target)
    //         ) {
    //             setProductCatActive(false);
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [productCatActive]);

    const handleProductCatShow = () => {
        if (!productCatActive) {
            setProductCatActive(true);
            // document.body.style.overflow = "hidden";
        } else {
            // setProductCatActive(false);
        }
    };



    return (
        <>
            <div className={styled.right_navbar}>
                <div className={styled.links}>
                    <span
                        ref={categoryWrapperRef}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={handleProductCatShow}
                        className={`${styled.links} ${
                            productCatActive ? styled.active : ""
                        }`}
                    >
                        <HiMiniListBullet className="icons" />

                        <h4 id="category_link">دسته بندی ها</h4>
                        <SmallProductCategory
                            isOpen={productCatActive}
                            onClose={() => setProductCatActive(false)}
                        />
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
            {productCatActive && <div className="modal"></div>}
        </>
    );
}

export default RightNavbar;
