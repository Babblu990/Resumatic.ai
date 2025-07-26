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
import { Import } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ResumeEditorProps {
  resume: Resume;
  onUpdate: (resume: Resume) => void;
}

export function ResumeEditor({ resume, onUpdate }: ResumeEditorProps) {
  const { toast } = useToast();
  
  const handleImport = () => {
    toast({
      title: "Parser is a demo feature",
      description: "In a real app, this would parse your resume content into the editor fields.",
    })
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)] rounded-lg">
      <Card className="h-full shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-2xl">Resume Editor</CardTitle>
              <CardDescription>Fill in the details below. All changes are shown live.</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline"><Import className="mr-2 h-4 w-4" /> Import</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import Resume</DialogTitle>
                  <DialogDescription>
                    Paste your existing resume content here to get started. This is a demo of the resume parser UI.
                  </DialogDescription>
                </DialogHeader>
                <Textarea placeholder="Paste your resume here..." className="min-h-[250px] my-4" />
                <Button onClick={handleImport}>Parse Resume</Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={['contact', 'summary', 'experience']} className="w-full">
            <ContactEditor resume={resume} onUpdate={onUpdate} />
            <SummaryEditor resume={resume} onUpdate={onUpdate} />
            <ExperienceEditor resume={resume} onUpdate={onUpdate} />
            <EducationEditor resume={resume} onUpdate={onUpdate} />
            <SkillsEditor resume={resume} onUpdate={onUpdate} />
            <ProjectsEditor resume={resume} onUpdate={onUpdate} />
          </Accordion>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
