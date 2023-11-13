

import { ListingCard } from '@/components/reusable/ListingCard';
import { ListingScroll } from '@/components/reusable/ListingScroll';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/utils/userAuth';
import React from 'react';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col gap-4 items-start p-5 pt-10">
          <ListingScroll filter={{operator: "array-contains", value: 'cozy', target: "tags"}} name='Cozy' />
          <ListingScroll filter={{operator: "array-contains", value: 'luxary', target: "tags"}} name='Luxary' />
          <ListingScroll filter={{operator: "<", value: 90, target: "price"}} name='Less than $90' />
          <ListingScroll filter={{operator: "array-contains", value: 'creative spaces', target: "tags"}} name='Creative spaces' />
    </main>
  );
}

