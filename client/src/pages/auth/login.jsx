
import CommonForm from "@/components/common/form";
import { LoginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const intialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(intialState);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    //dispatch login action
    dispatch(loginUser(formData)).then((data)=>{
        console.log("Login response:", data);
        if(data?.payload?.success){
            toast.success(data.payload.message);
            // Navigation will be handled by CheckAuth component
        }else{
            // Prevent any navigation on error
            toast.error(data?.payload?.message || "Login failed. Please try again.");
        }
    }).catch((error) => {
        console.error("Login error:", error);
        toast.error("An error occurred. Please try again.");
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Sign in to your account
        </h1>
        <p className="mt-2 text-gray-600">
          Don't have an account 
          <Link
            className="font-medium ml-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={LoginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
