import { z } from 'zod'

import {
  flags,
  name,
  population,
  region,
  subregion,
  capital,
  tld,
  currencies,
  languages,
  borders,
} from './country.schemas'

const countrySchema = z.object({
  name,
  flags,
  population,
  capital,
  region,
  subregion,
  tld,
  currencies,
  languages,
  borders
})

const borderCountriesSchema = z.array(z.object({
  name
}))

function getBorder(countryCode: string) {
  return fetch(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=name`)
    .then((res) => res.json())
}

function getBordersCommonName(bordersCountryCode: string[]) {
  return Promise.all(bordersCountryCode.map(getBorder))
    .then((borders) => {
      const parsedBorders = borderCountriesSchema.parse(borders)
      return parsedBorders.map((border) => border.name.common)
    })
}

export async function getCountry(name: string) {
  const [country] = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,flags,population,capital,region,subregion,tld,currencies,languages,borders`)
    .then((res) => res.json())

  const countryParsed = countrySchema.parse(country)
  const bordersCommonName = await getBordersCommonName(countryParsed.borders)

  return countrySchema.safeParse({
    ...countryParsed,
    borders: bordersCommonName
  })
}
