type City = {
  id: string;
  name: string;
  countryId?: string;
  country?: Country;
  centers?: Center[];
};
