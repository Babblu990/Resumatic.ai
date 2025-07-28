
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, Lightbulb, FileCheck, Download, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { InteractiveBackground } from '@/components/interactive-background';

export default function LandingPage() {
  return (
    <InteractiveBackground>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-8 border-b bg-background/80 backdrop-blur-sm shadow-sm">
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
          <section>
            <div className="container mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 items-center gap-12">
              <div className="flex flex-col items-start text-left text-primary-foreground">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 font-headline">
                  Create Job-Winning Resumes in Minutes with AI
                </h1>
                <p className="text-lg mb-8">
                  Build Your Resume
                </p>
                <Button size="lg" asChild>
                  <Link href="/editor">Build Your Resume Now</Link>
                </Button>
              </div>
              <div>
                  <Image 
                      src="https://storage.googleapis.com/aai-web-samples/app-prototyping/ask-ai-anything/image-1721723528236.png"
                      alt="AI Resume Builder Illustration"
                      width={600}
                      height={400}
                      className="rounded-lg shadow-2xl"
                      data-ai-hint="professional resume"
                  />
              </div>
            </div>
          </section>

          {/* Key Features Section */}
          <section className="py-16 md:py-24 bg-card/50">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-foreground mb-12 font-headline">
                Key Features
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">AI Writing Assistance</h3>
                  <p className="text-muted-foreground">
                    Generate professional content tailored to your experience.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <FileCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">ATS-Optimized Templates</h3>
                  <p className="text-muted-foreground">
                    Choose from templates designed to pass applicant tracking systems.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <Download className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">One-Click Download</h3>
                  <p className="text-muted-foreground">
                    Export your resume in multiple formats with ease.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-primary-foreground mb-12 font-headline">
                What Our Users Are Saying
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card/70">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src="https://placehold.co/48x48.png" alt="Jane D." data-ai-hint="woman person" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">Jane D.</p>
                        <div className="flex text-yellow-500">
                          <Star className="h-5 w-5 fill-current" />
                          <Star className="h-5 w-5 fill-current" />
                          <Star className="h-5 w-5 fill-current" />
                          <Star className="h-5 w-5 fill-current" />
                          <Star className="h-5 w-5 fill-current" />
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">
                      "A fantastic tool that made resume building a breeze! Highly recommended."
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/70">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src="https://placehold.co/48x48.png" alt="John S." data-ai-hint="man person" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">John S.</p>
                        <div className="flex text-yellow-500">
                          <Star className="h-5 w-5 fill-current" />
                          <Star className="h-5 w-5 fill-current" />
                          <Star className="h-5 w-5 fill-current" />
                          <Star className="h-5 w-5 fill-current" />
                          <Star className="h-5 w-5 fill-current" />
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">
                      "This AI builder helped me create a perfect resume in no time."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-primary/10 text-primary-foreground py-8">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; {new Date().getFullYear()} Resumatic.ai. All rights reserved.</p>
            </div>
        </footer>
      </div>
    </InteractiveBackground>
  );
}
