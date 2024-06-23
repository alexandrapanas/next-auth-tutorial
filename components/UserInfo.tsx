import { ExtendedUser } from "@/auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
};

export const UserInfo = ({ label, user }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="font-semibold text-2xl text-center">{label} </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="font-mono bg-slate-100">{user?.id}</p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="font-mono bg-slate-100">{user?.email}</p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="font-mono bg-slate-100">{user?.name}</p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="font-mono bg-slate-100">{user?.role}</p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two factor authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "default" : "destructive"}>
            {" "}
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
