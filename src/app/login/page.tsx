"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login - replace with real authentication
    try {
      // Here you would normally call your authentication API
      console.log("Logging in with:", email, password);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home page on success
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Log In</h1>
          <p className="text-gray-600">Welcome back! Please enter your details</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-md"
              required
            />
            <div className="text-right">
              <Link 
                href="/forgot-password" 
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                forgot password?
              </Link>
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
          
          <div className="relative flex items-center justify-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center h-12 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-2">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                Google
              </div>
            </button>
            <button
              type="button"
              className="flex items-center justify-center h-12 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-2">
                  <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#2aa4f4" />
                    <stop offset="1" stopColor="#007ad9" />
                  </linearGradient>
                  <path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z" />
                  <path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z" />
                </svg>
                Facebook
              </div>
            </button>
          </div>
        </form>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 