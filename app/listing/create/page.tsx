'use client';

import { firestore } from '../../../utils/firebaseConfig'; // Update the path according to your project structure
import { collection, addDoc } from 'firebase/firestore';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const formSchema = z.object({
    location: z.string(),
    description: z.string(),
    image: z.string().url({ message: "Please enter a valid URL" }),
    price: z.string(),

  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Add the form data to the listings collection
      await addDoc(collection(firestore, 'listings'), data);
      alert('Listing added successfully'); // Notify the user (optional)
    } catch (error) {
      console.error('Error adding listing:', error);
      alert('Failed to add listing'); // Notify the user about the error (optional)
    }
  };


  return (
    <main className="flex min-h-screen flex-col lg:p-24 sm:p-10 items-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-[400px]"
                    placeholder="Nebraska, USA"
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-[400px]"
                    placeholder="https://myhouse.com/image.png"
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per night in USD</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-[400px]"
                    placeholder="500"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-[400px] h-[200px] pt-1 leading-tight"
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
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </main>
  );
}
