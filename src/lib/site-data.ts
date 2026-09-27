export const places=["Ajanta","Ellora","Ghrishneshwar","Trimbakeshwar","Bhimashankar"] as const;
export type Place=typeof places[number];

export const placeNames:Record<Place,{en:string;mr:string}>={
  Ajanta:{en:"Ajanta",mr:"अजिंठा"},
  Ellora:{en:"Ellora",mr:"वेरूळ"},
  Ghrishneshwar:{en:"Ghrishneshwar",mr:"घृष्णेश्वर"},
  Trimbakeshwar:{en:"Trimbakeshwar",mr:"त्र्यंबकेश्वर"},
  Bhimashankar:{en:"Bhimashankar",mr:"भीमाशंकर"}
};

export const siteData={
  name:"Kaaveri Tours and Travels",
  origin:"https://kaaveritoursandtravels.com",
  address:"Shop No. 1, Jeevan Sneha Apartment, New SBH Colony, Jyoti Nagar, Near AMC Water Tank, Chhatrapati Sambhajinagar.",
  phone:"+91 92727 27216",
  secondaryPhone:"+91 86003 20320",
  email:"pratikvarghude72.pv@gmail.com",
  services:["tourism travel enquiries","one-way travel enquiries","employee transport enquiries"] as const,
  destinations:places
} as const;
