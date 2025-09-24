import Header from "./Header";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { auth } from "../utils/firebase";
import { Login_Banner1 } from "../utils/constant";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleEyeClick = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  const [newToNetflix, setNewToNetflix] = useState(false);

  const handleSignUp = () => {
    setNewToNetflix(!newToNetflix);
  };

  const onSubmitSignUp = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data?.name,
      });

      const { uid, email, displayName } = auth.currentUser;
      dispatch(addUser({ uid, email, displayName }));

      toast.success("Signed up successfully!");

      setTimeout(() => setNewToNetflix(false), 500);

      reset();
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to sign up!");
    }
  };

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data?.email, data?.password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Signed in successfully!");
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage + " " + errorCode);
        toast.error("Failed to sign in!");
      });
    reset();
  };
  return (
    <div className="forLoginBg relative min-h-screen" style={{
            background: `url(${Login_Banner1}) no-repeat center center / cover`,
            minHeight : '100vh',
            position: 'relative',
            zIndex:'2',
          }}>
      <Header />
      {newToNetflix ? (
        <form
          className="lg:p-12 p-8 lg:w-2/5 md:w-6/12 w-full rounded-lg bg-black absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80"
          onSubmit={handleSubmit(onSubmitSignUp)}
        >
          <h1 className="text-3xl font-semibold text-white mb-4">Sign Up</h1>
          <input
            className="w-full my-3 text-white p-3 bg-gray-700 rounded-lg"
            {...register("name", { required: true })}
            aria-invalid={errors.firstName ? "true" : "false"}
            placeholder="Enter your name"
          />
          {errors.name?.type === "required" && (
            <p className="text-[#d9232e]" role="alert">
              Full name is required
            </p>
          )}
          <input
            className="w-full text-white my-3 p-3 bg-gray-700 rounded-lg"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
            placeholder="Enter your email"
          />
          {errors.email?.type === "required" && (
            <p className="text-[#d9232e]" role="alert">
              Email is required
            </p>
          )}
          <div className="relative">
            <input
              type={isPasswordShow ? "text" : "password"}
              className="w-full relative my-3 p-3 text-white bg-gray-700 rounded-lg"
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 h-4 w-4 text-white/60"
              onClick={handleEyeClick}
              aria-label={isPasswordShow ? "Hide password" : "Show password"}
            >
              {isPasswordShow ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
            {errors.password?.type === "required" && (
              <p className="text-[#d9232e]" role="alert">
                Password is required
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#d9232e] text-white p-3 rounded-lg mt-4 hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100 "
          >
            Sign Up
          </button>
          <p className="text-white text-sm mt-3">
            Created with 💖 by{" "}
            <span className="font-semibold text-[#d9232e]">Aadarsh Singh</span>{" "}
            - All Right Reserved.
          </p>
          <div className="pt-4">
            <span className="text-white">
              Already an User?{" "}
              <button
                type="button"
                className="font-bold text-[#d9232e] hover:underline"
                onClick={handleSignUp}
              >
                Sign In
              </button>
            </span>
          </div>
        </form>
      ) : (
        <form
          className="lg:p-12 p-8 lg:w-2/5 md:w-6/12 w-10/12 rounded-lg bg-black absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-semibold text-white mb-4">Sign In</h1>
          <input
            className="w-full my-3 p-3 bg-gray-700 text-white rounded-lg"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
            placeholder="Enter your email"
          />
          {errors.email?.type === "required" && (
            <p className="text-[#d9232e]" role="alert">
              Email is required
            </p>
          )}
          <div className="relative">
            <input
              type={isPasswordShow ? "text" : "password"}
              className="w-full my-3 p-3 bg-gray-700 text-white rounded-lg"
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 h-4 w-4 text-white/60"
              onClick={handleEyeClick}
              aria-label={isPasswordShow ? "Hide password" : "Show password"}
            >
              {isPasswordShow ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
            {errors.password?.type === "required" && (
              <p className="text-[#d9232e]" role="alert">
                Password is required
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#d9232e] text-white p-3 rounded-lg mt-4 hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100 "
          >
            Sign In
          </button>
          <p className="text-white text-sm mt-3">
            Created with 💖 by{" "}
            <span className="font-semibold text-[#d9232e]">Aadarsh Singh</span>{" "}
            - All Right Reserved.
          </p>
          <div className="pt-4">
            <span className="text-white">
              New to Netflix?{" "}
              <button
                type="button"
                className="font-bold text-[#d9232e] hover:underline"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
