import React from "react";
import styled from "./prePageNav.module.css";
import { HiMiniArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function PrePageNav({ title }) {

    const navigate = useNavigate()

    return (
        <nav className={styled.previous_nav}>
            <i onClick={() => {navigate(-1)}} className={styled.arrow_icon}>
                <HiMiniArrowRight size={30} />
            </i>
            <h5 className={styled.product_title}>{title}</h5>
        </nav>
    );
}

export default PrePageNav;
