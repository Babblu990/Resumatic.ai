'use client';

import { Download, FileText, FileType, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { type Resume } from '@/lib/types';

export function ExportDialog({ resume }: { resume: Resume }) {
    const { toast } = useToast();

    const handleExport = (format: 'PDF' | 'DOCX' | 'TXT') => {
        toast({
            title: 'Exporting Resume (Demo)',
            description: `In a real application, your resume would be downloaded as a ${format} file.`,
        });
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Export Resume</DialogTitle>
          <DialogDescription>
            Choose your desired file format.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
            <Button variant="outline" size="lg" onClick={() => handleExport('PDF')}>
                <FileType className="mr-2 h-4 w-4" />
                Export as PDF
            </Button>
            <Button variant="outline" size="lg" onClick={() => handleExport('DOCX')}>
                <FileText className="mr-2 h-4 w-4" />
                Export as DOCX
            </Button>
            <Button variant="outline" size="lg" onClick={() => handleExport('TXT')}>
                <FileJson className="mr-2 h-4 w-4" />
                Export as TXT
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
