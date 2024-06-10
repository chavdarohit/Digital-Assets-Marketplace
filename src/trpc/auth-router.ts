import { AuthCredentialsValidator, AuthCredentialsValidatorRegister} from '../lib/validators/account-credentials-validator'
import { publicProcedure, router } from './trpc'
import { getPayloadClient } from '../get-payload'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidatorRegister)
    .mutation(async ({ input }) => {
      console.log("under auth router input : ", input);
      const { email, password, name, number, role} = input
      const payload = await getPayloadClient()

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })

      if (users.length !== 0)
        throw new TRPCError({ code: 'CONFLICT' })


      console.log(name, number, email, password)
      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          name,
          number,
          role,
        },
      })

      return { success: true, sentToEmail: email }
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input

      const payload = await getPayloadClient()

      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      })

      if (!isVerified)
        throw new TRPCError({ code: 'UNAUTHORIZED' })

      return { success: true }
    }),

  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input
      const { res } = ctx

      const payload = await getPayloadClient()

      try {
        const t = await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        })

        console.log("res is : ", res, t);

        return { success: true, data:t}
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),
})
