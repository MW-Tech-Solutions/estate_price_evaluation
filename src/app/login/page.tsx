import { LoginForm } from '@/components/login-form';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
            <div className="mb-8 flex justify-center">
                <Logo />
            </div>
            <LoginForm />
        </div>
    </div>
  );
}
