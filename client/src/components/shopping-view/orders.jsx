import { useState } from "react";
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
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setopenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList ,orderDetails} = useSelector((state) => state.shopOrder);


  function handleFetchOrderDetails(getId){
    dispatch(getOrderDetails(getId) );
  }

  useEffect(() => {
    console.log("User object:", user);
    console.log("User ID:", user?.id);
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]);


  useEffect(()=>{
    if(orderDetails !==null){
      setopenDetailsDialog(true);
    }

  }, [orderDetails])


  console.log("my orderDetails", orderDetails);

  return (
    <Card className="bg-white shadow-2xl border-2 border-purple-200 rounded-xl">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-200 rounded-t-xl">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Order History</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="rounded-lg overflow-hidden border border-purple-100">
        <Table>
          <TableHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
            <TableRow>
              <TableHead className="font-bold text-purple-700">Order ID</TableHead>
              <TableHead className="font-bold text-purple-700">Order Date</TableHead>
              <TableHead className="font-bold text-purple-700">Order Status</TableHead>
              <TableHead className="font-bold text-purple-700">Order Price</TableHead>
              <TableHead className="font-bold text-purple-700">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <TableRow key={orderItem._id} className="hover:bg-purple-50 transition-colors border-b border-purple-100">
                  <TableCell className="font-mono text-sm text-gray-700">{orderItem?._id}</TableCell>
                  <TableCell className="text-gray-700 font-medium">{orderItem?.orderDate?.split("T")[0]}</TableCell>
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
                        orderItem?.orderStatus === "confirmed" ? "bg-green-600 hover:bg-green-600 text-white border-green-500" :
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
                      onOpenChange={()=>{
                        setopenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        onClick={()=>handleFetchOrderDetails(orderItem._id)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-lg"
                      >
                        View Details
                      </Button>
                      <ShoppingOrderDetailsView  orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-8">
                  <div className="text-gray-500 text-lg">
                    <p className="font-semibold mb-2">No orders found</p>
                    <p className="text-sm">Start shopping to place your first order!</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
