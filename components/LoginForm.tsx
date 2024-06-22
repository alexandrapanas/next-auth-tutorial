"use client";

import { CardWrapper } from "./CardWrapper";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { LoginSchema } from "@/schemas/login";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { logIn } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [show2FA, setShow2FA] = useState(false);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      logIn(values)
        .then((data) => {
          if (data.error) {
            form.reset();
            setError(data?.error);
          }

          if (data.success) {
            form.reset();
            setSuccess(data?.success);
          }

          if (data.twoFactor) {
            setShow2FA(true);
          }
        })
        .catch((error) => {
          console.log({ error });
          setError("Something went wrong");
        });
    });
  };

  const [isPending, startTransition] = useTransition();

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backbuttonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {show2FA && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2 FA Code</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!show2FA && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" disabled={isPending} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          {success && <FormSuccess message={success} />}
          <Button type="submit" className="w-full" disabled={isPending}>
            {show2FA ? " Confirm" : "Log in"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
