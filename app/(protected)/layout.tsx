import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { NavBar } from "./settings/_components/NavBar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="w-full h-full bg-sky-500 flex flex-col gap-y-6 items-center justify-center">
        <NavBar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default Layout;
