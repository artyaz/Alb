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
import { createUserWithEmailAndPassword } from "firebase/auth";
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
import Link from "next/link";
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
      console.log("User created successafassfully:");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      console.log("User created successfully:", user);
      window.location.href = '/';
      // Additional actions after user creation
    } catch (error) {
      console.error("Error creating user:", error);

      // Check if the error code is 'auth/email-already-in-use'
      if (
        isFirebaseError(error) &&
        error.code === "auth/email-already-in-use"
      ) {
        // Set the error message for the email field
        form.setError("email", {
          type: "manual",
          message:
            "This email is already in use. Please use a different email.",
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
    <main className="flex min-h-screen flex-col md:p-24 items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="w-screen md:w-[450px] border-0 md:border[1px]">
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Create new ALB account
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
              <Button type="submit">Sign up</Button>
              <Button variant="outline"><Link href="/login">Login</Link></Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}
