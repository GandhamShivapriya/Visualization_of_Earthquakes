import React from "react";
import quakeImg from "../../assets/quake_img.png";
import "./style.css";
export default function Header() {
  return (
    <div className="header_div">
      <img
        src={quakeImg}
        className="quake-img"
        alt="Earthquake-Visualizer-Logo"
      />
      <h1 className="text-5xl font-bold title">Earthquake-Visualizer</h1>
    </div>
  );
}
