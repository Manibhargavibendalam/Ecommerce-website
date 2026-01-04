import Address from "@/components/shopping-view/address";
import img from "../../assets/sale1.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";

function ShoppingCheckout() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  console.log(currentSelectedAddress, "currentSelectedAddress");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (isPaymentStart) return; // prevent duplicate submissions

    if (cartItems.items.length === 0) {
      toast.error("Your cart is empty.Please add items to proceed");
      return;
    }

    if (!currentSelectedAddress?._id) {
      toast.error("Please select an address to proceed");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        state: currentSelectedAddress?.state,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    console.log(orderData, "orderData");
    setIsPaymentStart(true);
    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "created order data - full response");
      if (data?.payload?.success && data?.payload?.approvalURL) {
        console.log("Redirecting to PayPal:", data.payload.approvalURL);
        window.location.href = data.payload.approvalURL;
      } else {
        console.log("Order failed or no approval URL");
        setIsPaymentStart(false);
      }
    });
  }

  if (approvalURL) {
    console.log("ApprovalURL found, redirecting:", approvalURL);
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 min-h-screen">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress?._id}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4 bg-white rounded-xl p-6 shadow-xl">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className=" space-y-4 mt-8">
            <div className="flex justify-between bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 shadow-md">
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Total</span>
              <span className="font-bold text-xl text-purple-600">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button
              onClick={handleInitiatePaypalPayment}
              disabled={isPaymentStart}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
             {
              isPaymentStart?"Processing Paypal Payment....":"Pay with Paypal"
             }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
