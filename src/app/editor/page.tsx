
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
    name: 'Jane Doe',
    email: 'jane.doe@university.edu',
    phone: '(123) 456-7890',
    linkedin: 'linkedin.com/in/janedoe',
    github: 'github.com/janedoe',
    location: 'New York, NY'
  },
  summary: 'A highly motivated and enthusiastic Computer Science student with a strong foundation in software development and web technologies. Passionate about building intuitive and user-friendly applications. Seeking an internship to apply my skills in a real-world setting.',
  experience: [],
  education: [
    {
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      startDate: 'Sep 2021',
      endDate: 'May 2025',
      description: 'Relevant Coursework: Data Structures, Algorithms, Web Development, Databases. GPA: 3.8/4.0',
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Java', 'SQL', 'Git', 'HTML', 'CSS'],
  projects: [
    {
      name: 'Personal Portfolio Website',
      description: 'Designed and developed a personal portfolio to showcase my projects and skills. Built with Next.js and Tailwind CSS, deployed on Vercel.',
      url: 'github.com/janedoe/portfolio',
    },
    {
      name: 'University Course Scheduler',
      description: 'A web application that helps students plan their course schedules. Features include course search, calendar view, and conflict detection. Built with React and Firebase.',
      url: 'github.com/janedoe/course-scheduler',
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


export default function EditorPage() {
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
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    if (user) { // Only rate if user is logged in
      debouncedRateResume(resumeData);
    }
  }, [resumeData, user, debouncedRateResume]);


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
    // This state is handled by the useEffect redirect, so we can return null 
    // to avoid a flash of the component while redirecting.
    return null;
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
          <ResumeEditor resume={resumeData} onUpdate={setResumeData} showExperience={false} />
          <ResumePreview resume={resumeData} showExperience={false} />
        </main>
      </div>
    </InteractiveBackground>
  );
}
