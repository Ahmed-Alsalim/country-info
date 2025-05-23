export type Country = {
  adminregion: {
    id: string
    iso2code: string
    value: string
  }
  capitalCity: string
  id: string
  incomeLevel: {
    id: string
    iso2code: string
    value: string
  }
  iso2Code: string
  latitude: number
  lendingType: {
    id: string
    iso2code: string
    value: string
  }
  longitude: number
  name: string
  region: {
    id: string
    iso2code: string
    value: string
  }
}
export type WorldBankResponse = [
  {
    page: number
    pages: number
    per_page: number
    total: number
  },
  Country[],
]
