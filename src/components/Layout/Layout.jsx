import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";
import css from "./Layout.module.css";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  return (
    <div className={css.layContainer}>
      {location.pathname !== "/" && <AppBar />}
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
