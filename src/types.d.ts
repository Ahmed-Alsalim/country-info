export type Country = {
  adminregion: {
    id: string;
    iso2code: string;
    value: string;
  };
  capitalCity: string;
  id: string;
  incomeLevel: {
    id: string;
    iso2code: string;
    value: string;
  };
  iso2Code: string;
  latitude: string;
  lendingType: {
    id: string;
    iso2code: string;
    value: string;
  };
  longitude: string;
  name: string;
  region: {
    id: string;
    iso2code: string;
    value: string;
  };
};
export type WorldBankResponse = [
  {
    page: number;
    pages: number;
    per_page: string;
    total: number;
  },
  Country[],
];
