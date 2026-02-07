import { Link } from "react-router-dom";
import styled from "./breadcrumb.module.css";
import { HiMiniChevronLeft } from "react-icons/hi2";

function Breadcrumb({ product }) {
    let crumbs = [
        "خانه",
        "محصولات",
        product?.category || "",
        product?.name || "",
    ];
    crumbs = crumbs.filter((crumb) => crumb !== "")
    return (
        <nav aria-label="breadcrumb">
            <ul className={styled.breadcrumb}>
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;
                    return (
                        <li key={index}>
                            {isLast ? (
                                <span>{crumb}</span>
                            ) : (
                                <Link
                                    to={
                                        (index === 0 && "/") ||
                                        (index === 1 && "/products") ||
                                        `/products?category=${product?.category}`
                                    }
                                >
                                    {crumb}
                                </Link>
                            )}
                            {!isLast && (
                                <span className={styled.flash}>
                                    <HiMiniChevronLeft
                                        color="var(--primary-light-text-color)"
                                        size={20}
                                    />
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Breadcrumb;
