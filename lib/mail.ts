import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Email verification",
      html: `<p>Click <a href="${confirmationLink}">here</a> to confirm email</p>`,
    });
    console.log({ result });
  } catch (error) {
    console.log({ error });
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset password</p>`,
    });
    console.log({ result });
  } catch (error) {
    console.log({ error });
  }
};

export const send2FATokenEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "2FA code",
      html: `<p>Your token: ${token}</p>`,
    });
  } catch (error) {
    console.log({ error });
  }
};
