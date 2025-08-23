import React, { useLayoutEffect } from "react";
import "../../css/page-shell.css";

function PageShell({ children }) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.scrollBehavior = "auto";
  }, []);

  return (
    <div className="page-shell">
      {children}
    </div>
  );
}

export default PageShell;
