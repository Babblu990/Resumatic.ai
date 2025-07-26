'use client';

import React, { useState, useEffect } from 'react';
import { ResumeEditor } from '@/components/resume-editor';
import { ResumePreview } from '@/components/resume-preview';
import { Header } from '@/components/header';
import { type Resume } from '@/lib/types';
import { useRouter } from 'next/navigation';

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


export default function Home() {
  const [resumeData, setResumeData] = useState<Resume>(initialResumeData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you'd check for a token in localStorage or a cookie.
    // For this demo, we'll simulate a logged-out state.
    const loggedIn = typeof window !== 'undefined' ? window.sessionStorage.getItem('isLoggedIn') === 'true' : false;
    if (!loggedIn) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // A simple function to simulate login, called from the login page
  const handleLogin = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('isLoggedIn', 'true');
    }
    router.push('/');
  };
  
  // A simple function to simulate logout
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('isLoggedIn');
    }
    router.push('/login');
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header resume={resumeData} onLogout={handleLogout} />
      <main className="flex-1 container mx-auto p-4 md:p-8 grid md:grid-cols-2 gap-8 items-start">
        <ResumeEditor resume={resumeData} onUpdate={setResumeData} />
        <ResumePreview resume={resumeData} />
      </main>
    </div>
  );
}
