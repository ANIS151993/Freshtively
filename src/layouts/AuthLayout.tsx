import { Outlet } from "react-router-dom";
import { Logo } from "../components/common/Logo";
import { AppCopyrightFooter } from "../components/layout/AppCopyrightFooter";

export default function AuthLayout() {
  return (
    <div className="min-h-screen freshtively-gradient px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Logo />
        <div className="mt-10 grid min-h-[calc(100vh-160px)] place-items-center">
          <Outlet />
        </div>
      </div>
      <AppCopyrightFooter />
    </div>
  );
}
