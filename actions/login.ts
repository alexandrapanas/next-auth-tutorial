"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas/login";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { send2FATokenEmail, sendVerificationEmail } from "@/lib/mail";
import { get2FactorTokenByEmail } from "@/data/twoFactorToken";
import { db } from "@/lib/db";
import { get2FactorConfirmationByUserId } from "@/data/twoFactorConfirmation";

export const logIn = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "Email does not exist",
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success: "Confirmation email sent",
    };
  }
  // 2 FA
  if (existingUser.is2FAEnabled && existingUser.email) {
    if (code) {
      const existing2FAToken = await get2FactorTokenByEmail(email);

      if (!existing2FAToken || existing2FAToken.token !== code) {
        return {
          error: "Invalid code",
        };
      }

      const isExpired = new Date(existing2FAToken.expires) < new Date();

      if (isExpired) {
        return {
          error: "Token is expired",
        };
      }

      await db.twoFAToken.delete({
        where: {
          id: existing2FAToken.id,
        },
      });

      const existingConfirmation = await get2FactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(email);
      await send2FATokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Login successful" };
  } catch (error) {
    console.log({ "logIn Error": error });
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials", success: "" };
        default:
          return { error: "Something went wrong", success: "" };
      }
    }
    throw error;
  }
};
