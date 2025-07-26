// src/ai/flows/improve-resume.ts
'use server';
/**
 * @fileOverview A flow that provides actionable suggestions on how to improve a resume based on a job description.
 *
 * - improveResume - A function that handles the resume improvement process.
 * - ImproveResumeInput - The input type for the improveResume function.
 * - ImproveResumeOutput - The return type for the improveResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveResumeInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to match the resume against.'),
  resume: z.string().describe('The current resume to improve.'),
});
export type ImproveResumeInput = z.infer<typeof ImproveResumeInputSchema>;

const ImproveResumeOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'Specific, actionable suggestions on how to improve the resume to better match the job description.'
    ),
});
export type ImproveResumeOutput = z.infer<typeof ImproveResumeOutputSchema>;

export async function improveResume(input: ImproveResumeInput): Promise<ImproveResumeOutput> {
  return improveResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveResumePrompt',
  input: {schema: ImproveResumeInputSchema},
  output: {schema: ImproveResumeOutputSchema},
  prompt: `You are a resume expert. Analyze the provided resume against the job description and provide specific, actionable suggestions on how to improve the resume to better match the job description. Focus on tailoring the resume to highlight the skills and experiences that are most relevant to the job description.

Job Description: {{{jobDescription}}}

Resume: {{{resume}}}

Suggestions:`,
});

const improveResumeFlow = ai.defineFlow(
  {
    name: 'improveResumeFlow',
    inputSchema: ImproveResumeInputSchema,
    outputSchema: ImproveResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
