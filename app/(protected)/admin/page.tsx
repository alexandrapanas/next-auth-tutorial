"use client";

import { showRole } from "@/actions/amin";
import { FormSuccess } from "@/components/FormSuccess";
import { RoleGate } from "@/components/RoleGate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onApiRouteClick = async () => {
    const response = await fetch("/api/admin");
    if (!response.ok) {
      toast.error("Forbidden route");
    } else {
      toast.success("OK");
    }
  };

  const onServerActionClick = async () => {
    const response = await showRole();

    if (response.error) {
      toast.error(response.error);
    }

    if (response.success) {
      toast.success(response.success);
    }
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="font-semibold text-2xl text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API route</p>
          <Button onClick={onApiRouteClick}>Click to test </Button>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only server action</p>
          <Button onClick={onServerActionClick}>Click to test </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
