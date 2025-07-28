
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { InteractiveBackground } from '@/components/interactive-background';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Success", description: "Logged in successfully!" });
        router.push('/welcome');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: "Success", description: "Account created! Please log in." });
        setMode('login');
      }
    } catch (error: any) {
        let errorMessage = 'An unexpected error occurred.';
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email. Please sign up.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password. Please try again.';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already in use. Please log in.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password should be at least 6 characters.';
                break;
            default:
                errorMessage = error.message;
                break;
        }
      toast({ title: 'Authentication Failed', description: errorMessage, variant: 'destructive' });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InteractiveBackground>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary-foreground" />
          <h1 className="text-xl md:text-2xl font-bold text-primary-foreground font-headline">Resumatic.ai</h1>
        </div>
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">{mode === 'login' ? 'Welcome Back' : 'Create an Account'}</CardTitle>
            <CardDescription>{mode === 'login' ? 'Enter your credentials to access your account.' : 'Create an account to get started.'}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Must be at least 6 characters' : undefined}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : (mode === 'login' ? 'Log In' : 'Sign Up')}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <Button variant="link" className="p-0 h-auto" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </InteractiveBackground>
  );
}
