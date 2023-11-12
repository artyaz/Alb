'use client';

import React, { useState, useEffect } from 'react';
import { firestore } from '../../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ListingCard } from "./ListingCard";

export function ListingScroll() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const querySnapshot = await getDocs(collection(firestore, "listings"));
      const listingsArray: Listing[] = [];
      querySnapshot.forEach((doc) => {
        listingsArray.push({ ...doc.data() as Listing, id: doc.id });

      });
      setListings(listingsArray);
    };

    fetchListings();
  }, []);

  return (
    <div className="w-full p-4">
      <h1 className="mb-5">Welcome</h1>
      <ScrollArea className="whitespace-nowrap">
        <div className="flex space-x-4">
          {listings.map(listing => <ListingCard key={listing.id} data={listing} />)}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
