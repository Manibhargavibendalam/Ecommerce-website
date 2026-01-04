import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/store/shop/cart-slice";
import { toast } from "sonner";


function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const {cartItems}=useSelector((state)=>state.shopCart);
  const {productList}=useSelector((state)=>state.shopProducts);
  const dispatch = useDispatch();

  function handleUpdateQuantity(getCartItem, typeOfAction) {

     if(typeOfAction==="plus"){
       let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentCartItem = getCartItems.findIndex(
        (item) => item.productId === getCartItem?.productId
      );

      const getCurrentProductIndex=productList.findIndex(product=>product._id===getCartItem?.productId);
      const getTotalStock=productList[getCurrentProductIndex].totalStock
      if (indexOfCurrentCartItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(
            `Only ${getQuantity} quantity can be added for this product`
          );
          return;
        }
      }
    }

     }


    if (!user?.id) {
      toast.error("Please login to update your cart");
      return;
    }

    dispatch(
      updateCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Cart item is updated successfully");
      })
      .catch((error) => {
        toast.error(error?.message || "Failed to update cart item");
      });
  }

  function handleCartItemDelete(getCartItem) {
    if (!user?.id) {
      toast.error("Please login to update your cart");
      return;
    }

    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Cart item is deleted successfully");
      })
      .catch((error) => {
        toast.error(error?.message || "Failed to delete cart item");
      });
  }

  return (
    <div className="flex items-center space-x-4 cursor-pointer bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1 ">
          <Button
            variant="outline"
            className="h-6 w-6  "
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-6 w-6"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
