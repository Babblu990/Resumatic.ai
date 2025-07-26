'use server';

/**
 * @fileOverview An AI agent that rewrites resume text to be more impactful.
 *
 * - rewriteResumeText - A function that handles the rewriting process.
 * - RewriteResumeTextInput - The input type for the rewriteResumeText function.
 * - RewriteResumeTextOutput - The return type for the rewriteResumeText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteResumeTextInputSchema = z.object({
  resumeSection: z.string().describe('The specific section of the resume to rewrite.'),
  jobDescription: z.string().describe('The job description to tailor the resume section to.'),
});
export type RewriteResumeTextInput = z.infer<typeof RewriteResumeTextInputSchema>;

const RewriteResumeTextOutputSchema = z.object({
  rewrittenSection: z.string().describe('The rewritten resume section.'),
});
export type RewriteResumeTextOutput = z.infer<typeof RewriteResumeTextOutputSchema>;

export async function rewriteResumeText(input: RewriteResumeTextInput): Promise<RewriteResumeTextOutput> {
  return rewriteResumeTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteResumeTextPrompt',
  input: {schema: RewriteResumeTextInputSchema},
  output: {schema: RewriteResumeTextOutputSchema},
  prompt: `You are a world-class copywriter with a knack for making professional experience sound compelling and results-oriented. Rewrite the provided resume section to be more dynamic and impactful, aligning it perfectly with the target job description. Use strong action verbs and quantify achievements where possible.

Job Description:
{{{jobDescription}}}

Resume Section to Rewrite:
{{{resumeSection}}}

Rewritten Resume Section:`,
});

const rewriteResumeTextFlow = ai.defineFlow(
  {
    name: 'rewriteResumeTextFlow',
    inputSchema: RewriteResumeTextInputSchema,
    outputSchema: RewriteResumeTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
