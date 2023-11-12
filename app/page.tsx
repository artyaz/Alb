

import { ListingCard } from '@/components/reusable/ListingCard';
import { ListingScroll } from '@/components/reusable/ListingScroll';
import { useAuth } from '@/utils/userAuth';
import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 items-start p-5 pt-10">
      <ListingScroll />
    </main>
  )
}
