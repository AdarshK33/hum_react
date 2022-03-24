import React from "react";
import "./NoData.style.css";

const NoDataComp = ({ msg }) => (
  <h2 className="text-center text-uppercase text-muted m-2">{msg}</h2>
);

export default NoDataComp;
