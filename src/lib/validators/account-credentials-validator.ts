import { z } from "zod"

export const AuthCredentialsValidatorRegister = z.object({
  name: z.string().min(5, {
    message: 'Name must be at least 5 characters long.',
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long.',
  }),
  number: z.string().regex(/^\d{10}$/, {
    message: 'Number must be exactly 10 digits long.',
  }),
})

export type TAuthCredentialsValidatorRegister = z.infer<
  typeof AuthCredentialsValidatorRegister
>

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long.',
  }),
})

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>
