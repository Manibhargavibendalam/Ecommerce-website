import { useEffect, useState } from "react";
import ProductImageUpload from "../../components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();

  const { featureImageList } = useSelector((state) => state.commonFeature);
  //    console.log(uploadedImageUrl,"uploadedImageUrl")

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if(data?.payload?.success){
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
      
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button
        onClick={handleUploadFeatureImage}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white mt-4 w-full font-bold py-6 shadow-lg"
      >
        Upload
      </Button>
      </div>
      <div className="flex flex-col w-full gap-4">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImageItem) => (
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200" key={featureImageItem._id}>
                <img
                  src={featureImageItem.image}
                  className="w-full h-[300px] object-cover"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
