'use client';

import React, { useState, useEffect } from 'react';
import { firestore } from './firebaseConfig';
import { CollectionReference, Query, collection, getDocs, query, where } from 'firebase/firestore';

type FirestoreOperator = '<' | '<=' | '==' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any';

interface Filter {
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
    operator: "==",
    value: "Stary Majdan, Poland",
    target: "location"
};


export async function applyFilter() {
    const listingsRef = collection(firestore, "listings");
    let q = query(listingsRef);
    q = query(q, where(filter.target, filter.operator, filter.value));
    q = query(q, where(filter2.target, filter2.operator, filter2.value))
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
