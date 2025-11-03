import React from "react";
import styled from "./shegeftProduct.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function ShegeftProduct(params) {
    console.log(params.title);
    let takhfif = Math.round(
        ((params.preprice - params.newprice) / params.preprice) * 100
    );
    const takhfif_fa = `${takhfif.toLocaleString("fa", takhfif)}`;
    const newprice = parseInt(params.newprice).toLocaleString(
        "fa",
        params.newprice
    );
    const preprice = parseInt(params.preprice).toLocaleString(
        "fa",
        params.preprice
    );

    return (
        <Link className={styled.products} to={`/products/${params.id}`}>
            <div
                className={styled.shegeft_wrapper}
                style={params.row ? { width: "90%" } : {}}
            >
                {takhfif >= 20 && !params.row && (
                    <div className={styled.shegeft_baner}>شگفت انگیز</div>
                )}

                <div
                    className={`${styled.shegeft_product} ${
                        params.row ? styled.row : ""
                    }`}
                    style={params.row ? { padding: "10px 20px" } : {}}
                >
                    <div className={styled.shegeft_titles}>
                        <img
                            className={styled.product_image}
                            // src="https://dkstatics-public.digikala.com/digikala-products/9f78e4251c97e94203c56cecc03545a7d2470bda_1751893583.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80"
                            src={params.image}
                            style={params.row ? { width: "100px" } : {}}
                            alt={params.title}
                        />
                    </div>
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
                        {!params.texts && (
                            <div className={styled.texts}>
                                <div className={styled.takhfif_num}>
                                    {takhfif_fa !== "ناعدد" &&
                                        params.preprice && <p>{takhfif_fa}%</p>}
                                </div>
                                <div className={styled.shegeft_prices}>
                                    <div className={styled.product_price}>
                                        <b>
                                            {newprice !== "ناعدد"
                                                ? newprice
                                                : preprice}
                                        </b>
                                        <span className={styled.toman}>تو</span>
                                    </div>
                                    <div className={styled.product_preprice}>
                                        <b>
                                            {(() => {
                                                if (newprice === "ناعدد") {
                                                    return "";
                                                } else if (
                                                    preprice !== "ناعدد"
                                                ) {
                                                    return preprice
                                                }
                                            })()}
                                        </b>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ShegeftProduct;
