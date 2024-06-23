import { UserInfo } from "@/components/UserInfo";
import { getCurrentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await getCurrentUser();
  return <UserInfo user={user} label="Server component" />;
};

export default ServerPage;
