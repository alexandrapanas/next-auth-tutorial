import { db } from "@/lib/db";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  // const user = await db.user
  return (
    <div className="flex h-full items-center justify-center bg-sky-500">
      {children}{" "}
    </div>
  );
};

export default AuthLayout;
