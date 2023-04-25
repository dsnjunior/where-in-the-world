import { z } from 'zod'

import {
  flags,
  name,
  population,
  region,
  capital
} from './country.schemas'

const countriesSchema = z.array(
  z.object({
    name,
    flags,
    population,
    region,
    capital
  })
)

export async function getCountries() {
  const countries = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital')
    .then((res) => res.json())

  return countriesSchema.safeParse(countries)
}
