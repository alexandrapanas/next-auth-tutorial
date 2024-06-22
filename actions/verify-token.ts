"use server";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";
import { error } from "console";

export const verifyToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  console.log({ existingToken });
  if (!existingToken) {
    return { error: "Token does not exist" };
  }

  const isExpired = new Date(existingToken.expires) < new Date();

  if (isExpired) {
    return {
      error: "Token is expired",
    };
  }

  try {
    const existingUser = await getUserByEmail(existingToken.email);
    console.log({ existingToken });

    if (!existingUser) {
      return {
        error: "Email does not exist",
      };
    }

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingUser.email,
      },
    });

    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: "Email verified",
    };
  } catch (error) {
    console.log({ error });
  }
};
