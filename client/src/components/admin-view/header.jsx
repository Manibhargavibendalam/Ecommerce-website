import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { logOutUser } from "../../store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch=useDispatch();
   
   function handleLogout() {
      dispatch(logOutUser());
   }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 border-b border-slate-600 shadow-lg">
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden sm:block bg-white hover:bg-slate-200 text-slate-700"
      >
        <AlignJustify />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogout} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
