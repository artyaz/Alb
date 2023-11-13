"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/utils/userAuth";
import { Separator } from "@/components/ui/separator";

// Define the form schema with zod
const formSchema = z.object({
  email: z.string().email({ message: "Please, use valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});


// Define the form data type based on the schema
type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("Attempting user login:");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      console.log("User logged in successfully:", user);
      window.location.href = '/';
      // Additional actions after user login
    } catch (error) {
      console.error("Error logging in user:", error);

      // Check if the error code is 'auth/user-not-found' or 'auth/wrong-password'
      if (
        isFirebaseError(error) &&
        (error.code === "auth/user-not-found" || error.code === "auth/wrong-password")
      ) {
        // Set the error message for the email or password field
        form.setError("email", {
          type: "manual",
          message:
            "Invalid email or password. Please try again.",
        });
      } else {
        // Handle other types of errors here
        // For example, show a general error message
      }
    }
  };


  function isFirebaseError(error: unknown): error is { code: string } {
    return typeof error === "object" && error !== null && "code" in error;
  }

  return (
    <main className="flex min-h-screen flex-col sm:p-24 items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="w-screen sm:w-[450px] border-0 sm:border-[1px] shadow-none sm:shadow-sm">
            <CardHeader>
              <CardTitle>Log-in</CardTitle>
              <CardDescription>
                Log in into your ALB account using credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="md:w-[400px]"
                        placeholder="email@example.com"
                      />
                    </FormControl>
                    <FormDescription>
                      Your email will stay private within your account.
                    </FormDescription>
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
                        {...field}
                        type="password"
                        className="md:w-[400px]"
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormDescription>Please, keep it safe.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <Separator className="mb-5"/>
            <CardFooter className="flex justify-between">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}
