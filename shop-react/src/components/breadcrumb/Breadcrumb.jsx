import { Link } from "react-router-dom";

function Breadcrumb({ product }) {
    const crumbs = ["خانه", product.category, product.name];

    return (
        <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;
                    return (
                        <li key={index}>
                            {isLast ? (
                                <span>{crumb}</span>
                            ) : (
                                <Link
                                    to={
                                        index === 0
                                            ? "/"
                                            : `/category/${product.category}`
                                    }
                                >
                                    {crumb}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Breadcrumb;
