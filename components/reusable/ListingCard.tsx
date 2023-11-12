import React from 'react';

import { Card, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface ListingCardProps {
  data: Listing;
}

export function ListingCard({ data }: ListingCardProps) {

  return (
    <div className="w-[350px]">
    <a href={`/listing/find?id=${data.id}`} className="w-full">
    <Card>
      <CardContent className="p-0">
        <img 
          className="w-full rounded-t-md max-h-[250px] object-cover"
          src={data.image}
          alt="Listing"
        />
      </CardContent>
      <CardFooter className="flex-col justify-between p-5 items-start">
        <Label className="font-medium mb-2 text-lg">{data.location}</Label>
        <CardDescription className="mb-2">{data.description}</CardDescription>
        <Label className="font-medium">${data.price} per night</Label>
      </CardFooter>
    </Card>
    </a>
    </div>
  );
}
