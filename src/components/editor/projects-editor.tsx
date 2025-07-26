'use client'
import type { Resume, Project } from "@/lib/types";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Card } from "../ui/card";

interface EditorProps {
    resume: Resume;
    onUpdate: (resume: Resume) => void;
}

export function ProjectsEditor({ resume, onUpdate }: EditorProps) {
    const handleProjectChange = (index: number, field: keyof Project, value: string) => {
        const newProjects = [...resume.projects];
        newProjects[index] = { ...newProjects[index], [field]: value };
        onUpdate({ ...resume, projects: newProjects });
    };

    const addProject = () => {
        const newProject: Project = { name: '', url: '', description: '' };
        onUpdate({ ...resume, projects: [...resume.projects, newProject] });
    };

    const removeProject = (index: number) => {
        const newProjects = resume.projects.filter((_, i) => i !== index);
        onUpdate({ ...resume, projects: newProjects });
    };

    return (
        <AccordionItem value="projects">
            <AccordionTrigger className="text-lg font-medium">Projects</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
                 {resume.projects.map((proj, index) => (
                    <Card key={index} className="p-4 relative bg-secondary/50">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => removeProject(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="space-y-4">
                            <div className="grid gap-1.5"><Label>Project Name</Label><Input value={proj.name} onChange={e => handleProjectChange(index, 'name', e.target.value)} placeholder="e.g. E-commerce Platform" /></div>
                            <div className="grid gap-1.5"><Label>Project URL</Label><Input value={proj.url} onChange={e => handleProjectChange(index, 'url', e.target.value)} placeholder="e.g. github.com/user/repo" /></div>
                            <div className="grid gap-1.5">
                                <Label>Description</Label>
                                <Textarea value={proj.description} onChange={e => handleProjectChange(index, 'description', e.target.value)} className="min-h-[80px]" placeholder="Describe the project and technologies used." />
                            </div>
                        </div>
                    </Card>
                ))}
                <Button variant="outline" className="w-full" onClick={addProject}><PlusCircle className="mr-2 h-4 w-4" /> Add Project</Button>
            </AccordionContent>
        </AccordionItem>
    );
}
