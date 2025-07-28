
import { type Resume } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';

export function resumeToString(resume: Resume): string {
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
${experience || 'No experience listed.'}

## Education
${education}

## Projects
${projects || 'No projects listed.'}
    `;
}


export function ResumePreview({ resume, showExperience }: { resume: Resume, showExperience: boolean }) {
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

          {showExperience && (
            <section className="mb-6">
              <h3 className="text-base font-bold uppercase tracking-widest text-primary mb-2 border-b-2 border-primary/20 pb-1">Experience</h3>
              {resume.experience.length > 0 ? resume.experience.map((exp, index) => (
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
              )) : <p className="text-muted-foreground italic">No work experience provided.</p>}
            </section>
          )}

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
            {resume.projects.length > 0 ? resume.projects.map((proj, index) => (
              <div key={index} className="mb-4 last:mb-0">
                 <div className="flex items-center gap-4">
                    <h4 className="font-bold text-base">{proj.name}</h4>
                    <a href={`https://`+proj.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">{proj.url}</a>
                 </div>
                 <p className="mt-1 text-foreground/80">{proj.description}</p>
              </div>
            )) : <p className="text-muted-foreground italic">No projects provided.</p>}
          </section>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
