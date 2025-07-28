
'use client';
import { type Resume } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion } from '@/components/ui/accordion';
import { ScrollArea } from './ui/scroll-area';
import { ContactEditor } from './editor/contact-editor';
import { SummaryEditor } from './editor/summary-editor';
import { ExperienceEditor } from './editor/experience-editor';
import { EducationEditor } from './editor/education-editor';
import { SkillsEditor } from './editor/skills-editor';
import { ProjectsEditor } from './editor/projects-editor';
import { Button } from './ui/button';
import { Import, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { parseResume, ParseResumeOutput } from '@/ai/flows/parse-resume';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ResumeEditorProps {
  resume: Resume;
  onUpdate: (resume: Resume) => void;
  showExperience: boolean;
}

// Replaces the functionality of the 'text-reader' package
async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        // The file content is in the result property
        resolve(result.split(',')[1] ? atob(result.split(',')[1]) : '');
      } else if (result instanceof ArrayBuffer) {
        // Handle ArrayBuffer if needed, for now decode as UTF-8
        try {
          const text = new TextDecoder('utf-8').decode(result);
          resolve(text);
        } catch (e) {
          reject(new Error('Could not decode file content.'));
        }
      } else {
        reject(new Error('File content could not be read as text.'));
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    // Handles various file types by reading them as a Data URL
    reader.readAsDataURL(file);
  });
}


export function ResumeEditor({ resume, onUpdate, showExperience }: ResumeEditorProps) {
  const { toast } = useToast();
  const [isParsing, setIsParsing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    // Ignore unsupported file types for now.
    if (!/\.(txt|pdf|docx?)$/i.test(file.name)) {
      toast({
        title: 'Unsupported file type',
        description: 'Please upload a TXT, PDF, or DOCX file.',
        variant: 'destructive',
      });
      return;
    }

    setIsParsing(true);
    try {
      const textContent = await readFileAsText(file);

      if (!textContent) {
        throw new Error('Could not read file content.');
      }
      
      const parsedData: ParseResumeOutput = await parseResume({ resumeContent: textContent });

      // Create a new resume object from the parsed data, ensuring all fields are defined
      const newResume: Resume = {
        contact: {
          name: parsedData.contact?.name || '',
          email: parsedData.contact?.email || '',
          phone: parsedData.contact?.phone || '',
          linkedin: parsedData.contact?.linkedin || '',
          github: parsedData.contact?.github || '',
          location: parsedData.contact?.location || '',
        },
        summary: parsedData.summary || '',
        experience: parsedData.experience || [],
        education: parsedData.education || [],
        skills: parsedData.skills || [],
        projects: parsedData.projects || [],
      };

      onUpdate(newResume);
      toast({
        title: 'Resume Parsed',
        description: 'Your resume has been successfully imported.',
      });
      setDialogOpen(false);
    } catch (error) {
      console.error('Failed to parse resume:', error);
      toast({
        title: 'Parsing Failed',
        description: 'Could not parse the resume. The file may be empty, corrupted or in an unsupported format.',
        variant: 'destructive',
      });
    } finally {
      setIsParsing(false);
    }
  };


  return (
    <ScrollArea className="h-[calc(100vh-8rem)] rounded-lg">
      <Card className="h-full shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-2xl">Resume Editor</CardTitle>
              <CardDescription>Fill in the details below. All changes are shown live.</CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline"><Import className="mr-2 h-4 w-4" /> Import from file</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import Resume</DialogTitle>
                  <DialogDescription>
                    Upload your resume file (PDF, DOCX, TXT) and the AI will parse it for you.
                  </DialogDescription>
                </DialogHeader>
                 <div className="grid w-full max-w-sm items-center gap-1.5 py-4">
                  <Label htmlFor="resume-file">Select Resume File</Label>
                  <Input id="resume-file" type="file" onChange={handleFileChange} disabled={isParsing} accept=".pdf,.doc,.docx,.txt" />
                </div>
                {isParsing && (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Parsing your resume... This may take a moment.</span>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={['contact', 'summary', 'experience', 'education', 'skills', 'projects']} className="w-full">
            <ContactEditor resume={resume} onUpdate={onUpdate} />
            <SummaryEditor resume={resume} onUpdate={onUpdate} />
            {showExperience && <ExperienceEditor resume={resume} onUpdate={onUpdate} />}
            <EducationEditor resume={resume} onUpdate={onUpdate} />
            <SkillsEditor resume={resume} onUpdate={onUpdate} />
            <ProjectsEditor resume={resume} onUpdate={onUpdate} />
          </Accordion>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
