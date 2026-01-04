import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Welcome to ShopHub
          </h1>
          <p className="text-xl text-white/90">Your Premium Shopping Destination</p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-12 sm:px-6 lg:px-8">
        <Outlet/>
      </div>
    </div>
  );
}

export default AuthLayout;