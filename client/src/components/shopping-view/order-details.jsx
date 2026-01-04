import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

function ShoppingOrderDetailsView({ orderDetails }) {

  const {user}=useSelector(state=>state.auth);

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-gradient-to-br from-white to-purple-50 overflow-y-auto rounded-xl shadow-2xl">
      <div className="grid gap-6 p-6">
        <div className="border-b-2 border-purple-200 pb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Order Details</h2>
        </div>
        <div className="grid gap-4 bg-white rounded-lg p-4 border border-purple-100">
          <div className="flex items-center justify-between py-2 border-b border-purple-100">
            <p className="text-base font-semibold text-purple-700">Order ID</p>
            <Label className="font-mono text-xs text-gray-600 break-all">{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-purple-100">
            <p className="text-base font-semibold text-purple-700">Order Date</p>
            <Label className="text-gray-600">{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-purple-100">
            <p className="text-base font-semibold text-purple-700">Order Price</p>
            <Label className="text-lg font-bold text-green-600">₹{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-purple-100">
            <p className="text-base font-semibold text-purple-700">Payment Method</p>
            <Label className="text-gray-600 capitalize">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-purple-100">
            <p className="text-base font-semibold text-purple-700">Payment Status</p>
            <Label className="text-gray-600 capitalize">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-base font-semibold text-purple-700">Order Status</p>
            <Label>
              <Badge
                variant={
                  orderDetails?.orderStatus === "pending"
                    ? "destructive"
                    : orderDetails?.orderStatus === "confirmed"
                    ? "default"
                    : orderDetails?.orderStatus === "shipped"
                    ? "secondary"
                    : orderDetails?.orderStatus === "delivered"
                    ? "default"
                    : "destructive"
                }
                className={
                  orderDetails?.orderStatus === "pending"
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500"
                    : orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-600 hover:bg-green-600 text-white border-green-500"
                    : orderDetails?.orderStatus === "shipped"
                    ? "bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
                    : orderDetails?.orderStatus === "delivered"
                    ? "bg-purple-500 hover:bg-purple-600 text-white border-purple-500"
                    : "bg-red-500 text-white border-red-500"
                }
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <Separator className="bg-purple-200" />
          <div className="grid gap-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
            <div className="grid gap-2">
              <div className="text-base font-semibold text-purple-700">Order Items</div>
              <ul className="grid gap-3">
                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                  ? orderDetails?.cartItems.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between bg-white p-3 rounded border border-purple-100">
                        <span className="font-medium text-gray-700">{item.title}</span>
                        <span className="text-gray-600">x{item.quantity}</span>
                        <span className="font-bold text-green-600">₹{item.price}</span>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>

          <div className="grid gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
            <div className="grid gap-2">
              <div className="text-base font-semibold text-blue-700">Shipping Information</div>
              <div className="grid gap-0.5 text-sm">
                <span className="text-gray-700 font-medium">{user.userName}</span>
                <span className="text-gray-600">{orderDetails?.addressInfo?.address}</span>
                <span className="text-gray-600">{orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.state}</span>
                <span className="text-gray-600">Pin: {orderDetails?.addressInfo?.pincode}</span>
                <span className="text-gray-600">Phone: {orderDetails?.addressInfo?.phone}</span>
                {orderDetails?.addressInfo?.notes && <span className="text-gray-600">Notes: {orderDetails?.addressInfo?.notes}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
