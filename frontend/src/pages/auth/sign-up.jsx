import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from 'react';
import * as z from "zod";
import useStore from "../../store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent,CardFooter} from "../../components/ui/card";
import { SocialAuth } from "../../components/social-auth";
import { Separator } from "../../components/seperator";
import Input from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {BiLoader} from "react-icons/bi"
import { Link } from "react-router-dom";
import { toast } from "sonner";
import api from "../../libs/apiCall";


const RegisterSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
  firstName: z.string({ required_error: "Name is required" }).min(3,"Name is Required"),
  password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
});

const SignUp = () => {
  const { user } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && navigate("/");
  }, [user, navigate]);

  const onSubmit = async (data) => {
    console.log(data); 

    try{
      setLoading(true)
      const {data:res}=await api.post("/auth/sign-up",data);

     if(res?.user){
      toast.success("Account created successfully.You can now login.");
      setTimeout(()=>{
                 navigate("/sign-in");
      },1000); 
        }
    }catch(error){
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10">
      <Card className="w-[400px] bg-white dark:bg-black/20 shadow-md overflow-hidden">
        
        <CardHeader className="py-4 px-6">
          <CardTitle className="mb-8 text-center text-black dark:text-white">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 overflow-hidden">
            <div className="mb-8 space-y-6">
              <SocialAuth isLoading={loading} setLoading={setLoading} />
              <Separator/>
              <Input
disabled ={loading}
id="firstName"
label="Name"
name="firstName"
type="text"
placeholder= "John Smith"
error={errors?.firstName?.message}
{...register("firstName")}
className="text-sm border dark: border-gray-800 dark: bg-transparent dark: placeholder: text-gray-700 dark: text-gray-400 dark: outline-none"
/>
<Input
disabled= {loading}
id="email"
label="Email"
type ="email"
placeholder="you@example.com" error={errors.email?.message} {...register("email")}
className = "text-sm border dark: border-gray-800 dark: bg-transparent dark: placeholder: text-gray-700 dark: text-gray-400 dark: outline-none"
/>



<Input
disabled={loading}
id="password"
label="Password"
type="password"
placeholder="Your password"
error={errors.password?.message}
{...register("password")}
className="text-sm border dark: border-gray-800 dark: bg-transparent dark: placeholder: text-gray-700 dark: text-gray-400 dark: outline-none"
/>





             
            </div>

            <Button
type="submit"
className="w-full bg-violet-800"
disabled={loading}
>
{loading ? <span className="text-2xl text-white animate-spin">⏳</span> : "Create an account"}

</Button>


          </form>
        </CardContent>
        
<CardFooter className="justify-center gap-2">
<p className="text-sm text-gray-600">Already have an account?</p>
 <Link
to= "/sign-in"
className="text-sm font-semibold text-violet-600 hover:underline"
>
Sign in </Link>
</CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
