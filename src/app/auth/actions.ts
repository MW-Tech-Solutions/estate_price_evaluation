'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// In a real app, you'd use a database. This is a temporary in-memory store.
const users: any[] = [];

export async function signup(data: z.infer<typeof signupSchema>) {
  const validatedFields = signupSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  
  const { name, email, password } = validatedFields.data;

  // In a real app, you'd check if the user already exists in the database
  if (users.find(user => user.email === email)) {
      return { error: 'User with this email already exists.' };
  }

  // In a real app, you would hash the password before saving.
  users.push({ name, email, password });
  
  // Create a session cookie
  const sessionData = { name, email, isLoggedIn: true };
  cookies().set('session', JSON.stringify(sessionData), { httpOnly: true, path: '/' });

  redirect('/dashboard');
}

export async function login(data: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  // This is a mock login. In a real app, you would look up the user in a database
  // and verify their password hash.
  const user = users.find(u => u.email === email && u.password === password);
  
  // Add a default user for demonstration purposes
  const isDemoUser = email === 'admin@gmail.com' && password === 'password123';

  if (!user && !isDemoUser) {
    return { error: 'Invalid email or password.' };
  }

  const userData = user || { name: 'Admin', email: 'admin@gmail.com' };

  // Create a session cookie
  const sessionData = { name: userData.name, email: userData.email, isLoggedIn: true };
  cookies().set('session', JSON.stringify(sessionData), { httpOnly: true, path: '/' });

  redirect('/dashboard');
}

export async function logout() {
    cookies().delete('session');
    redirect('/login');
}
