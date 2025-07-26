'use client'
import type { Resume } from "@/lib/types";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface EditorProps {
    resume: Resume;
    onUpdate: (resume: Resume) => void;
}

export function ContactEditor({ resume, onUpdate }: EditorProps) {
    const handleChange = (field: keyof Resume['contact'], value: string) => {
        onUpdate({
            ...resume,
            contact: {
                ...resume.contact,
                [field]: value,
            },
        });
    };

    return (
        <AccordionItem value="contact">
            <AccordionTrigger className="text-lg font-medium">Contact Information</AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="grid gap-1.5">
                    <Label htmlFor="contact-name">Full Name</Label>
                    <Input id="contact-name" value={resume.contact.name} onChange={e => handleChange('name', e.target.value)} placeholder="John Doe" />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" value={resume.contact.email} onChange={e => handleChange('email', e.target.value)} placeholder="john.doe@example.com" />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input id="contact-phone" value={resume.contact.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="(123) 456-7890" />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="contact-location">Location</Label>
                    <Input id="contact-location" value={resume.contact.location} onChange={e => handleChange('location', e.target.value)} placeholder="San Francisco, CA" />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="contact-linkedin">LinkedIn Profile URL</Label>
                    <Input id="contact-linkedin" value={resume.contact.linkedin} onChange={e => handleChange('linkedin', e.target.value)} placeholder="linkedin.com/in/johndoe" />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="contact-github">GitHub Profile URL</Label>
                    <Input id="contact-github" value={resume.contact.github} onChange={e => handleChange('github', e.target.value)} placeholder="github.com/johndoe" />
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
