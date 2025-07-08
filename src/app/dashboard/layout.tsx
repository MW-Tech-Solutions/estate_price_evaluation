import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const session = cookieStore.get('session');
  let user = null;

  if (session?.value) {
    try {
        const sessionData = JSON.parse(session.value);
        if (sessionData.isLoggedIn) {
            user = { name: sessionData.name, email: sessionData.email };
        }
    } catch (e) {
        console.error("Failed to parse session cookie", e);
    }
  }

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur md:px-6">
        <Logo />
        <UserNav user={user} />
      </header>
        {children}
      <footer className="mt-auto border-t">
        <div className="container mx-auto py-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Property Pilot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
