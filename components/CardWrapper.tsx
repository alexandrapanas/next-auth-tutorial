"use client";

import { BackButton } from "./BackButton";
import { Social } from "./Social";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backbuttonHref,
  showSocial,
}: {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backbuttonHref: string;
  showSocial?: boolean;
}) => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <h1 className="text-4xl">{headerLabel}</h1>
      </CardHeader>{" "}
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backbuttonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
