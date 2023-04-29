import { SignIn } from "@clerk/nextjs/app-beta";

export default function Page() {
  return <SignIn 
  appearance={{
    elements: {
      rootBox:"m-auto mt-40"
    }
  }} signUpUrl="/sign-up" />;
}
