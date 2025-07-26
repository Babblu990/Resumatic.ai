'use server';

/**
 * @fileOverview An AI agent that parses resume content and extracts structured data.
 *
 * - parseResume - A function that handles the parsing process.
 * - ParseResumeInput - The input type for the parseResume function.
 * - ParseResumeOutput - The return type for the parseResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseResumeInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The full text content of the resume to be parsed.'),
});
export type ParseResumeInput = z.infer<typeof ParseResumeInputSchema>;

const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
});

const ParseResumeOutputSchema = z.object({
  contact: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    location: z.string().optional(),
  }),
  summary: z.string().optional(),
  experience: z.array(ExperienceSchema).optional(),
  education: z.array(EducationSchema).optional(),
  skills: z.array(z.string()).optional(),
  projects: z.array(ProjectSchema).optional(),
});
export type ParseResumeOutput = z.infer<typeof ParseResumeOutputSchema>;

export async function parseResume(
  input: ParseResumeInput
): Promise<ParseResumeOutput> {
  return parseResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseResumePrompt',
  input: {schema: ParseResumeInputSchema},
  output: {schema: ParseResumeOutputSchema},
  prompt: `You are an expert resume parser. Extract the structured data from the following resume content.

Resume Content:
{{{resumeContent}}}

If a field is not present in the resume, you can leave it out. For experience and education, if start and end dates are not present, make a reasonable guess based on the other information.`,
});

const parseResumeFlow = ai.defineFlow(
  {
    name: 'parseResumeFlow',
    inputSchema: ParseResumeInputSchema,
    outputSchema: ParseResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
