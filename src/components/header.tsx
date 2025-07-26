'use client';
import { FileText, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ResumeImprover } from './resume-improver';
import { ContentSummarizer } from './content-summarizer';
import { type Resume } from '@/lib/types';
import { ExportDialog } from './export-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Header({ resume }: { resume: Resume }) {
  const isLoggedIn = true;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-8 border-b bg-card/80 backdrop-blur-sm shadow-sm">
      <div className="flex items-center gap-2 md:gap-4">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="text-xl md:text-2xl font-bold text-primary font-headline">Resumatic.ai</h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <ContentSummarizer />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ResumeImprover resume={resume} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p><strong>Guided Tour Tip:</strong> Improve your resume with AI!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <ExportDialog resume={resume} />
        
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-primary/50">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" data-ai-hint="person portrait" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button>Log In</Button>
        )}
      </div>
    </header>
  );
}
