import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin ,resetAdminOrderDetails} from "@/store/admin/order-slice";


function AdminOrdersView() {
  const [openDetailsDialog, setopenDetailsDialog] = useState(false);
  const{orderList,orderDetails}=useSelector((state)=>state.adminOrder)
  const dispatch=useDispatch();


  function handleFetchOrderDetails(getId){
    dispatch(getOrderDetailsForAdmin(getId) );
  }

  useEffect(()=>{
    dispatch(getAllOrdersForAdmin());
  },[dispatch]);


  console.log(orderDetails,"orderDetails");

  useEffect(()=>{
    if(orderDetails !==null){
      setopenDetailsDialog(true);
    }
  },[orderDetails])

  return (
    <Card className="bg-white shadow-xl border-2 border-slate-200">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
        <CardTitle className="text-2xl bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <TableRow key={orderItem._id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate?.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        orderItem?.orderStatus === "pending" ? "destructive" :
                        orderItem?.orderStatus === "confirmed" ? "default" :
                        orderItem?.orderStatus === "shipped" ? "secondary" :
                        orderItem?.orderStatus === "delivered" ? "default" :
                        "destructive"
                      }
                      className={
                        orderItem?.orderStatus === "pending" ? "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500" :
                        orderItem?.orderStatus === "confirmed" ? "bg-green-500 hover:bg-green-600 text-white border-green-500" :
                        orderItem?.orderStatus === "shipped" ? "bg-blue-500 hover:bg-blue-600 text-white border-blue-500" :
                        orderItem?.orderStatus === "delivered" ? "bg-purple-500 hover:bg-purple-600 text-white border-purple-500" :
                        "bg-red-500 text-white border-red-500"
                      }
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                    <TableCell>₹{orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setopenDetailsDialog(false);
                        dispatch(resetAdminOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold"
                      >
                        View Details
                      </Button>
                      <AdminOrderDetailsView orderDetails={orderDetails}/>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-6">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
