'use server';

/**
 * @fileOverview A document summarization AI agent.
 *
 * - summarizeDocumentContent - A function that handles the document summarization process.
 * - SummarizeDocumentContentInput - The input type for the summarizeDocumentContent function.
 * - SummarizeDocumentContentOutput - The return type for the summarizeDocumentContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDocumentContentInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The content of the document to be summarized.'),
});
export type SummarizeDocumentContentInput = z.infer<typeof SummarizeDocumentContentInputSchema>;

const SummarizeDocumentContentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the document content.'),
  keyInformation: z.string().describe('Key information extracted from the document as bullet points.'),
  progress: z.string().describe('Progress of the summarization.'),
});
export type SummarizeDocumentContentOutput = z.infer<typeof SummarizeDocumentContentOutputSchema>;

export async function summarizeDocumentContent(input: SummarizeDocumentContentInput): Promise<SummarizeDocumentContentOutput> {
  return summarizeDocumentContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDocumentContentPrompt',
  input: {schema: SummarizeDocumentContentInputSchema},
  output: {schema: SummarizeDocumentContentOutputSchema},
  prompt: `You are a brilliant research assistant, skilled at distilling complex information into easy-to-digest summaries.

  Please provide a sharp, concise summary of the following document content, and then extract the most critical information as bullet points.

  Document Content: {{{documentContent}}}`,
});

const summarizeDocumentContentFlow = ai.defineFlow(
  {
    name: 'summarizeDocumentContentFlow',
    inputSchema: SummarizeDocumentContentInputSchema,
    outputSchema: SummarizeDocumentContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    output!.progress = 'Document summarization completed successfully.';
    return output!;
  }
);
