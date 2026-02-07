import React from "react";
import styled from "./shegeftProduct.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ProductCounter from "../productCounter/ProductCounter";
import Prices from "../prices/Prices";
import "../../index.css"

function ShegeftProduct(params) {
    console.log(params.title);

    return (
        <Link className={styled.products} to={`/products/${params.id}`} onClick={params.onClick}>
            <div
                className={styled.shegeft_wrapper}
                style={params.row ? { width: "90%" } : {}}
            >
                <div
                    className={styled.shegeft_product}
                    style={params.row ? { padding: "20px 15px" } : {}}
                >
                    <div
                        className={`${styled.shegeft_titles} ${
                            params.row ? styled.row : ""
                        }`}
                    >
                        <img
                            className={styled.product_image}
                            // src="https://dkstatics-public.digikala.com/digikala-products/9f78e4251c97e94203c56cecc03545a7d2470bda_1751893583.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80"
                            src={params.image}
                            style={params.row ? { width: "100px" } : {}}
                            alt={params.title}
                        />
                        <div
                            className={styled.shegeft_pricesTakhfif}
                            style={{ width: params.width + "%" }}
                        >
                            <div
                                className={styled.product_title}
                                title={params.title}
                            >
                                <p>{params.title}</p>
                            </div>
                        </div>
                    </div>

                    {!params.texts && (
                        <div className={styled.texts} style={{marginBottom: params.row ? "0" : "17px"}}>
                            <div className={styled.stock_div}>
                                {(params.stock > 5 && <h6>‏</h6>) ||
                                    (params.stock && params.stock <= 5 && (
                                        <h6>
                                            تنها{" "}
                                            {parseInt(
                                                params.stock
                                            ).toLocaleString(
                                                "fa",
                                                params.stock
                                            )}{" "}
                                            عدد در انبار باقی مانده
                                        </h6>
                                    )) ||
                                    (params.stock === 0 && <h3>ناموجود</h3>)}
                            </div>
                            {/* sdffgdfdf اینجا بود!!!!!!! */}{" "}
                            <Prices
                                newprice={params.newprice}
                                preprice={params.preprice}
                                stock={params.stock}
                            />
                        </div>
                    )}
                    {params.counter && (
                        <ProductCounter
                            product={{
                                id: params.id,
                            }}
                        />
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ShegeftProduct;
