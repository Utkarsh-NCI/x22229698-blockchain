import React from "react";
import style from "./navbar.module.css";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router-dom";

const CustomLink = ({ href, ...props }) => {
  let location = useLocation();
  const isActive = href === location.pathname;

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <Link href={href} className="NavigationMenuLink" {...props} />
    </NavigationMenu.Link>
  );
};

const Nav = () => {
  return (
    <NavigationMenu.Root className={style.NavigationMenuRoot}>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <CustomLink href="/">Home</CustomLink>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <CustomLink href="/about">About</CustomLink>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Nav;
