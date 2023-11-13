

import { ListingCard } from '@/components/reusable/ListingCard';
import { ListingScroll } from '@/components/reusable/ListingScroll';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/utils/userAuth';
import React from 'react';

export default function Home() {
  const categories = ['Popular', 'Featured', 'Less than $200', 'Luxury'];

  return (
    <main className="flex min-h-screen flex-col gap-4 items-start p-5 pt-10">
      {categories.map((category, index) => (
        <React.Fragment key={index}>
          <ListingScroll name={category} />
          {index < categories.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </main>
  );
}

