import React from "react";
import styled from "./productsCategory.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

function ProductsCategory() {
    const { products } = useContext(ProductsContext);

    const categories = [];

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const category = product.category;

        // اگر دسته هنوز اضافه نشده، اضافه کن و عکس اول محصول رو هم نگه دار
        if (!categories.some((c) => c.category === category)) {
            categories.push({ category, image: product.images[0] });
        }
    }

    console.log(categories);

    return (
        <div className={styled.product_category_wrapper}>
            <h3 className="title">
                <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                            d="M3.86376 16.4552C3.00581 13.0234 2.57684 11.3075 3.47767 10.1538C4.3785 9 6.14721 9 9.68462 9H14.3153C17.8527 9 19.6214 9 20.5222 10.1538C21.4231 11.3075 20.9941 13.0234 20.1362 16.4552C19.5905 18.6379 19.3176 19.7292 18.5039 20.3646C17.6901 21 16.5652 21 14.3153 21H9.68462C7.43476 21 6.30983 21 5.49605 20.3646C4.68227 19.7292 4.40943 18.6379 3.86376 16.4552Z"
                            stroke="#008bdb"
                            strokeWidth="1.5"
                        ></path>{" "}
                        <path
                            d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4"
                            stroke="#008bdb"
                            strokeWidth="1.5"
                        ></path>{" "}
                        <path
                            d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z"
                            stroke="#008bdb"
                            strokeWidth="1.5"
                        ></path>{" "}
                        <path
                            d="M8 13V17"
                            stroke="#008bdb"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                        <path
                            d="M16 13V17"
                            stroke="#008bdb"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                        <path
                            d="M12 13V17"
                            stroke="#008bdb"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                    </g>
                </svg>
                دسته بندی کالاها
            </h3>
            <div className={styled.products_categories}>
                {categories.map((cat) => (
                    <div key={cat.category} className={styled.product_category}>
                        <Link
                            to={`/category/${cat.category}`}
                            key={cat.category}
                            className={styled.product_category}
                        >
                            <img src={cat.image} alt={cat.category} />
                            <h4>{cat.category}</h4>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsCategory;
