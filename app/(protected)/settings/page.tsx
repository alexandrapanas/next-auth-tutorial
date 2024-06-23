"use client";
import { logOut } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const SettingsPage = () => {
  const signOut = () => {
    console.log("settings page sign out");
    logOut();
  };

  const user = useCurrentUser();
  return (
    <div>
      <button
        type="submit"
        className="bg-white px-6 py-4 mx-auto rounded"
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default SettingsPage;
