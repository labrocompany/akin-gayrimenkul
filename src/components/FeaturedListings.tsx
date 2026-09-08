"use client";

import { useEffect, useState } from "react";
import ListingCard from "@/components/ListingCard";
import { subscribeListings, type ListingRecord } from "@/lib/listingsService";

export default function FeaturedListings() {
  const [listings, setListings] = useState<ListingRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeListings((data) => {
      setListings(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[300px] rounded-2xl bg-cream-dark animate-pulse" />
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return <p className="text-center text-muted py-10">Henüz portföy eklenmedi.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {listings.slice(0, 3).map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
