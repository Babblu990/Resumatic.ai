'use server';
/**
 * @fileOverview An AI agent that rates the quality of a resume.
 *
 * - rateResume - A function that rates the resume.
 * - RateResumeInput - The input type for the rateResume function.
 * - RateResumeOutput - The return type for the rateResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RateResumeInputSchema = z.object({
  resumeText: z.string().describe('The full text content of the resume to be rated.'),
});
export type RateResumeInput = z.infer<typeof RateResumeInputSchema>;

const RateResumeOutputSchema = z.object({
  score: z.number().min(0).max(100).describe('A score from 0 to 100 indicating the quality of the resume. 0 is a very poor resume, and 100 is a perfect resume.'),
  feedback: z.string().describe('A brief, one-sentence feedback on what to improve next.')
});
export type RateResumeOutput = z.infer<typeof RateResumeOutputSchema>;


export async function rateResume(input: RateResumeInput): Promise<RateResumeOutput> {
    return await rateResumeFlow(input);
}

const prompt = ai.definePrompt({
    name: 'rateResumePrompt',
    input: { schema: RateResumeInputSchema },
    output: { schema: RateResumeOutputSchema },
    prompt: `You are an expert resume reviewer. Analyze the provided resume text and give it a score from 0 to 100 based on its quality, completeness, and clarity. Also provide one sentence of feedback on the most important thing to improve.

    Consider the following criteria for scoring:
    - Presence and quality of a professional summary.
    - Clarity and impact of work experience descriptions (use of action verbs, quantified results).
    - Completeness of education details.
    - Relevance and breadth of skills.
    - Inclusion of projects, especially for students or recent graduates.
    - Overall formatting, grammar, and spelling.
    - Contact information present and professional.

    Resume Text:
    {{{resumeText}}}
    `,
});


const rateResumeFlow = ai.defineFlow(
  {
    name: 'rateResumeFlow',
    inputSchema: RateResumeInputSchema,
    outputSchema: RateResumeOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
