'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { signupAction } from '@/actions/auth.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DotButtonLoader from '@/components/Layout/Loader/DotButtonLoader';

// Validation Schema
const signUpSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters.'),
    email: z.string().email('Invalid email address.'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long.'),
    confirmPassword: z.string(),
    terms: z.boolean().refine((value) => value, 'You must agree to the terms and conditions.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });
  const router = useRouter()
  const {update} = useSession()
  const onSubmit = async(data: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    try {
      const res = await signupAction(data);

      if(res.success){
        toast.success(res.message)
        form.reset();
        await update()
        router.push('/')
      }else{
        toast.error(res.message)
      }

    } catch (error:any) {
      toast.error(error.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className=" bg-white  py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-red-600 mx-auto h-12 w-12 rounded-full flex items-center justify-center">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      {/* Form Section */}
      <div className="md:mt-8 px-3 mt-3 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white md:py-8 py-4 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:space-y-6 space-y-4">
              {/* Username */}
              <FormItem>
                <Label htmlFor="username">Username</Label>
                <FormControl>
                  <Input id="username" {...form.register('username')} />
                </FormControl>
                <FormMessage>{form.formState.errors.username?.message}</FormMessage>
              </FormItem>

              {/* Email */}
              <FormItem>
                <Label htmlFor="email">Email address</Label>
                <FormControl>
                  <Input id="email" {...form.register('email')} />
                </FormControl>
                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
              </FormItem>

              {/* Password */}
              <FormItem>
                <Label htmlFor="password">Password</Label>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...form.register('password')}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
              </FormItem>

              {/* Confirm Password */}
              <FormItem>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...form.register('confirmPassword')}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
              </FormItem>

              {/* Terms and Conditions */}
              <FormItem>
                <div className="flex items-center">
                  <FormControl>
                    <input
                      type="checkbox"
                      id="terms"
                      {...form.register('terms')}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                  </FormControl>
                  <Label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the{' '}
                    <Link href="#" className="text-red-600 hover:text-red-500">
                      Terms and Conditions
                    </Link>
                  </Label>
                </div>
                <FormMessage>{form.formState.errors.terms?.message}</FormMessage>
              </FormItem>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {loading ? <DotButtonLoader  isPrimary={true}/> : "Sign up"}
              </Button>
            </form>
          </Form>

          {/* Footer Section */}
          <div className="mt-6 text-center">
            <Link href="/signin" className="font-medium text-red-600 hover:text-red-500">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
