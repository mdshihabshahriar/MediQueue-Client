"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FiEye, FiEyeOff, FiUser, FiMail, FiImage, FiLock, FiZap } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const onSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const user = Object.fromEntries(formData.entries());

  const { data, error } = await authClient.signUp.email({
    email: user.email,
    password: user.password,
    name: user.name,
    image: user.image,
  });

  console.log({ data, error });

  if (data) {
    redirect("/");
  }
};

const handleGoogleSignin = async () => {
    await authClient.signIn.social({
        provider: "google"
    })
}

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-violet-50 via-purple-50 to-indigo-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-white/60 dark:border-zinc-700/50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm">

        <div className="flex flex-col items-center gap-1 pt-8 pb-4 px-8">
          <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center mb-3 shadow-lg shadow-violet-300 dark:shadow-violet-900">
            <FiZap size={22} color="white" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h1>
          <p className="text-sm text-gray-400 dark:text-zinc-500">
            Sign up to get started today
          </p>
        </div>

        <div className="px-8 pb-8">
          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>

            <TextField name="name" type="text" isRequired className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Full Name</Label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400 pointer-events-none z-10">
                  <FiUser size={16} />
                </span>
                <Input
                  placeholder="Rahim Uddin"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900 transition-all"
                />
              </div>
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              className="flex flex-col gap-1"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Email Address</Label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400 pointer-events-none z-10">
                  <FiMail size={16} />
                </span>
                <Input
                  placeholder="rahim@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900 transition-all"
                />
              </div>
              <FieldError className="text-xs text-red-500 px-1" />
            </TextField>

            <TextField name="image" type="url" className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                Photo URL <span className="text-gray-400 font-normal">(optional)</span>
              </Label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400 pointer-events-none z-10">
                  <FiImage size={16} />
                </span>
                <Input
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900 transition-all"
                />
              </div>
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type={showPassword ? "text" : "password"}
              className="flex flex-col gap-1"
              validate={(value) => {
                if (value.length < 8) return "Password must be at least 8 characters";
                if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                return null;
              }}
            >
              <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Password</Label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400 pointer-events-none z-10">
                  <FiLock size={16} />
                </span>
                <Input
                  placeholder="Min. 8 characters"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors z-10"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              <Description className="text-xs text-gray-400 px-1">
                Min. 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-xs text-red-500 px-1" />
            </TextField>

            <div className="flex gap-2 mt-1">
              <Button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-lg shadow-violet-200 dark:shadow-violet-900"
              >
                Create Account
              </Button>
            </div>

          </Form>

          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1 border-gray-200 dark:border-zinc-700" />
            <span className="text-xs text-gray-400">or continue with</span>
            <hr className="flex-1 border-gray-200 dark:border-zinc-700" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignin}
            className="btn w-full py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            <FcGoogle size={18} />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-400 mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-violet-600 dark:text-violet-400 font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>

      </Card>
    </div>
  );
};

export default SignUpPage;