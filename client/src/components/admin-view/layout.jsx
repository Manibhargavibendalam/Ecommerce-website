import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function AdminLayout(){

   const [openSidebar,setOpenSidebar]=useState(false);

  return(
    <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/*admin sidebar*/}
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
        <div className="flex flex-1 flex-col">
           {/* admin header */}
           <AdminHeader setOpen={setOpenSidebar}/>
           <main className="flex-1 flex-col flex bg-gradient-to-br from-slate-100/50 to-blue-100/50 p-4 md:p-6">
                <Outlet/>
           </main>
        </div>
    </div>
  )
}

export default AdminLayout;