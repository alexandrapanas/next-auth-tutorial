"use server";

import { getCurrentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const showRole = async () => {
  const role = await getCurrentRole();

  if (role === UserRole.USER) {
    return {
      error: "Forbidden",
    };
  }

  return {
    success: "Allowed",
  };
};
