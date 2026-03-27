import { SignUp } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <SignUp />
      </main>
    </div>
  );
}
