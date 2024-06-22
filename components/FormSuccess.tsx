import { CheckCircledIcon } from "@radix-ui/react-icons";

export const FormSuccess = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 text-emerald-500 flex items-center rounded gap-x-4 px-4 py-2">
      <CheckCircledIcon />
      {message}
    </div>
  );
};
