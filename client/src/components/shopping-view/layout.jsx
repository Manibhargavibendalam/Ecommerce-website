import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header.jsx";

function ShoppingLayout(){
    return(
        <div className="flex flex-col bg-white overflow-hidden">
           {/*commmon header for shopping pages*/}
           <ShoppingHeader />
           <main className="flex flex-col w-full">
             <Outlet />
            </main>
        </div>
    )
}

export default ShoppingLayout;