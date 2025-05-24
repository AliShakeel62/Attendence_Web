import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { NavLink } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Sidemenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="dashed" onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        open={open}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Navigation Links */}
          <div style={{ padding: "10px" }}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "black" : "transparent",
                color: isActive ? "white" : "black",
                padding: "10px",
                textDecoration: "none",
                display: "block",
              })}
            >
              {({ isActive }) => (
                <>
                  Home <i className="bi bi-house-door-fill" style={{ color: isActive ? "white" : "black" }}></i>
                </>
              )}
            </NavLink>

            <NavLink
              to="/addstudent"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "black" : "transparent",
                color: isActive ? "white" : "black",
                padding: "10px",
                textDecoration: "none",
                display: "block",
              })}
            >
              {({ isActive }) => (
                <>
                  Add Student <i className="bi bi-person-add" style={{ color: isActive ? "white" : "black" }}></i>
                </>
              )}
            </NavLink>

            <NavLink
              to="/addclasses"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "black" : "transparent",
                color: isActive ? "white" : "black",
                padding: "10px",
                textDecoration: "none",
                display: "block",
              })}
            >
              {({ isActive }) => (
                <>
                  Add Classes <i className="bi bi-house-add" style={{ color: isActive ? "white" : "black" }}></i>
                </>
              )}
            </NavLink>

            <NavLink
              to="/teacher"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "black" : "transparent",
                color: isActive ? "white" : "black",
                padding: "10px",
                textDecoration: "none",
                display: "block",
              })}
            >
              {({ isActive }) => (
                <>
                  Teacher <i className="bi bi-person-add" style={{ color: isActive ? "white" : "black" }}></i>
                </>
              )}
            </NavLink>

            <NavLink
              to="/attendence"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "black" : "transparent",
                color: isActive ? "white" : "black",
                padding: "10px",
                textDecoration: "none",
                display: "block",
              })}
            >
              {({ isActive }) => (
                <>
                  Student Attendance <i className="bi bi-table" style={{ color: isActive ? "white" : "black" }}></i>
                </>
              )}
            </NavLink>

            <NavLink
              to="/teacher_attendence"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "black" : "transparent",
                color: isActive ? "white" : "black",
                padding: "10px",
                textDecoration: "none",
                display: "block",
              })}
            >
              {({ isActive }) => (
                <>
                  Teacher Attendance <i className="bi bi-table" style={{ color: isActive ? "white" : "black" }}></i>
                </>
              )}
            </NavLink>
          </div>

          {/* Social Icons Footer */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: 20,
              borderTop: "1px solid #ccc",
              display: "flex",
              justifyContent: "center",
              gap: 20,
              backgroundColor: "black",
              paddingBottom: 10,
            }}
          >
            <a href="https://github.com/AliShakeel62" target="_blank" rel="noopener noreferrer">
              <FaGithub size={22} color="white" />
            </a>
            <a href="https://www.linkedin.com/in/alishakeel62/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={22} color="white" />
            </a>
            <a href="https://www.instagram.com/alishakeel829/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={22} color="white" />
            </a>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Sidemenu;
