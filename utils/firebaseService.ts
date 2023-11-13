'use client';

import React, { useState, useEffect } from 'react';
import { firestore } from './firebaseConfig';
import { CollectionReference, Query, collection, getDocs, query, where } from 'firebase/firestore';

export type FirestoreOperator = '<' | '<=' | '==' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any';

export interface Filter {
    operator: FirestoreOperator;
    value: any;
    target: string;
}

const filter: Filter = {
    operator: ">=",
    value: 59,
    target: "price"
};

const filter2: Filter = {
    operator: "array-contains",
    value: "cozy",
    target: "tags"
};


export async function applyFilter(filters: Filter[]) {
    const listingsRef = collection(firestore, "listings");
    let q = query(listingsRef);

    filters.forEach(filter => {
        q = query(q, where(filter.target, filter.operator, filter.value));
    });

    const listingsArray: Listing[] = await fetchListings(q);
    
    return listingsArray;
}

async function fetchListings(listingsRef: Query): Promise<Listing[]> {
    const listingsArray: Listing[] = [];
    const querySnapshot = await getDocs(listingsRef);

    querySnapshot.forEach((doc) => {
        listingsArray.push({ ...doc.data(), id: doc.id } as Listing);
    });

    return listingsArray;
}
