"use client";

import { firestore } from "../../../utils/firebaseConfig"; // Update the path according to your project structure
import { collection, addDoc } from "firebase/firestore";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const formSchema = z.object({
    location: z.string(),
    description: z.string(),
    image: z.string().url({ message: "Please enter a valid URL" }),
    price: z.string(),
    tags: z.array(z.string()).optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const finalData = {
      ...data,
      tags: selectedTags,
    };

    try {
      // Add the form data to the listings collection
      await addDoc(collection(firestore, "listings"), finalData);
      alert("Listing added successfully"); // Notify the user (optional)
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("Failed to add listing"); // Notify the user about the error (optional)
    }
  };

  const tags = [
    { label: "Cozy", value: "cozy" },
    { label: "Luxary", value: "luxary" },
    { label: "Rooms", value: "rooms" },
    { label: "Farms", value: "farms" },
    { label: "Cheap", value: "cheap" },
    { label: "Big", value: "big" },
    { label: "Creative spaces", value: "creative spaces" },
    { label: "Lake", value: "lake" },
    { label: "Islands", value: "islands" },
  ] as const;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    // Initialize selectedTags with the form's default values
    setSelectedTags(form.getValues("tags") || []);
  }, []);

  return (
    <main className="lg:p-15 sm:p-10 items-center w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border-0 sm:border-[1px]">
            <CardHeader>
              <CardTitle>Create new listing</CardTitle>
              <CardDescription>Add a new listing to rent</CardDescription>
            </CardHeader>
            <CardContent className=" lg:flex lg:flex-row justify-between">
              <div className="flex flex-col space-y-5">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="lg:w-[400px] md:w-full"
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
                        className="lg:w-[400px] md:w-full"
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
                        className="lg:w-[400px] md:w-full"
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
              </div>

              <div className="flex flex-col space-y-7 w-full lg:ml-10">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="h-[160px] pt-1 leading-tight"
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
                name="tags"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tags</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("justify-between w-[200px]")}
                          >
                            {field.value && field.value.length > 0
                              ? field.value
                                  .map(
                                    (val) =>
                                      tags.find((tag) => tag.value === val)
                                        ?.label
                                  )
                                  .join(", ")
                              : "Select tags"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {tags.map((tag) => (
                              <CommandItem
                                value={tag.label}
                                key={tag.value}
                                onSelect={() => {
                                  console.log(
                                    "selected tags: " + selectedTags.length
                                  );
                                  if (selectedTags.includes(tag.value)) {
                                    setSelectedTags(
                                      selectedTags.filter(
                                        (t) => t !== tag.value
                                      )
                                    );
                                  } else {
                                    setSelectedTags([
                                      ...selectedTags,
                                      tag.value,
                                    ]);
                                  }
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedTags.includes(tag.value)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {tag.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Tags help optimize listing search.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
            </CardContent>
            <Separator className=" mb-5" />
            <CardFooter className="flex justify-between">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}
