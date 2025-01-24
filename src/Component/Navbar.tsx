import React from "react";
import Sidemenu from "./menu";

const Navbar = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        display: "flex",
        color: "white",
        height: "8vh",
        paddingTop: 12,
        paddingLeft: 12,
      }}
    >
      <Sidemenu />
      <p
        style={{
          color: "white",
          fontFamily: "sans-serif",
          fontSize: 24,
          fontWeight: 700,
          marginLeft: 20,
        }}
      >
        School Attendence
      </p>
    </div>
  );
};

export default Navbar;
