import { HousePlug, LogOut, Menu, Search, ShoppingCart, UserCog } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { SheetTrigger, Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { shoppingViewHeaderMenuItems } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentmenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentmenuItem.id !== "home" &&
      getCurrentmenuItem.id !== "products" &&
      getCurrentmenuItem.id !== "search"
        ? {
            category: [getCurrentmenuItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentmenuItem.id}`)
        )
      : navigate(getCurrentmenuItem.path);
    
    // Close mobile menu after navigation
    if (setOpen) {
      setOpen(false);
    }
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-semibold cursor-pointer lg:text-white text-gray-800 hover:text-yellow-300 transition-colors"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("user from header:", user);

  function handleLogOut() {
    dispatch(logOutUser());
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button
        onClick={() => navigate("/shop/search")}
        variant="outline"
        size="icon"
        className="border-2 border-white bg-white hover:bg-yellow-300 transition-all"
      >
        <Search className="h-5 w-5 text-purple-600" />
        <span className="sr-only">Search</span>
      </Button>
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className={`relative border-2 border-white transition-all ${
            openCartSheet 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
              : 'bg-white hover:bg-yellow-300'
          }`}
        >
          <ShoppingCart className={`h-6 w-6 ${
            openCartSheet ? 'text-white' : 'text-purple-600'
          }`} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{cartItems?.items?.length || 0}</span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu open={openUserMenu} onOpenChange={setOpenUserMenu}>
        <DropdownMenuTrigger asChild>
          <Avatar className={`cursor-pointer hover:scale-110 transition-all border-2 border-white ${
            openUserMenu 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
              : 'bg-gradient-to-r from-yellow-400 to-orange-500'
          }`}>
            <AvatarFallback className={`font-extrabold text-lg text-white ${
              openUserMenu 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                : 'bg-gradient-to-r from-yellow-400 to-orange-500'
            }`}>
              {user?.userName?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <DropdownMenuLabel className="text-purple-700 font-bold">
            Logged in as {user.userName ? user.userName : "Guest"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-purple-200" />
          <DropdownMenuItem onClick={() => navigate("/shop/account")} className="hover:bg-purple-100 focus:bg-purple-100">
            <UserCog className="mr-2 h-4 w-4 text-purple-600" />
            <span className="text-gray-700">Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-purple-200" />
          <DropdownMenuItem onClick={handleLogOut} className="hover:bg-pink-100 focus:bg-pink-100">
            <LogOut className="mr-2 h-4 w-4 text-pink-600" />
            <span className="text-gray-700">LogOut</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <HousePlug className="h-6 w-6 text-white" />
          <span className="font-bold text-xl text-white">ShopHub</span>
        </Link>

        <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden bg-white hover:bg-yellow-300 border-2 border-white">
              <Menu className="h-6 w-6 text-purple-600" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-white p-4">
            <MenuItems setOpen={setOpenMobileMenu} />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
