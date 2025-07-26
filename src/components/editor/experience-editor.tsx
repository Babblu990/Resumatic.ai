'use client'
import type { Resume, Experience } from "@/lib/types";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface EditorProps {
    resume: Resume;
    onUpdate: (resume: Resume) => void;
}

export function ExperienceEditor({ resume, onUpdate }: EditorProps) {
    const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
        const newExperience = [...resume.experience];
        newExperience[index] = { ...newExperience[index], [field]: value };
        onUpdate({ ...resume, experience: newExperience });
    };

    const addExperience = () => {
        const newExperience: Experience = { company: '', role: '', startDate: '', endDate: '', description: '' };
        onUpdate({ ...resume, experience: [...resume.experience, newExperience] });
    };

    const removeExperience = (index: number) => {
        const newExperience = resume.experience.filter((_, i) => i !== index);
        onUpdate({ ...resume, experience: newExperience });
    };

    return (
        <AccordionItem value="experience">
            <AccordionTrigger className="text-lg font-medium">Work Experience</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
                {resume.experience.map((exp, index) => (
                    <Card key={index} className="p-4 relative bg-secondary/50">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => removeExperience(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="space-y-4">
                            <div className="grid gap-1.5"><Label>Company</Label><Input value={exp.company} onChange={e => handleExperienceChange(index, 'company', e.target.value)} placeholder="Company Name" /></div>
                            <div className="grid gap-1.5"><Label>Role / Title</Label><Input value={exp.role} onChange={e => handleExperienceChange(index, 'role', e.target.value)} placeholder="e.g. Senior Software Engineer" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-1.5"><Label>Start Date</Label><Input value={exp.startDate} onChange={e => handleExperienceChange(index, 'startDate', e.target.value)} placeholder="e.g. Jan 2020" /></div>
                                <div className="grid gap-1.5"><Label>End Date</Label><Input value={exp.endDate} onChange={e => handleExperienceChange(index, 'endDate', e.target.value)} placeholder="e.g. Present" /></div>
                            </div>
                            <div className="grid gap-1.5">
                                <Label>Description</Label>
                                <Textarea value={exp.description} onChange={e => handleExperienceChange(index, 'description', e.target.value)} className="min-h-[100px]" placeholder="Describe your responsibilities and achievements. Start each line with a hyphen." />
                            </div>
                        </div>
                    </Card>
                ))}
                <Button variant="outline" className="w-full" onClick={addExperience}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
            </AccordionContent>
        </AccordionItem>
    );
}
