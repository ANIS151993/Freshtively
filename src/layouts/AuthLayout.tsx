import { Outlet, useLocation } from "react-router-dom";
import { Logo } from "../components/common/Logo";
import { AppCopyrightFooter } from "../components/layout/AppCopyrightFooter";

export default function AuthLayout() {
  const location = useLocation();

  if (location.pathname === "/login") {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#f6f7f4] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-center md:justify-start">
          <Logo />
        </div>
        <div className="mt-5 grid min-h-[calc(100vh-150px)] place-items-center">
          <Outlet />
        </div>
      </div>
      <AppCopyrightFooter />
    </div>
  );
}
