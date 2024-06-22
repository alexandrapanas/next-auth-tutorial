"use client";

import { useRouter } from "next/navigation";

export const LoginButton = ({
  children,
  mode = "redirect",
}: {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>TODO: modal</span>;
  }

  return <div onClick={onClick}>{children}</div>;
};
