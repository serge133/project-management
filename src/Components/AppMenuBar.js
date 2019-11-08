import React from "react";

export const MenuBar = ({ children }) => {
  return (
    <div className="menu_bar">
      <h1 className="app_name">Project Management App</h1>
      {children}
    </div>
  );
};

export const MenuButton = ({ children, control }) => {
  return <button onClick={control}>{children}</button>;
};
