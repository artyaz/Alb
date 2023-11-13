"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { Separator } from "@/components/ui/separator";
import { firestore } from "../../../utils/firebaseConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

interface Listing {
  location: string;
  image: string;
  price: string;
  description: string;
}

const ListingPage = () => {
  
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = (dateRange: DateRange) => {
    // Check if both from and to dates are defined
    if (dateRange.from && dateRange.to && listing) {
      const nights = differenceInCalendarDays(dateRange.to, dateRange.from);
      return nights * parseFloat(listing.price);
    }
    return 0;
  };
  
  

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useSearchParams();
  const id = router.get("id");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("button works: " + JSON.stringify(data, null, 2));
  }

  const handleDateChange = (dateRange: DateRange | undefined) => {
    setDate(dateRange);
    if (dateRange?.from && dateRange?.to) {
      form.setValue("dateRange", { from: dateRange.from, to: dateRange.to });
      const newTotalPrice = calculateTotalPrice(dateRange);
      setTotalPrice(newTotalPrice);
    } else {
      setTotalPrice(0); // Reset total price if date range is incomplete
    }
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id !== "string") return; // Ensure id is a string

      const docRef = doc(firestore, "listings", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data() as Listing); // Type assertion here
      } else {
        // Handle the case where the document does not exist
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!listing) {
    return <p>No listing found.</p>;
  }

  return (
    <div className=" space-y-5 lg:flex p-[3%] lg:space-x-5 w-full">
      <div id="details" className=" w-full space-y-7">
        <img
          src={listing.image}
          className=" rounded-[20px] max-h-[400px] w-full object-cover"
        />
        <div className="flex items-center space-x-4 text-sm">
          <Label className=" text-[30px] font-medium pl-3">{listing.location}</Label>
          <Separator orientation="vertical" className=" h-5"/>
          <p className=" text-gray-600">${listing.price} per night</p>
        </div>
        <p className="pl-3">{listing.description}</p>
      </div>
      <Separator className="lg:h-[400px]" orientation="vertical" />
      <div id="action">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 md:min-w-[400px]">
            <Card className=" rounded-[20px]">
              <CardHeader>
                <CardTitle>Rent a property</CardTitle>
                <CardDescription>
                  You can cancel your rent later with up to 80% refund.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Rent range</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")} -{" "}
                                  {format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={handleDateChange} // Use the new handleDateChange function
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select the range of dates for your house rental.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator className="mt-2 mb-2" />
                <Label>Total Price: ${totalPrice.toFixed(2)}</Label>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit">Submit</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ListingPage;
