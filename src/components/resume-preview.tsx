import { type Resume } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';

export function ResumePreview({ resume }: { resume: Resume }) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)] rounded-lg">
      <Card className="h-full shadow-lg">
        <CardContent className="p-6 md:p-8 text-sm">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold tracking-tight text-primary font-headline">{resume.contact.name}</h2>
            <div className="flex justify-center flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
              <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{resume.contact.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{resume.contact.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{resume.contact.location}</span>
              <a href={`https://`+resume.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Linkedin className="h-3 w-3" />{resume.contact.linkedin}</a>
              <a href={`https://`+resume.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Github className="h-3 w-3" />{resume.contact.github}</a>
            </div>
          </div>
          
          <section className="mb-6">
            <h3 className="text-base font-bold uppercase tracking-widest text-primary mb-2 border-b-2 border-primary/20 pb-1">Summary</h3>
            <p className="text-foreground/80">{resume.summary}</p>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold uppercase tracking-widest text-primary mb-2 border-b-2 border-primary/20 pb-1">Experience</h3>
            {resume.experience.map((exp, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-base">{exp.role}</h4>
                  <p className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="italic text-foreground/90">{exp.company}</p>
                <ul className="mt-1 text-foreground/80 list-disc list-inside space-y-1">
                    {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold uppercase tracking-widest text-primary mb-2 border-b-2 border-primary/20 pb-1">Education</h3>
            {resume.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-base">{edu.degree}</h4>
                   <p className="text-xs text-muted-foreground">{edu.startDate} - {edu.endDate}</p>
                </div>
                <p className="italic text-foreground/90">{edu.institution}</p>
                <p className="mt-1 text-foreground/80">{edu.description}</p>
              </div>
            ))}
          </section>

          <section className="mb-6">
             <h3 className="text-base font-bold uppercase tracking-widest text-primary mb-2 border-b-2 border-primary/20 pb-1">Skills</h3>
             <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                    <span key={index} className="bg-primary/10 text-primary font-medium rounded-full px-3 py-1 text-xs">{skill}</span>
                ))}
             </div>
          </section>

          <section>
            <h3 className="text-base font-bold uppercase tracking-widest text-primary mb-2 border-b-2 border-primary/20 pb-1">Projects</h3>
            {resume.projects.map((proj, index) => (
              <div key={index} className="mb-4 last:mb-0">
                 <div className="flex items-center gap-4">
                    <h4 className="font-bold text-base">{proj.name}</h4>
                    <a href={`https://`+proj.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">{proj.url}</a>
                 </div>
                 <p className="mt-1 text-foreground/80">{proj.description}</p>
              </div>
            ))}
          </section>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
