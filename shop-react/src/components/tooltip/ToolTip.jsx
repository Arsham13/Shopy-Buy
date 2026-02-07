import React from "react";
import styled from "./toolTip.module.css";

function ToolTip({ title, show }) {
    return <div className={`${styled.tooltip} ${show ? styled.show : ""}`}>{title}</div>;
}

export default ToolTip;
