"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  AuthCredentialsValidatorRegister,
  TAuthCredentialsValidatorRegister,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidatorRegister>({
    resolver: zodResolver(AuthCredentialsValidatorRegister),
  });

  const router = useRouter();

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email is already in use. Sign in instead?");

        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);

        return;
      }

      toast.error("Something went wrong. Please try again.");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`);
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  const onSubmit = ({
    email,
    password,
    name,
    number,
    role,
  }: TAuthCredentialsValidatorRegister) => {
    // console.log("handle submit data : ", email, password, name, number, role);
    mutate({ email, password, name, number, role });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-in"
            >
              Already have an account? Sign-in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    {...register("name")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.name,
                    })}
                    placeholder="Rohit"
                  />
                  {errors?.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="number">Phone Number</Label>
                  <Input
                    {...register("number")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.number,
                    })}
                    placeholder="7878776207"
                  />
                  {errors?.number && (
                    <p className="text-sm text-red-500">
                      {errors.number.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <Label>Role</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <Input
                        type="radio"
                        id="buyer"
                        value="buyer"
                        {...register("role")}
                        className="focus-visible:ring-red-500 mr-2"
                      />
                      <Label htmlFor="buyer">Buyer</Label>
                    </div>
                    <div className="flex items-center">
                      <Input
                        type="radio"
                        id="seller"
                        value="seller"
                        {...register("role")}
                        className="focus-visible:ring-red-500 mr-2"
                      />
                      <Label htmlFor="seller">Seller</Label>
                    </div>
                  </div>
                  {errors?.role && (
                    <p className="text-sm text-red-500">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <Button>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
