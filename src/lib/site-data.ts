export const places=["Ajanta","Ellora","Ghrishneshwar","Trimbakeshwar","Bhimashankar"] as const;

export const siteData={
  name:"Kaaveri Tours and Travels",
  origin:"https://www.kaaveritoursandtravels.com",
  address:"Shop No. 1, Jeevan Sneha Apartment, New SBH Colony, Jyoti Nagar, Near AMC Water Tank, Chhatrapati Sambhajinagar.",
  phone:"+91 92727 27216",
  secondaryPhone:"+91 86003 20320",
  email:"pratikvarghude72.pv@gmail.com",
  services:["tourism travel enquiries","one-way travel enquiries","corporate transportation enquiries"] as const,
  destinations:places
} as const;
