
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, Lightbulb, FileCheck, Download, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-8 border-b bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-2 md:gap-4">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-xl md:text-2xl font-bold text-primary font-headline">Resumatic.ai</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/editor">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white">
          <div className="container mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 items-center gap-12">
            <div className="flex flex-col items-start text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-4 font-headline">
                Create Job-Winning Resumes in Minutes with AI
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Build Your Resume
              </p>
              <Button size="lg" asChild>
                <Link href="/editor">Build Your Resume Now</Link>
              </Button>
            </div>
            <div>
                <Image 
                    src="https://placehold.co/600x400.png"
                    alt="AI Resume Builder Illustration"
                    width={600}
                    height={400}
                    className="rounded-lg"
                    data-ai-hint="illustration person laptop"
                />
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-headline">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="p-4 bg-blue-100 rounded-full mb-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Writing Assistance</h3>
                <p className="text-gray-600">
                  Generate professional content tailored to your experience.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-blue-100 rounded-full mb-4">
                  <FileCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ATS-Optimized Templates</h3>
                <p className="text-gray-600">
                  Choose from templates designed to pass applicant tracking systems.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-blue-100 rounded-full mb-4">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">One-Click Download</h3>
                <p className="text-gray-600">
                  Export your resume in multiple formats with ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-headline">
              What Our Users Are Saying
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src="https://placehold.co/48x48.png" alt="Jane D." data-ai-hint="woman person" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Jane D.</p>
                      <div className="flex text-yellow-500">
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "A fantastic tool that made resume building a breeze! Highly recommended."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src="https://placehold.co/48x48.png" alt="John S." data-ai-hint="man person" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">John S.</p>
                      <div className="flex text-yellow-500">
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "This AI builder helped me create a perfect resume in no time."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-6 text-center">
              <p>&copy; {new Date().getFullYear()} Resumatic.ai. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
