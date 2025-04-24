'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Validation schema
const registerSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);

    try {
      // Here you would normally call your registration API
      console.log('Registering with:', data);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to login page on success
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      form.setError('root', {
        message: 'Registration failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
          <p className="text-gray-600">Create an account to get started</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      I accept the{' '}
                      <Link href="/terms" className="text-indigo-600 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-indigo-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <div className="text-red-500 text-sm">{form.formState.errors.root.message}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
