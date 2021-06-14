import React, { ReactChild } from "react";
import Navbar from "./Navbar";
interface LayoutProps {
  user: { id: string; username: string; iat: number };
  children: ReactChild;
}
function Layout({ children, user }: LayoutProps) {
  return (
    <React.Fragment>
      <Navbar user={user} />
      {children}
    </React.Fragment>
  );
}

export default Layout;
