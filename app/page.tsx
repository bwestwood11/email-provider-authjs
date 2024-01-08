import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log("session", session);
  return (
    <main className="flex flex-col space-y-6 items-center justify-center h-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <h2 className="text-white text-4xl font-bold">
        Email Provider Authentication
      </h2>
      <Link href="/sign-in">
        <Button className="" variant="outline" size="lg">
          Sign in with Magic Link
        </Button>
      </Link>
    </main>
  );
}
