import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const FormError = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 text-destructive flex items-center gap-x-4 rounded px-4 py-2">
      <ExclamationTriangleIcon />

      {message}
    </div>
  );
};
