import React from 'react';

import { Card, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface ListingCardProps {
  data: Listing;
}

export function ListingCard({ data }: ListingCardProps) {

  return (
    <div className="sm:w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[350px]">
    <a href={`/listing/find?id=${data.id}`} className="w-full">
    <Card className='mt-5'>
      <CardContent className="p-0">
        <img 
          className="w-full rounded-t-md max-h-[200px] object-cover"
          src={data.image}
          alt="Listing"
        />
      </CardContent>
      <CardFooter className="flex-col justify-between p-5 items-start">
        <Label className="font-medium mb-2 text-lg">{data.location}</Label>
        <CardDescription className="mb-2 line-clamp-1 max-w-[190px]">{data.description}</CardDescription>
        <Label className="font-medium">${data.price} per night</Label>
      </CardFooter>
    </Card>
    </a>
    </div>
  );
}
