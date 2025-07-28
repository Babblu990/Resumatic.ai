
'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { InteractiveBackground } from '@/components/interactive-background';
import { useAuthState } from 'react-firebase-hooks/auth';

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M21.35 11.1h-9.35v2.55h5.49c-.22 1.45-1.24 2.68-2.73 3.56v2.18h3.35c1.96-1.81 3.08-4.57 3.08-7.29s0-1.02-.14-2z"
      ></path>
      <path
        fill="currentColor"
        d="M12 22c2.98 0 5.46-1 7.2-2.65l-3.35-2.18c-.99.66-2.25 1.06-3.85 1.06-2.95 0-5.45-1.99-6.34-4.66H2.25v2.28C4.03 19.92 7.74 22 12 22z"
      ></path>
      <path
        fill="currentColor"
        d="M5.66 14.22a6.47 6.47 0 0 1-.2-2.22c0-.79.12-1.55.33-2.28L2.25 7.44A10.99 10.99 0 0 0 1 12c0 1.94.53 3.75 1.44 5.34l3.22-2.12z"
      ></path>
      <path
        fill="currentColor"
        d="M12 5.25c1.62 0 3.05.56 4.18 1.59l2.84-2.84A10.93 10.93 0 0 0 12 2a11.01 11.01 0 0 0-9.75 5.44l3.41 2.28C6.55 7.24 8.95 5.25 12 5.25z"
      ></path>
    </svg>
  );
}

function LoginPageContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(true); // Start true to check for redirect result
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const auth = getAuth(app);
  const [user, userLoading] = useAuthState(auth);

  const handleAuthError = useCallback((error: any) => {
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
        case 'auth/configuration-not-found':
            errorMessage = 'Firebase Email/Password sign-in not enabled. Please enable it in the Firebase console.'
            break;
        case 'auth/popup-closed-by-user':
             errorMessage = 'Sign-in process was cancelled.';
             break;
        default:
            errorMessage = error.message;
            break;
    }
    toast({ title: 'Authentication Failed', description: errorMessage, variant: 'destructive' });
    console.error("Authentication error:", error);
  }, [toast]);
  
  // This effect runs once on mount to handle the redirect result from Google
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User successfully signed in via redirect.
          // The useAuthState hook will pick up the new user session.
          toast({ title: "Success", description: "Logged in successfully!" });
        }
        // Whether there was a result or not, we can stop the Google loading indicator.
        setIsGoogleLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        handleAuthError(error);
        setIsGoogleLoading(false);
      });
  }, [auth, handleAuthError, toast]);
  
  // This effect redirects the user if they are logged in
  useEffect(() => {
      if (!userLoading && user) {
          router.push('/welcome');
      }
  }, [user, userLoading, router]);


  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'signup') {
      setMode('signup');
    } else {
      setMode('login');
    }
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      // The page will redirect away, no further code will execute.
    } catch (error: any) {
        handleAuthError(error)
        setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        // The useAuthState hook will handle the redirect
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: "Success", description: "Account created! Please log in." });
        setMode('login');
        router.replace('/login'); // To clear the query param
      }
    } catch (error: any) {
        handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    const newPath = newMode === 'signup' ? '/login?mode=signup' : '/login';
    router.replace(newPath, { scroll: false });
  }

  // Show a loading screen while checking for redirect or if user state is loading
  if (isGoogleLoading || userLoading) {
     return (
      <InteractiveBackground>
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-primary-foreground">
             <Loader2 className="h-12 w-12 animate-spin" />
             <p>Please wait...</p>
          </div>
        </div>
      </InteractiveBackground>
    );
  }

  // If user is already logged in, they will be redirected by the useEffect. 
  // We can return null here to avoid flashing the login form.
  if (user) {
    return null;
  }

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
                  disabled={isGoogleLoading}
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
                  disabled={isGoogleLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : (mode === 'login' ? 'Log In' : 'Sign Up')}
              </Button>
            </form>
             <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading || isGoogleLoading}>
                {isGoogleLoading ? <Loader2 className="animate-spin" /> : <><GoogleIcon /> Sign in with Google</>}
            </Button>

            <div className="mt-4 text-center text-sm">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <Button variant="link" className="p-0 h-auto" onClick={() => handleModeChange(mode === 'login' ? 'signup' : 'login')}>
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </InteractiveBackground>
  );
}


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  )
}
