import React, { useContext, useEffect, useState } from "react";
import styled from "./navbar.module.css";
import RightNavbar from "./rightNavbar/RightNavbar";
import BottomNavbar from "./bottomNavbar/BottomNavbar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
    HiArrowRight,
    HiOutlineMagnifyingGlass,
    HiXMark,
} from "react-icons/hi2";
import NavLinks from "../navLinks/NavLinks";
import { useRef } from "react";
import ToolTip from "../tooltip/ToolTip";
import { ProductsContext } from "../../context/ProductsContext";
import ShegeftProduct from "../shegeftProduct/ShegeftProduct";

function Navbar(props) {
    const { products, loading, error } = useContext(ProductsContext);
    const [searchedProducts, setSearchedProducts] = useState([]);

    const shopCartRef = useRef(null);
    const searchInputRef = useRef(null);
    const modalSearchRef = useRef(null);
    const [searchparams] = useSearchParams();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const navigate = useNavigate();

    const [isInputWide, setIsWide] = useState(
        window.innerWidth < 521 ||
            (711 < window.innerWidth && window.innerWidth < 875)
    );

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("search_history")) || [];
        setSearchHistory(stored);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            console.log(711 < window.innerWidth && window.innerWidth < 875);

            setIsWide(
                window.innerWidth < 521 ||
                    (711 < window.innerWidth && window.innerWidth < 875)
            );
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const saveSearchHistory = (value) => {
        if (!value) return;

        let history = JSON.parse(localStorage.getItem("search_history")) || [];

        history = history.filter((item) => item !== value);
        history.unshift(value);

        history = history.slice(0, 10);

        localStorage.setItem("search_history", JSON.stringify(history));
        setSearchHistory(history);
    };
    const handleSearch = () => {
        if (searchValue.trim() === "") return;

        saveSearchHistory(searchValue.trim());

        const url = new URLSearchParams(searchparams);
        url.set("search", searchValue.trim());
        navigate(`/products?${url.toString()}`);
    };
    const handleHistoryClick = (value) => {
        setSearchValue(value);
        saveSearchHistory(value);

        const url = new URLSearchParams(searchparams);
        url.set("search", value);
        navigate(`/products?${url.toString()}`);
    };

    const handleShowSearchResults = (e) => {
        if (!products) return;

        if (e.target.value === "") {
            setSearchedProducts([]);
            return;
        }
        // console.log(searchInputRef.current.value);
        setSearchedProducts(
            products
                .filter((product) => {
                    return (
                        product.name.includes(e.target.value.trim()) ||
                        product.description.includes(e.target.value.trim())
                    );
                })
                .slice(0, 4)
        );
    };

    const handleProductClickFromSearch = () => {
        if (searchValue.trim() === "") return;
        saveSearchHistory(searchValue.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        if (props.isWide) {
            shopCartRef.current?.classList.remove(styled.show_shopCart);
            modalSearchRef.current?.classList.remove(styled.show_modal);
            document.body.style.overflow = "true";
            searchInputRef.current.value = "";
            setSearchedProducts([]);
        }

        if (
            isInputWide &&
            modalSearchRef?.current?.classList?.contains(styled.show_modal)
        ) {
            modalSearchRef.current?.classList.remove(styled.show_modal);
        }
    }, [props.isWide, isInputWide]);

    const handleShowModalSearch = () => {
        modalSearchRef.current?.classList.add(styled.show_modal);
        document.body.style.overflow = "hidden";
    };
    const closeModalSearch = () => {
        modalSearchRef.current?.classList.remove(styled.show_modal);
        document.body.style.overflow = "auto";
        setSearchValue("");
        setSearchedProducts([]);
    };

    return (
        <>
            {isInputWide && (
                <div className={styled.modal} ref={modalSearchRef}>
                    <div className="column">
                        <i>
                            <HiArrowRight
                                onClick={closeModalSearch}
                                className={styled.close_mark}
                                color="var(--primary-text-color)"
                                size={40}
                            />
                        </i>
                    </div>
                    <div className={styled.modal_search}>
                        <input
                            ref={searchInputRef}
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                handleShowSearchResults(e);
                            }}
                            placeholder="جستجو در محصولات"
                            type="text"
                            onKeyDown={handleKeyDown}
                        />
                        <HiOutlineMagnifyingGlass
                            color="var(--primary-color)"
                            size={21}
                            className={styled.search_btn}
                            onClick={handleSearch}
                        />
                    </div>
                    {searchValue.trim() !== "" ? (
                        <div className={styled.search_results}>
                            {searchedProducts.length !== 0
                                ? searchedProducts.map((product) => (
                                      <ShegeftProduct
                                          row={true}
                                          id={product.id}
                                          title={product.name}
                                          image={product.images[0]}
                                          newprice={product.takhfifprice}
                                          preprice={product.price}
                                          stock={product.stock}
                                          onClick={handleProductClickFromSearch}
                                      />
                                  ))
                                : "محصولی یافت نشد."}
                        </div>
                    ) : (
                        <div className={styled.search_history}>
                            {searchHistory.length !== 0 ? (
                                searchHistory.map((item, index) => (
                                    <div
                                        key={index}
                                        className={styled.history_item}
                                        onClick={() => handleHistoryClick(item)}
                                    >
                                        <HiOutlineMagnifyingGlass size={16} />
                                        <span>{item}</span>
                                    </div>
                                ))
                            ) : (
                                <span>جستجویی ثبت نشده</span>
                            )}
                        </div>
                    )}
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
                                        value={searchValue}
                                        onChange={(e) => {
                                            setSearchValue(e.target.value);
                                            handleShowSearchResults(e);
                                        }}
                                        onFocus={() => setIsSearchFocused(true)}
                                        onBlur={() => {
                                            setTimeout(
                                                () => setIsSearchFocused(false),
                                                150
                                            );
                                        }}
                                        placeholder="جستجو در محصولات"
                                        type="text"
                                        onKeyDown={handleKeyDown}
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
                                {!isInputWide &&
                                    isSearchFocused &&
                                    (searchValue.trim() !== "" ? (
                                        <div
                                            className={`${styled.search_results} ${styled.absolute_results}`}
                                        >
                                            {searchedProducts.length !== 0
                                                ? searchedProducts.map(
                                                      (product) => (
                                                          <ShegeftProduct
                                                              row={true}
                                                              id={product.id}
                                                              title={
                                                                  product.name
                                                              }
                                                              image={
                                                                  product
                                                                      .images[0]
                                                              }
                                                              newprice={
                                                                  product.takhfifprice
                                                              }
                                                              preprice={
                                                                  product.price
                                                              }
                                                              stock={
                                                                  product.stock
                                                              }
                                                          />
                                                      )
                                                  )
                                                : "محصولی یافت نشد."}
                                        </div>
                                    ) : (
                                        <div
                                            className={`${styled.search_results} ${styled.absolute_results}`}
                                        >
                                            {searchHistory.length !== 0 ? (
                                                searchHistory.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className={
                                                                styled.history_item
                                                            }
                                                            onClick={() =>
                                                                handleHistoryClick(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <HiOutlineMagnifyingGlass
                                                                size={16}
                                                            />
                                                            <span>{item}</span>
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <span>جستجویی ثبت نشده</span>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        {props.isWide && <NavLinks shopCartRef={shopCartRef} />}
                    </div>

                    {props.isWide && <RightNavbar />}
                </div>
            </div>
            {!props.isWide && <BottomNavbar />}
        </>
    );
}

export default Navbar;
