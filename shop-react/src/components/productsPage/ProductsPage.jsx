import React, { useContext, useState } from "react";
import styled from "./productsPage.module.css";
import { ProductsContext } from "../../context/ProductsContext";
import ShegeftProduct from "../shegeftProduct/ShegeftProduct";
import {
    HiMiniChevronDown,
    HiMiniXMark,
    HiOutlineAdjustmentsHorizontal,
    HiOutlineFunnel,
    HiOutlineSquares2X2,
    HiXMark,
} from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRef } from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";

// تبدیل فارسی به انگلیسی
const toEnglishNumbers = (str) => {
    if (!str) return "";
    return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
};

// فقط اعداد رو نگه می‌داره
const normalizeInput = (value) => {
    const english = toEnglishNumbers(value);
    const onlyNumbers = english.replace(/[^\d]/g, ""); // حذف هرچیزی غیر از عدد
    return onlyNumbers;
};

function ProductsPage(props) {
    const { products, loading, error } = useContext(ProductsContext);
    const filtersRef = useRef(null);

    const [openIndexes, setOpenIndexes] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const isShegeft = searchParams.get("shegeft") === "1";

    const selectedCategories = searchParams.get("category")
        ? searchParams.get("category").split(",")
        : [];

    const minPrice = Number(searchParams.get("min")) || 0;
    const maxPrice = Number(searchParams.get("max")) || 50000000;

    const searchQuery = searchParams.get("search") || "";

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>{error}</p>;

    const handleClickDetails = (index) => {
        setOpenIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const updateParams = (newMin, newMax) => {
        const ParamsObj = {};
        if (selectedCategories.length > 0)
            ParamsObj.category = selectedCategories.join(",");
        if (newMin !== undefined) ParamsObj.min = newMin;
        if (newMax !== undefined) ParamsObj.max = newMax;
        if (searchQuery) ParamsObj.search = searchQuery;

        if (isShegeft) ParamsObj.shegeft = "1";

        setSearchParams(ParamsObj);
    };

    const handleCategoryChange = (category) => {
        let updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];

        const ParamsObj = {};
        if (updatedCategories.length > 0)
            ParamsObj.category = updatedCategories.join(",");
        if (minPrice) ParamsObj.min = minPrice;
        if (maxPrice) ParamsObj.max = maxPrice;
        if (searchQuery) ParamsObj.search = searchQuery;

        if (isShegeft) ParamsObj.shegeft = "1";

        setSearchParams(ParamsObj);
        window.scrollTo(0, 0);
    };

    // هندلر ورودی مینیمم
    const handleMinPriceChange = (e) => {
        const raw = normalizeInput(e.target.value);
        if (raw === "") {
            updateParams(0, maxPrice);
            return;
        }
        updateParams(Number(raw), maxPrice);
    };

    // هندلر ورودی ماکسیمم
    const handleMaxPriceChange = (e) => {
        const raw = normalizeInput(e.target.value);
        if (raw === "") {
            updateParams(minPrice, 50000000);
            return;
        }
        updateParams(minPrice, Number(raw));
    };

    const handleShegeftToggle = () => {
        const ParamsObj = {};

        if (selectedCategories.length > 0)
            ParamsObj.category = selectedCategories.join(",");

        if (minPrice !== 0) ParamsObj.min = minPrice;
        if (maxPrice !== 50000000) ParamsObj.max = maxPrice;

        if (searchQuery) ParamsObj.search = searchQuery;

        if (!isShegeft) ParamsObj.shegeft = "1";

        setSearchParams(ParamsObj);
        window.scrollTo(0, 0);
    };

    const clearAllFilters = () => {
        setSearchParams({});
        window.scrollTo(0, 0);

        if (props.isShowFilters) {
            closeFilters();
        }
    };

    const filteredProducts = products.filter((product) => {
        const inCategory =
            selectedCategories.length > 0
                ? selectedCategories.includes(product.category)
                : true;

        const inPrice =
            product.takhfifprice >= minPrice &&
            product.takhfifprice <= maxPrice;

        const inSearch = searchQuery
            ? product.name.includes(searchQuery.trim())
            : true;

        const discountPercent = product.price
            ? Math.round(
                  ((product.price - product.takhfifprice) / product.price) * 100
              )
            : 0;

        console.log(product);

        const inShegeft = isShegeft
            ? discountPercent >= 70 && discountPercent < 100
            : true;
        return inCategory && inPrice && inSearch && inShegeft;
    });

    const showFilters = () => {
        filtersRef.current.classList.add(styled.show);
        filtersRef.current.nextElementSibling.classList.add(styled.modal_show);
    };
    const closeFilters = () => {
        filtersRef.current.classList.remove(styled.show);
        filtersRef.current.nextElementSibling.classList.remove(
            styled.modal_show
        );
    };

    return (
        <>
            <Breadcrumb />
            <div className={styled.titles}>
                <h2 className={styled.searchQuery}>محصولات</h2>
                {searchQuery ? (
                    <h2 className={styled.searchQuery}>
                        جستجو برای "<span>{searchQuery}</span>"
                    </h2>
                ) : (
                    ""
                )}
            </div>

            <div className={styled.products_wrapper}>
                {props.isShowFilters && (
                    <div onClick={showFilters} className={styled.showFilters}>
                        <h3>اعمال فیلتر</h3>
                    </div>
                )}

                <section
                    ref={filtersRef}
                    className={`${styled.filters} ${
                        !props.isShowFilters && styled.show && ""
                    }`}
                >
                    <div className={styled.closes}>
                        <h3 className="row align_center gap_5">
                            <HiOutlineFunnel size={25} />
                            فیلتر ها
                        </h3>
                        {props.isShowFilters && (
                            <i>
                                <HiXMark
                                    onClick={closeFilters}
                                    className={styled.close_mark}
                                    color="var(--primary-text-color)"
                                    size={35}
                                />
                            </i>
                        )}
                    </div>
                    {selectedCategories.length > 0 && (
                        <div className={styled.active_filters}>
                            {selectedCategories.map((cat) => (
                                <span
                                    key={cat}
                                    className={`${styled.active_filter} row gap_5 align_center`}
                                    onClick={() => handleCategoryChange(cat)}
                                >
                                    <HiMiniXMark size={20} />
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* دسته بندی */}
                    <div
                        className={styled.details}
                        onClick={() => handleClickDetails(0)}
                    >
                        <div className="row align_center gap_5">
                            <HiOutlineSquares2X2 size={20} />
                            <p>دسته بندی</p>
                        </div>
                        <i
                            className={
                                openIndexes.includes(0) ? styled.rotate : ""
                            }
                        >
                            <HiMiniChevronDown
                                color="var(--primary-text-color)"
                                size={25}
                            />
                        </i>
                    </div>
                    <div
                        className={`${styled.summary} ${
                            styled.category_summary
                        } ${openIndexes.includes(0) ? styled.open : ""}`}
                    >
                        <div className={styled.information}>
                            {[...new Set(products.map((p) => p.category))].map(
                                (category, i) => (
                                    <label key={i} className={styled.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(
                                                category
                                            )}
                                            onChange={() =>
                                                handleCategoryChange(category)
                                            }
                                        />
                                        <div className={styled.checkmark}></div>
                                        {category}
                                    </label>
                                )
                            )}
                        </div>
                    </div>

                    {/* قیمت */}
                    <div
                        className={styled.details}
                        onClick={() => handleClickDetails(1)}
                    >
                        <div className="row align_center gap_5">
                            <HiOutlineAdjustmentsHorizontal size={20} />
                            <p>قیمت</p>
                        </div>
                        <i
                            className={
                                openIndexes.includes(1) ? styled.rotate : ""
                            }
                        >
                            <HiMiniChevronDown
                                color="var(--primary-text-color)"
                                size={25}
                            />
                        </i>
                    </div>
                    <div
                        className={`${styled.summary} ${styled.price_summary} ${
                            openIndexes.includes(1) ? styled.open : ""
                        }`}
                    >
                        <div className={styled.information}>
                            <Slider
                                range
                                min={0}
                                step={100000}
                                max={50000000}
                                value={[minPrice, maxPrice]}
                                onChange={([min, max]) =>
                                    updateParams(min, max)
                                }
                                allowCross={false}
                            />

                            <div className={styled.prices}>
                                <div className={styled.fromto_price}>
                                    {" "}
                                    <span>از</span>
                                    <input
                                        type="text"
                                        value={minPrice.toLocaleString("fa")}
                                        onChange={handleMinPriceChange}
                                        dir="ltr"
                                    />
                                </div>
                                <div className={styled.fromto_price}>
                                    {" "}
                                    <span>تا</span>
                                    <input
                                        type="text"
                                        value={maxPrice.toLocaleString("fa")}
                                        onChange={handleMaxPriceChange}
                                        dir="ltr"
                                    />
                                </div>
                                <span className={styled.toman}>تومان</span>
                            </div>
                        </div>
                    </div>

                    <div className={styled.toggle_filters}>
                        <label className={`switch ${styled.shegefts_filter}`}>
                            <h5>شگفت انگیزها</h5>
                            <input
                                type="checkbox"
                                checked={isShegeft}
                                onChange={handleShegeftToggle}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>

                    <div
                        className={`${styled.clear_all_btn} ${
                            selectedCategories.length === 0 &&
                            minPrice === 0 &&
                            maxPrice === 50000000 &&
                            !isShegeft
                                ? "btn_disabled"
                                : ""
                        }`}
                        onClick={
                            selectedCategories.length !== 0 ||
                            minPrice !== 0 ||
                            maxPrice !== 50000000 ||
                            isShegeft
                                ? clearAllFilters
                                : () => {}
                        }
                    >
                        برداشتن همه فیلتر ها
                    </div>
                </section>

                {props.isShowFilters && (
                    <div className={styled.modal} onClick={closeFilters}></div>
                )}

                <section className={styled.products}>
                    <div className={styled.dropdown_filter}></div>
                    <div className={styled.product_container}>
                        {filteredProducts.map((product) => {
                            console.log(product);
                            return (
                                <div
                                    key={product.id}
                                    className={styled.product}
                                >
                                    <ShegeftProduct
                                        row={props.isRow}
                                        id={product.id}
                                        title={product.name}
                                        image={product.images[0]}
                                        newprice={product.takhfifprice}
                                        preprice={product.price}
                                        stock={product.stock}
                                    />
                                </div>
                            );
                        })}
                        {filteredProducts.length === 0 && (
                            <p>هیچ محصولی یافت نشد</p>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}

export default ProductsPage;
