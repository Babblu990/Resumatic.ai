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
      'Specific, actionable suggestions on how to improve the resume to better match the job description. Use markdown for formatting, like using headings for sections and bullet points for suggestions.'
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
  prompt: `You are a top-tier career coach specializing in helping students and recent graduates. Your goal is to help users land their first job or internship. Analyze the provided resume against the job description.

If the resume has no work experience, focus on how to best present their projects, skills, and academic coursework. Provide specific, actionable suggestions. Be encouraging and insightful.

Job Description:
{{{jobDescription}}}

Resume:
{{{resume}}}

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
