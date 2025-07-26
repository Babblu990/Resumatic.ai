'use client';

import { useState } from 'react';
import { BookText, PenSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { summarizeDocumentContent } from '@/ai/flows/summarize-content';
import { rewriteResumeText } from '@/ai/flows/rewrite-resume-text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Label } from './ui/label';

export function ContentSummarizer() {
  const [summarizeText, setSummarizeText] = useState('');
  const [summaryResult, setSummaryResult] = useState({ summary: '', keyInformation: '' });
  const [isSummarizing, setIsSummarizing] = useState(false);

  const [rewriteText, setRewriteText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [rewrittenText, setRewrittenText] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);

  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!summarizeText) {
      toast({ title: 'Text is required', description: 'Please enter text to summarize.', variant: 'destructive' });
      return;
    }
    setIsSummarizing(true);
    setSummaryResult({ summary: '', keyInformation: '' });
    try {
      const result = await summarizeDocumentContent({ documentContent: summarizeText });
      setSummaryResult({ summary: result.summary, keyInformation: result.keyInformation });
    } catch (error) {
      console.error(error);
      toast({ title: 'An error occurred', description: 'Failed to summarize text.', variant: 'destructive' });
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleRewrite = async () => {
    if (!rewriteText) {
      toast({ title: 'Text is required', description: 'Please enter text to rewrite.', variant: 'destructive' });
      return;
    }
    if (!jobDescription) {
      toast({ title: 'Job Description is required', description: 'Please enter a job description to tailor the text.', variant: 'destructive' });
      return;
    }
    setIsRewriting(true);
    setRewrittenText('');
    try {
      const result = await rewriteResumeText({ resumeSection: rewriteText, jobDescription });
      setRewrittenText(result.rewrittenSection);
    } catch (error) {
      console.error(error);
      toast({ title: 'An error occurred', description: 'Failed to rewrite text.', variant: 'destructive' });
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <BookText className="mr-2 h-4 w-4" />
          AI Tools
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-headline">AI Content Tools</DialogTitle>
          <DialogDescription>
            Summarize documents or rewrite text to be more impactful, tailored to a job description.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="summarize" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summarize">Summarizer</TabsTrigger>
            <TabsTrigger value="rewrite">Rewriter</TabsTrigger>
          </TabsList>
          <TabsContent value="summarize">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <Label htmlFor="summarize-input">Text to Summarize</Label>
                <Textarea id="summarize-input" placeholder="Paste any text here..." className="mt-2 min-h-[300px]" value={summarizeText} onChange={(e) => setSummarizeText(e.target.value)} />
              </div>
              <Card className="min-h-[300px]">
                <CardHeader>
                  <CardTitle>Summary & Key Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[240px] text-sm">
                    {isSummarizing ? (
                      <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                    ) : summaryResult.summary ? (
                      <div>
                        <h4 className="font-semibold mb-2 text-primary">Summary</h4>
                        <p className="mb-4 whitespace-pre-wrap">{summaryResult.summary}</p>
                        <h4 className="font-semibold mb-2 text-primary">Key Information</h4>
                        <p className="whitespace-pre-wrap">{summaryResult.keyInformation}</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center pt-20">Summary will appear here.</p>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
            <Button onClick={handleSummarize} disabled={isSummarizing}>
              {isSummarizing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing...</> : 'Summarize'}
            </Button>
          </TabsContent>
          <TabsContent value="rewrite">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <Label htmlFor="rewrite-input">Text to Rewrite</Label>
                  <Textarea id="rewrite-input" placeholder="Paste resume section here..." className="mt-2 min-h-[200px]" value={rewriteText} onChange={(e) => setRewriteText(e.target.value)} />
                  <Label htmlFor="job-desc-rewrite" className="mt-4 block">Target Job Description (for context)</Label>
                  <Textarea id="job-desc-rewrite" placeholder="Paste job description here..." className="mt-2 min-h-[80px]" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                </div>
                <Card className="min-h-[300px]">
                  <CardHeader><CardTitle>Rewritten Text</CardTitle></CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[240px] text-sm">
                      {isRewriting ? (
                        <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                      ) : rewrittenText ? (
                        <p className="whitespace-pre-wrap">{rewrittenText}</p>
                      ) : (
                        <p className="text-muted-foreground text-center pt-20">Rewritten text will appear here.</p>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
            </div>
            <Button onClick={handleRewrite} disabled={isRewriting}>
              {isRewriting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Rewriting...</> : <> <PenSquare className="mr-2 h-4 w-4" /> Rewrite with AI</>}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
