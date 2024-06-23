import { logOut } from "@/actions/logout";

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const onClick = async () => {
    await logOut();
  };

  return (
    <button className="cursor-pointer" onClick={onClick}>
      {children}{" "}
    </button>
  );
};
