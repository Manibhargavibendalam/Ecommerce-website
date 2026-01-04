import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBasket,
  BadgeCheck,
  ChartNoAxesCombined,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className={`flex cursor-pointer text-base items-center gap-3 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md font-medium
            ${location.pathname.startsWith(menuItem.path)
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              : "text-slate-700 hover:bg-gradient-to-r hover:from-blue-300 hover:to-indigo-400 hover:text-white"}
          `}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
     
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64 bg-gradient-to-br from-white to-blue-50">
            <div className="flex flex-col h-full">
              <SheetHeader className="border-b border-blue-200">
                <SheetTitle className="flex gap-2 mt-5 mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  <ChartNoAxesCombined size={30} className="text-blue-700" />
                  <span>Admin Panel</span>
                </SheetTitle>
              </SheetHeader>
              <MenuItems setOpen={setOpen} />
            </div>
          </SheetContent>
        </Sheet>
     

      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-gradient-to-b from-white to-blue-50 p-6 lg:flex shadow-lg">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2 hover:scale-105 transition-transform"
        >
          <ChartNoAxesCombined size={30} className="text-blue-700" />
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
