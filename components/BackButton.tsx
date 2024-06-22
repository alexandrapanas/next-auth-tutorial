import Link from "next/link";
import { Button } from "./ui/button";

export const BackButton = ({
  label,
  href,
}: {
  label: string;
  href: string;
}) => {
  return (
    <Button variant="link" asChild size="sm" className="font-normal w-full">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
