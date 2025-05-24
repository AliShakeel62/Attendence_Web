import React from "react";
import Sidemenu from "./menu";
import { FaGithub, FaLinkedin, FaEnvelope , FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "8vh",
        padding: "0 20px",
        color: "white", // ✅ Inherited color
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Sidemenu />
        <p
          style={{
            margin: 10,
            marginLeft: 20,
            fontFamily: "sans-serif",
            fontSize: 24,
            fontWeight: 700,
            lineHeight: "8vh",
            color:"white"
          }}
        >
          School Attendance
        </p>
      </div>

      {/* Icons */}
     <div className="nav-icons" style={{ display: "flex", gap: 20 }}>
  <a
    href="https://github.com/AliShakeel62"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaGithub size={22} color="white" />
  </a>
  <a
    href="https://www.linkedin.com/in/alishakeel62/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaLinkedin size={22} color="white" />
  </a>
  <a href="https://www.instagram.com/alishakeel829/">
    <FaInstagram size={22} color="white" />
  </a>
</div>

      {/* Responsive style */}
      <style>{`
        @media (max-width: 768px) {
          .nav-icons {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
