'use client'
import type { Resume } from "@/lib/types";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface EditorProps {
    resume: Resume;
    onUpdate: (resume: Resume) => void;
}

export function SummaryEditor({ resume, onUpdate }: EditorProps) {
    const handleChange = (value: string) => {
        onUpdate({ ...resume, summary: value });
    };

    return (
        <AccordionItem value="summary">
            <AccordionTrigger className="text-lg font-medium">Professional Summary</AccordionTrigger>
            <AccordionContent className="pt-2">
                <Label htmlFor="summary-text">Summary</Label>
                <Textarea
                    id="summary-text"
                    placeholder="Write a brief summary about your professional background..."
                    value={resume.summary}
                    onChange={e => handleChange(e.target.value)}
                    className="min-h-[120px] mt-1.5"
                />
            </AccordionContent>
        </AccordionItem>
    );
}
