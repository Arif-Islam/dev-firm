interface clientType {
  id: number;
  name: string;
}

interface tripType {
  id: number;
  name: string;
  reservation: string;
}

interface productType {
  name: string;
  price: number;
}

interface productsType {
  id: number;
  type: string;
  tva: number;
  product: productType[];
}

export const client: clientType[] = [
  {
    id: 1,
    name: "John Smith",
  },
  {
    id: 2,
    name: "Matilda Russie",
  },
  {
    id: 3,
    name: "Warren Buffet",
  },
  {
    id: 1,
    name: "Khalid Farhan",
  },
  {
    id: 1,
    name: "Tanzim Sakib",
  },
];

export const trip: tripType[] = [
  {
    id: 1,
    name: "T2390",
    reservation: "R2390",
  },
  {
    id: 2,
    name: "T2490",
    reservation: "R2490",
  },
  {
    id: 3,
    name: "T2493",
    reservation: "R2493",
  },
  {
    id: 1,
    name: "T2590",
    reservation: "R2590",
  },
  {
    id: 1,
    name: "T3490",
    reservation: "R3490",
  },
];

export const products: productsType[] = [
  {
    id: 1,
    type: "Plane",
    tva: 2800,
    product: [
      {
        name: "Falcon885X TBA/LTI",
        price: 11500,
      },
      {
        name: "Falcon8X TBA/LTI",
        price: 9000,
      },
      {
        name: "Falcon998X TBA/LTI",
        price: 12500,
      },
      {
        name: "Falcon1428X TBA/LTI",
        price: 9500,
      },
      {
        name: "Falcon6558X TBA/LTI",
        price: 13500,
      },
    ],
  },
  {
    id: 2,
    type: "Ship",
    tva: 2800,
    product: [
      {
        name: "Mayflower",
        price: 5900,
      },
      {
        name: "Santa Maria",
        price: 5500,
      },
      {
        name: "Queen Mary",
        price: 7500,
      },
      {
        name: "Cutty Sark",
        price: 3300,
      },
    ],
  },
];
