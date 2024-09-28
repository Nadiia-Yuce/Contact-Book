import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && <AppBar />}
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
