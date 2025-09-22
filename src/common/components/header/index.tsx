"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";

import View, { IViewProps } from "./view";

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleOpenProfileMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    setMenuIsOpen(false);
    signOut({ callbackUrl: "/" });
  };

  const viewProps: IViewProps = {
    data: {
      menuIsOpen,
    },
    handles: {
      handleOpenProfileMenu,
      handleLogOut,
    },
  };
  return <View {...viewProps} />;
}
