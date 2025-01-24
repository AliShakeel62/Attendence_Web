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
      <Drawer
        title="Basic Drawer"
        placement="left"
        onClose={onClose}
        open={open}
      >
        <NavLink
          className={(e) => {
            return e.isActive ? "red" : "";
          }}
          to="/"
        >
          <p>Home</p>
        </NavLink>
        <NavLink
          to="/about"
          className={(e) => {
            return e.isActive ? "red" : "";
          }}
        >
          <p>About</p>
        </NavLink>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Sidemenu;
