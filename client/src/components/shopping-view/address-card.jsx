import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all hover:shadow-xl ${
        selectedId===addressInfo?._id 
          ? 'border-4 border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg' 
          : 'border-2 border-gray-200 bg-white hover:border-purple-300'
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Address:{addressInfo?.address}</Label>
        <Label>City:{addressInfo?.city}</Label>
        <Label>State:{addressInfo?.state}</Label>
        <Label>Pincode:{addressInfo?.pincode}</Label>
        <Label>Phone:{addressInfo?.phone}</Label>
        <Label>Notes:{addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
