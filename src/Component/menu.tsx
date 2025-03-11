import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { NavLink } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

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
      <Drawer title="Basic Drawer" placement="left" onClose={onClose} open={open}>
        <div style={{ display: "flex", flexDirection: "column"}}>
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
            Home
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
            Add Student
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
            Add Classes
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
            Teacher
          </NavLink>
        </div>
      </Drawer>
    </>
  );
};

export default Sidemenu;
