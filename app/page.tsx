import { LoginButton } from "@/components/LoginButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-sky-500 flex flex-col justify-center items-center h-full">
      <div className="space-y-6">
        <h1 className="text-white text-2xl">Auth</h1>
        <LoginButton>
          <Button variant="secondary" size="lg">
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
