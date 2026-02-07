import React from "react";
import styled from "./prices.module.css";

function Prices(props) {
    let takhfif =
        Math.round(
            ((props.preprice - props.newprice) / props.preprice) * 100
        ) === 100
            ? ""
            : Math.round(
                  ((props.preprice - props.newprice) / props.preprice) * 100
              );
    const takhfif_fa = `${takhfif.toLocaleString("fa", takhfif)}`;
    const newprice = parseInt(props.newprice).toLocaleString(
        "fa",
        props.newprice
    );
    const preprice = parseInt(props.preprice).toLocaleString(
        "fa",
        props.preprice
    );
    return (
        <>
            {takhfif >= 70 && !props.row && (
                <div className={`${styled.shegeft_baner} ${props.big ? styled.shegeft_detail_product_baner : ""}`}>شگفت انگیز</div>
            )}
            <div className={styled.shegeft_prices}>
                <div className={styled.takhfif_num}>
                    {takhfif_fa !== "0" && props.newprice !== 0 && (
                        <p>{takhfif_fa}%</p>
                    )}
                </div>
                <div className={styled.product_prices}>
                    <div
                        className={styled.product_price}
                        style={{
                            fontSize: props.big ? "1.2rem" : "",
                        }}
                    >
                        <b
                            style={{
                                color: props.stock === 0 ? "red" : "",
                            }}
                        >
                            {
                                // console.log(newprice,"\t" , preprice)
                                props.newprice === 0 ? preprice : newprice
                            }
                        </b>
                        <span
                            style={{
                                color: props.stock === 0 ? "red" : "",
                            }}
                            className={styled.toman}
                        >
                            تو
                        </span>
                    </div>
                    <div className={styled.product_preprice}>
                        <b>{props.newprice !== 0 && preprice}</b>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Prices;
