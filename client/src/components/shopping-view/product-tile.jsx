import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ShoppingProducttile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl overflow-hidden border border-blue-100">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative overflow-hidden group">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product?.totalStock <= 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white">
              Out of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600 text-white">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600 text-white">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 truncate" title={product?.title}>{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-gray-400 text-sm" : "text-lg font-bold text-gray-900"
              }`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-xl font-bold text-green-600">
                ₹{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4">
        {product?.totalStock <= 0 ? (
          <Button
            disabled
            className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white opacity-60 cursor-not-allowed rounded-lg py-6 font-semibold"
          >
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-lg py-6 font-semibold shadow-md hover:shadow-xl transition-all"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
export default ShoppingProducttile;
