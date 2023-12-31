'use client';

import React, { useState, useEffect } from 'react';
import { firestore } from '../../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ListingCard } from "./ListingCard";
import { Label } from '@radix-ui/react-label';
import { applyFilter, Filter } from '../../utils/firebaseService';

interface topic {
  name: string;
  filter: Filter;
}

export async function ListingScroll({filter, name}: topic) {

  const filtersArray: Filter[] = [filter]

  const listingsArray: Listing[] = await applyFilter(filtersArray);

  return (
    <div className="w-full md:p-4 space-y-5">
      <Label className="mb-5 text-4xl font-medium">{name}</Label>
        <div className="md:flex md:flex-wrap justify-between md:grid-cols-3">
          {listingsArray.map(listing => <ListingCard key={listing.id} data={listing}/>)}
        </div>
    </div>
  );
}
