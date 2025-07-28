
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Briefcase, GraduationCap } from 'lucide-react';
import { InteractiveBackground } from '@/components/interactive-background';

export default function WelcomePage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSelection = (role: 'student' | 'employee') => {
    // For now, we just redirect. In the future, this could be saved to a user profile.
    console.log(`User selected role: ${role}`);
    router.push('/');
  };

  if (loading) {
    return (
      <InteractiveBackground>
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-foreground" />
        </div>
      </InteractiveBackground>
    );
  }

  if (error) {
    return <div><p>Error: {error.message}</p></div>;
  }
  
  if (!user) {
    return null; // Should be redirected
  }

  return (
    <InteractiveBackground>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-center">Welcome to Resumatic.ai!</CardTitle>
            <CardDescription className="text-center">To help us tailor your experience, please select your current status.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button size="lg" className="h-16 text-lg" onClick={() => handleSelection('student')}>
              <GraduationCap className="mr-4 h-6 w-6" />
              I am a Student
            </Button>
            <Button size="lg" className="h-16 text-lg" onClick={() => handleSelection('employee')}>
              <Briefcase className="mr-4 h-6 w-6" />
              I am an Employee
            </Button>
          </CardContent>
        </Card>
      </div>
    </InteractiveBackground>
  );
}
