interface Listing {
    push(arg0: { id: string; image: string; location: string; description: string; price: number; }): unknown;
    id: string;
    image: string;
    location: string;
    description: string;
    price: number;
    owner: string;
  }