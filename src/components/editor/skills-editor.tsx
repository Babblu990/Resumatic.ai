'use client'
import type { Resume } from "@/lib/types";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface EditorProps {
    resume: Resume;
    onUpdate: (resume: Resume) => void;
}

export function SkillsEditor({ resume, onUpdate }: EditorProps) {
    const handleChange = (value: string) => {
        const skills = value.split(',').map(skill => skill.trim());
        onUpdate({ ...resume, skills });
    };

    return (
        <AccordionItem value="skills">
            <AccordionTrigger className="text-lg font-medium">Skills</AccordionTrigger>
            <AccordionContent className="pt-2">
                <Label htmlFor="skills-text">Skills (comma-separated)</Label>
                <Textarea
                    id="skills-text"
                    placeholder="e.g. React, Node.js, Leadership"
                    value={resume.skills.join(', ')}
                    onChange={e => handleChange(e.target.value)}
                    className="min-h-[100px] mt-1.5"
                />
            </AccordionContent>
        </AccordionItem>
    );
}
