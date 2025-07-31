
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ResumeEditor } from '@/components/resume-editor';
import { ResumePreview, resumeToString } from '@/components/resume-preview';
import { Header } from '@/components/header';
import { type Resume } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Loader2, Sparkles } from 'lucide-react';
import { InteractiveBackground } from '@/components/interactive-background';
import { rateResume } from '@/ai/flows/rate-resume';
import { useToast } from '@/hooks/use-toast';

const initialResumeData: Resume = {
  contact: {
    name: 'John Smith',
    email: 'john.smith@workplace.com',
    phone: '(123) 456-7890',
    linkedin: 'linkedin.com/in/johnsmithpro',
    github: 'github.com/johnsmithpro',
    location: 'San Francisco, CA'
  },
  summary: 'Results-driven Senior Software Engineer with over 8 years of experience in designing, developing, and deploying scalable web applications. Proficient in full-stack development with expertise in React, Node.js, and cloud infrastructure. Seeking to leverage my skills to build innovative solutions in a challenging environment.',
  experience: [
    {
        company: 'Tech Solutions Inc.',
        role: 'Senior Software Engineer',
        startDate: 'Jan 2018',
        endDate: 'Present',
        description: '- Led the development of a new microservices architecture, improving system scalability by 40%.\n- Mentored a team of 4 junior engineers, fostering their growth and improving team productivity.\n- Optimized application performance, reducing page load times by 25%.'
    },
    {
        company: 'Web Innovators LLC',
        role: 'Software Engineer',
        startDate: 'Jun 2015',
        endDate: 'Dec 2017',
        description: '- Developed and maintained front-end features for a high-traffic e-commerce platform using React and Redux.\n- Collaborated with cross-functional teams to deliver new product features on a bi-weekly sprint cycle.\n- Contributed to the migration of legacy code to a modern JavaScript stack.'
    }
  ],
  education: [
    {
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      startDate: 'Sep 2011',
      endDate: 'May 2015',
      description: 'Graduated with honors.',
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Agile Methodologies'],
  projects: [
    {
      name: 'Open Source Contribution - React Charts',
      description: 'Contributed features and bug fixes to a popular open-source charting library for React. Added accessibility improvements and new chart types.',
      url: 'github.com/johnsmithpro/react-charts-contribution',
    },
    {
      name: 'Internal Developer Tooling',
      description: 'Built a CLI tool to automate project setup and deployment pipelines, reducing new project setup time by 90%.',
      url: 'internal-tooling-link.com',
    },
  ],
};


// A simple debounce function
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      clearTimeout(timeout);
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
}


export default function EmployeeEditorPage() {
  const [resumeData, setResumeData] = useState<Resume>(initialResumeData);
  const [user, loading, error] = useAuthState(auth);
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [isRating, setIsRating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const debouncedRateResume = useMemo(() => 
    debounce(async (resume: Resume) => {
      setIsRating(true);
      try {
        const result = await rateResume({ resumeText: resumeToString(resume) });
        setResumeScore(result.score);
         toast({
          title: (
            <div className="flex items-center">
              <Sparkles className="mr-2 h-4 w-4 text-accent" />
              AI Feedback
            </div>
          ),
          description: `Score: ${result.score}/100. ${result.feedback}`,
        });
      } catch (e) {
        console.error("Failed to rate resume:", e);
      } finally {
        setIsRating(false);
      }
    }, 2000), // 2-second debounce delay
  [toast]);


  useEffect(() => {
    // Log the state on every render
    console.log(`[EMPLOYEE EDITOR PAGE] Auth state - Loading: ${loading}, User: ${user?.displayName || 'null'}`);

    if (loading) {
      // While loading, we don't know the auth state, so we wait.
      return;
    }
    if (user) {
      // If loading is finished and we have a user, we can run side effects.
      debouncedRateResume(resumeData);
    } else {
       // If loading is finished and we still have no user, redirect to login.
       console.log('[EMPLOYEE EDITOR PAGE] No user found, redirecting to /login.');
      router.push('/login');
    }
  }, [user, loading, router, resumeData, debouncedRateResume]);


  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
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
     return (
      <InteractiveBackground>
        <div className="flex h-screen w-full items-center justify-center text-destructive-foreground">
          <p>Error: {error.message}</p>
        </div>
      </InteractiveBackground>
    );
  }

  if (!user) {
    // This state is handled by the useEffect redirect, so we can return a loader
    // to avoid a flash of the component while redirecting.
    return (
      <InteractiveBackground>
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-foreground" />
        </div>
      </InteractiveBackground>
    );
  }

  return (
    <InteractiveBackground score={resumeScore}>
       {isRating && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary/10 backdrop-blur-sm text-primary-foreground font-medium text-sm py-1 px-3 rounded-full flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            AI is analyzing your resume...
          </div>
        )}
      <div className="flex flex-col min-h-screen">
        <Header resume={resumeData} onLogout={handleLogout} user={user} />
        <main className="flex-1 container mx-auto p-4 md:p-8 grid md:grid-cols-2 gap-8 items-start">
          <ResumeEditor resume={resumeData} onUpdate={setResumeData} showExperience={true} />
          <ResumePreview resume={resumeData} showExperience={true} />
        </main>
      </div>
    </InteractiveBackground>
  );
}
