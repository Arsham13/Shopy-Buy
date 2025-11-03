import React, { useEffect, useState } from "react";
import styled from "./navbar.module.css";
import RightNavbar from "./rightNavbar/RightNavbar";
import BottomNavbar from "./bottomNavbar/BottomNavbar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";
import NavLinks from "../navLinks/NavLinks";
import { useRef } from "react";

function Navbar(params) {
    const shopCartRef = useRef(null);
    const searchInputRef = useRef(null);
    const modalSearchRef = useRef(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [isInputWide, setIsWide] = useState(window.innerWidth < 521);

    useEffect(() => {
        const handleResize = () => {
            setIsWide(window.innerWidth < 521);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSearch = () => {
        if (searchInputRef.current.value.trim() === "") return;
        // کپی از searchParams فعلی
        const url = new URLSearchParams(searchParams);
        // سرچ جدید رو ست کن
        url.set("search", searchInputRef.current.value.trim());
        console.log(url.toString());

        // ناوبری با query جدید
        navigate(`/products?${url.toString()}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    if (!params.isWide) {
        shopCartRef.current?.classList.remove(styled.show_shopCart);
    }

    const handleShowModalSearch = () => {
        modalSearchRef.current?.classList.add(styled.show_modal);
    };
    const closeModalSearch = () => {
        modalSearchRef.current?.classList.remove(styled.show_modal);
    };

    if (
        isInputWide &&
        modalSearchRef?.current?.classList?.contains(styled.show_modal)
    ) {
        modalSearchRef?.current.classList?.remove(styled.show_modal);
    }

    return (
        <>
            {isInputWide && (
                <div className={styled.modal} ref={modalSearchRef}>
                    <i>
                        <HiXMark
                            onClick={closeModalSearch}
                            className={styled.close_mark}
                            color="#fff"
                            size={40}
                        />
                    </i>
                    <div className={styled.modal_search}>
                        <input
                            ref={searchInputRef}
                            placeholder="جستجو در محصولات"
                            type="text"
                            name="search"
                            onKeyDown={handleKeyDown}
                            id="search"
                        />
                        <HiOutlineMagnifyingGlass
                            color="var(--primary-color)"
                            size={21}
                            className={styled.search_btn}
                            onClick={handleSearch}
                        />
                    </div>
                </div>
            )}
            <div className={styled.nav}>
                <div className={styled.nav2}>
                    <div className={styled.navbar}>
                        <div className={styled.row}>
                            <img
                                id="logo"
                                src="/assets/images/logo.png"
                                alt="Logo"
                                width="200px"
                            />
                            <div
                                className={`${styled.search_input} ${styled.row}`}
                            >
                                {!isInputWide && (
                                    <input
                                        ref={searchInputRef}
                                        placeholder="جستجو در محصولات"
                                        type="text"
                                        name="search"
                                        onKeyDown={handleKeyDown}
                                        id="search"
                                    />
                                )}
                                <HiOutlineMagnifyingGlass
                                    color="var(--primary-color)"
                                    size={21}
                                    className={styled.search_btn}
                                    onClick={
                                        isInputWide
                                            ? handleShowModalSearch
                                            : handleSearch
                                    }
                                />
                            </div>
                        </div>
                        {params.isWide && (
                            <NavLinks shopCartRef={shopCartRef} />
                        )}
                    </div>

                    {params.isWide && <RightNavbar />}
                </div>
            </div>
            {!params.isWide && <BottomNavbar />}
        </>
    );
}

export default Navbar;
