import React from "react";
import styled from "./loopNavar.module.css";

function LoopNavar() {
    return (
        <div className={styled.scroller_wrap}>
            <div className={styled.scroller}>
                <span>بهترین کیفیت</span>
                <span className={styled.dot}>✦</span>
                <span>بهترین قیمت</span>
                <span className={styled.dot}>✦</span>
                <span>بهترین انتخاب</span>
                <span className={styled.dot}>✦</span>
                <span>بهترین خرید</span>
                <span className={styled.dot}>✦</span>

                <span>بهترین کیفیت</span>
                <span className={styled.dot}>✦</span>
                <span>بهترین قیمت</span>
                <span className={styled.dot}>✦</span>
                <span>بهترین انتخاب</span>
                <span className={styled.dot}>✦</span>
                <span>بهترین خرید</span>
                <span className={styled.dot}>✦</span>
            </div>
        </div>
    );
}

export default LoopNavar;
