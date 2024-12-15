import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="wavy1 flex justify-center items-center h-screen">
            <SignIn />
        </div>
    )
}