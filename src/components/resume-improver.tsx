'use client';
import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { improveResume } from '@/ai/flows/improve-resume';
import { type Resume } from '@/lib/types';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Label } from './ui/label';

function resumeToString(resume: Resume): string {
    const experience = resume.experience.map(e => `Company: ${e.company}\nRole: ${e.role}\nDates: ${e.startDate} - ${e.endDate}\nDescription: ${e.description}`).join('\n\n');
    const education = resume.education.map(e => `Institution: ${e.institution}\nDegree: ${e.degree}\nDates: ${e.startDate} - ${e.endDate}\nDescription: ${e.description}`).join('\n\n');
    const projects = resume.projects.map(p => `Project: ${p.name}\nURL: ${p.url}\nDescription: ${p.description}`).join('\n\n');

    return `
# Resume of ${resume.contact.name}

## Contact
Email: ${resume.contact.email}
Phone: ${resume.contact.phone}
LinkedIn: ${resume.contact.linkedin}
GitHub: ${resume.contact.github}
Location: ${resume.contact.location}

## Summary
${resume.summary}

## Skills
${resume.skills.join(', ')}

## Experience
${experience}

## Education
${education}

## Projects
${projects}
    `;
}

export function ResumeImprover({ resume }: { resume: Resume }) {
  const [jobDescription, setJobDescription] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImproveResume = async () => {
    if (!jobDescription) {
      toast({
        title: 'Job description is required',
        description: 'Please paste the job description to get suggestions.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setSuggestions('');
    try {
      const resumeString = resumeToString(resume);
      const result = await improveResume({ jobDescription, resume: resumeString });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred',
        description: 'Failed to get suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-accent/20 border-accent/50 text-accent-foreground hover:bg-accent/30">
          <Sparkles className="mr-2 h-4 w-4 text-accent" />
          Improve with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <span className="font-headline">AI Resume Improver</span>
          </DialogTitle>
          <DialogDescription>
            Paste a job description below and our AI will give you actionable suggestions to tailor your resume.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div>
            <Label htmlFor="job-description" className="text-sm font-medium">Job Description</Label>
            <Textarea
              id="job-description"
              placeholder="Paste job description here..."
              className="mt-2 min-h-[300px] text-xs"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Suggestions</Label>
            <Card className="mt-2">
                <ScrollArea className="h-[300px]">
                    <CardContent className="p-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full pt-28">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : suggestions ? (
                            <div className="text-sm whitespace-pre-wrap prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: suggestions.replace(/\n/g, '<br />').replace(/### (.*)/g, '<h3 class="font-bold my-2">$1</h3>').replace(/## (.*)/g, '<h2 class="font-bold text-lg my-3">$1</h2>').replace(/# (.*)/g, '<h1 class="font-bold text-xl my-4">$1</h1>') }} />
                        ) : (
                            <p className="text-sm text-muted-foreground text-center pt-32">AI suggestions will appear here.</p>
                        )}
                    </CardContent>
                </ScrollArea>
            </Card>
          </div>
        </div>
        <Button onClick={handleImproveResume} disabled={isLoading} className="bg-accent hover:bg-accent/90">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Get Suggestions'
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
