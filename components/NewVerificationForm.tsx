"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./CardWrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { verifyToken } from "@/actions/verify-token";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";

export const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) return;
    if (!token) {
      setError("Missing token");
      return;
    }

    try {
      const verification = await verifyToken(token);
      console.log({ verification });
      setSuccess(verification?.success);
      setError(verification?.error);
    } catch (error) {
      setError("Something went wrong");
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backbuttonHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        {!success && !error && <BeatLoader />}
        {success && <FormSuccess message={success} />}
        {error && !success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
