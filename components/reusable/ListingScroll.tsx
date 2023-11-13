'use client';

import React, { useState, useEffect } from 'react';
import { firestore } from '../../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ListingCard } from "./ListingCard";
import { Label } from '@radix-ui/react-label';
import { applyFilter } from '../../utils/firebaseService';

interface topic {
  name: string;
}

export async function ListingScroll({name}: topic) {

  const listingsArray: Listing[] = await applyFilter();

  return (
    <div className="w-full p-4 space-y-5">
      <Label className="mb-5 text-4xl font-medium">{name}</Label>
        <div className="flex flex-wrap justify-between grid-cols-3">
          {listingsArray.map(listing => <ListingCard key={listing.id} data={listing}/>)}
        </div>
    </div>
  );
}
