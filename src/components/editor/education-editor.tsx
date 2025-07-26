'use client'
import type { Resume, Education } from "@/lib/types";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";

interface EditorProps {
    resume: Resume;
    onUpdate: (resume: Resume) => void;
}

export function EducationEditor({ resume, onUpdate }: EditorProps) {
    const handleEducationChange = (index: number, field: keyof Education, value: string) => {
        const newEducation = [...resume.education];
        newEducation[index] = { ...newEducation[index], [field]: value };
        onUpdate({ ...resume, education: newEducation });
    };

    const addEducation = () => {
        const newEducation: Education = { institution: '', degree: '', startDate: '', endDate: '', description: '' };
        onUpdate({ ...resume, education: [...resume.education, newEducation] });
    };

    const removeEducation = (index: number) => {
        const newEducation = resume.education.filter((_, i) => i !== index);
        onUpdate({ ...resume, education: newEducation });
    };

    return (
        <AccordionItem value="education">
            <AccordionTrigger className="text-lg font-medium">Education</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
                 {resume.education.map((edu, index) => (
                    <Card key={index} className="p-4 relative bg-secondary/50">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => removeEducation(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="space-y-4">
                            <div className="grid gap-1.5"><Label>Institution</Label><Input value={edu.institution} onChange={e => handleEducationChange(index, 'institution', e.target.value)} placeholder="e.g. State University" /></div>
                            <div className="grid gap-1.5"><Label>Degree</Label><Input value={edu.degree} onChange={e => handleEducationChange(index, 'degree', e.target.value)} placeholder="e.g. B.S. in Computer Science" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-1.5"><Label>Start Date</Label><Input value={edu.startDate} onChange={e => handleEducationChange(index, 'startDate', e.target.value)} placeholder="e.g. Sep 2014" /></div>
                                <div className="grid gap-1.5"><Label>End Date</Label><Input value={edu.endDate} onChange={e => handleEducationChange(index, 'endDate', e.target.value)} placeholder="e.g. May 2018" /></div>
                            </div>
                             <div className="grid gap-1.5">
                                <Label>Description</Label>
                                <Textarea value={edu.description} onChange={e => handleEducationChange(index, 'description', e.target.value)} className="min-h-[60px]" placeholder="e.g. Graduated Magna Cum Laude" />
                            </div>
                        </div>
                    </Card>
                ))}
                <Button variant="outline" className="w-full" onClick={addEducation}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
            </AccordionContent>
        </AccordionItem>
    );
}
