import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle,CardContent} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
    const Navigate=useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-2 border-green-200 bg-white">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">✓ Payment Successful</CardTitle>
        </CardHeader>
       <CardContent className="p-6 space-y-4 text-center">
           <p className="text-gray-700 text-lg font-medium">Thank you for your purchase!</p>
           <p className="text-gray-600">Your order has been confirmed and will be processed shortly.</p>
           <Button onClick={()=>Navigate("/shop/account")} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-lg shadow-lg hover:shadow-xl transition-all mt-6">View Your Orders</Button>
       </CardContent>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
