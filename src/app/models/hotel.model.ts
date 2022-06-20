export interface IHotel {
  id?: number;
  title: string;
  address: {
    label: string;
    countryCode: string;
    countryName: string;
    stateCode: string;
    state: string;
    countyCode: string;
    county: string;
    city: string;
    district: string;
    street: string;
    postalCode: number;
    houseNumber: number;
  };
  position: {
    lat: number;
    lng: number;
  };
  distance: number;
  active?: boolean;
}
