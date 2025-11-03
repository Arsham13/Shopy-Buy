import React, { useContext, useState } from "react";
import styled from "./productsPage.module.css";
import { ProductsContext } from "../../context/ProductsContext";
import ShegeftProduct from "../shegeftProduct/ShegeftProduct";
import { HiKey, HiMiniChevronDown, HiXMark } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRef } from "react";

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

function ProductsPage(params) {
    const { products, loading, error } = useContext(ProductsContext);
    const filtersRef = useRef(null);

    const [openIndexes, setOpenIndexes] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

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
        const paramsObj = {};
        if (selectedCategories.length > 0)
            paramsObj.category = selectedCategories.join(",");
        if (newMin !== undefined) paramsObj.min = newMin;
        if (newMax !== undefined) paramsObj.max = newMax;
        if (searchQuery) paramsObj.search = searchQuery;

        setSearchParams(paramsObj);
    };

    const handleCategoryChange = (category) => {
        let updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];

        const paramsObj = {};
        if (updatedCategories.length > 0)
            paramsObj.category = updatedCategories.join(",");
        if (minPrice) paramsObj.min = minPrice;
        if (maxPrice) paramsObj.max = maxPrice;
        if (searchQuery) paramsObj.search = searchQuery;

        setSearchParams(paramsObj);
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

    const clearAllFilters = () => {
        setSearchParams({});

        if (params.isShowFilters) {
            closeFilters();
        }
    };

    const filteredProducts = products.filter((p) => {
        const inCategory =
            selectedCategories.length > 0
                ? selectedCategories.includes(p.category)
                : true;

        const inPrice =
            p.takhfifprice >= minPrice && p.takhfifprice <= maxPrice;

        const inSearch = searchQuery
            ? p.name.includes(searchQuery.trim())
            : true;

        return inCategory && inPrice && inSearch;
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
                {params.isShowFilters && (
                    <div onClick={showFilters} className={styled.showFilters}>
                        <h3>اعمال فیلتر</h3>
                    </div>
                )}

                <section
                    ref={filtersRef}
                    className={`${styled.filters} ${
                        !params.isShowFilters && styled.show && ""
                    }`}
                >
                    <div className={styled.closes}>
                        <h3>فیلتر ها</h3>
                        {params.isShowFilters && (
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

                    {/* دسته بندی */}
                    <div
                        className={styled.details}
                        onClick={() => handleClickDetails(0)}
                    >
                        <p>دسته بندی</p>
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
                        <p>قیمت</p>
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
                                step={50000}
                                max={50000000}
                                value={[minPrice, maxPrice]}
                                onChange={([min, max]) =>
                                    updateParams(min, max)
                                }
                                allowCross={false}
                            />

                            <div className={styled.prices}>
                                <span>از</span>
                                <input
                                    type="text"
                                    value={minPrice.toLocaleString("fa")}
                                    onChange={handleMinPriceChange}
                                    dir="ltr"
                                />
                                <span>تا</span>
                                <input
                                    type="text"
                                    value={maxPrice.toLocaleString("fa")}
                                    onChange={handleMaxPriceChange}
                                    dir="ltr"
                                />
                                <span className={styled.toman}>تومان</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${styled.clear_all_btn} ${
                            selectedCategories.length === 0 &&
                            minPrice === 0 &&
                            maxPrice === 50000000
                                ? styled.btn_disabled
                                : ""
                        }`}
                        onClick={
                            selectedCategories.length !== 0 ||
                            minPrice !== 0 ||
                            maxPrice !== 50000000
                                ? clearAllFilters
                                : () => {}
                        }
                    >
                        برداشتن همه فیلتر ها
                    </div>
                </section>

                {params.isShowFilters && (
                    <div className={styled.modal} onClick={closeFilters}></div>
                )}

                <section className={styled.products}>
                    {filteredProducts.map((product) => (
                        <div key={product.id} className={styled.product}>
                            <ShegeftProduct
                                row={params.isRow}
                                width={75}
                                id={product.id}
                                title={product.name}
                                image={product.images[0]}
                                newprice={product.takhfifprice}
                                preprice={product.price}
                            />
                        </div>
                    ))}
                    {filteredProducts.length === 0 && (
                        <p>هیچ محصولی یافت نشد</p>
                    )}
                </section>
            </div>
        </>
    );
}

export default ProductsPage;
