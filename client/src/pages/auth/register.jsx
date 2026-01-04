import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const intialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(intialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      console.log("Register response:", data);
      if (data?.payload?.success) {
        toast.success(data.payload.message); 
        navigate("/auth/login");
      }
      else{
        toast.error(data?.payload?.message || "Registration failed. Please try again.");
        
      }
    }).catch((error) => {
      console.error("Register error:", error);
      toast.error("An error occurred. Please try again.");
    });
  }
  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Create new account
        </h1>
        <p className="mt-2 text-gray-600">
          Already have an account?
          <Link
            className="font-medium ml-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
