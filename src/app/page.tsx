'use client';

import React, { useState } from 'react';
import { ResumeEditor } from '@/components/resume-editor';
import { ResumePreview } from '@/components/resume-preview';
import { Header } from '@/components/header';
import { type Resume } from '@/lib/types';

const initialResumeData: Resume = {
  contact: {
    name: 'John A. Doe',
    email: 'john.doe@email.com',
    phone: '(123) 456-7890',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    location: 'San Francisco, CA'
  },
  summary: 'Detail-oriented and results-driven Software Engineer with over 5 years of experience in designing, developing, and implementing innovative software solutions. Proficient in multiple programming languages and modern web technologies. Seeking to leverage expertise in a challenging role at a growth-oriented company.',
  experience: [
    {
      company: 'FutureTech Solutions',
      role: 'Senior Software Engineer',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: '- Lead the development of a new client-facing analytics dashboard using React and D3.js, resulting in a 25% increase in user engagement.\n- Mentored junior engineers, fostering a culture of collaboration and continuous learning.\n- Optimized application performance by 40% through code refactoring and database query improvements.',
    },
    {
      company: 'Data Systems Inc.',
      role: 'Software Engineer',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      description: '- Contributed to a large-scale enterprise application using Java and Spring Boot.\n- Developed RESTful APIs to support new product features.\n- Worked in an Agile environment, participating in daily stand-ups, sprint planning, and retrospectives.',
    },
  ],
  education: [
    {
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      startDate: 'Sep 2014',
      endDate: 'May 2018',
      description: 'Graduated Magna Cum Laude. Member of the University Coding Club.',
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'Java', 'Spring Boot', 'Python', 'SQL', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git'],
  projects: [
    {
      name: 'E-commerce Platform',
      description: 'A full-stack e-commerce website featuring product catalog, shopping cart, and payment integration with Stripe. Built with the MERN stack.',
      url: 'github.com/johndoe/e-commerce',
    },
    {
      name: 'Task Management App',
      description: 'A responsive task management application to help users organize their daily tasks. Built with Next.js and Firebase.',
      url: 'github.com/johndoe/task-app',
    },
  ],
};


export default function Home() {
  const [resumeData, setResumeData] = useState<Resume>(initialResumeData);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header resume={resumeData} />
      <main className="flex-1 container mx-auto p-4 md:p-8 grid md:grid-cols-2 gap-8 items-start">
        <ResumeEditor resume={resumeData} onUpdate={setResumeData} />
        <ResumePreview resume={resumeData} />
      </main>
    </div>
  );
}
