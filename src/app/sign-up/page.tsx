import { SignUp } from "@clerk/nextjs/app-beta";

export default function Page() {
  return <SignUp 
  appearance={{
    elements: {
      rootBox:"m-auto mt-40"
    }
  }} signInUrl="/sign-in" />;
}
