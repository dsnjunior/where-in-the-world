import { z } from 'zod'

export const flags = z.object({
  png: z.string().min(1),
  svg: z.string().min(1),
  alt: z.string()
})

export const name = z.object({
  common: z.string().min(1),
  official: z.string().min(1),
  nativeName: z.record(z.string(), z.object({
    official: z.string().min(1),
    common: z.string().min(1)
  }))
})

export const population = z.number()

export const region = z.string().min(1)

export const capital = z.array(z.string())
