import { db } from "@/lib/db";

export const get2FactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFAToken.findUnique({
      where: {
        token,
      },
    });

    return twoFactorToken;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const get2FactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFAToken.findFirst({
      where: {
        email,
      },
    });

    return twoFactorToken;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
