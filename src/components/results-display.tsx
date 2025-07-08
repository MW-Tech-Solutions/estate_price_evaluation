import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import type { EvaluationResult } from "@/app/actions";
import { Bot, LineChart, FileText, House } from "lucide-react";

interface ResultsDisplayProps {
  result: EvaluationResult | null;
  isLoading: boolean;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
};

export function ResultsDisplay({ result, isLoading }: ResultsDisplayProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!result) {
    return (
      <Card className="flex h-full min-h-[400px] w-full items-center justify-center shadow-lg">
        <div className="text-center">
          <div className="mb-4 inline-block rounded-lg bg-primary/10 p-4">
             <House className="h-10 w-10 text-primary" />
          </div>
          <h3 className="font-headline text-xl font-semibold">Evaluation Results</h3>
          <p className="text-muted-foreground">Your property analysis will appear here.</p>
        </div>
      </Card>
    );
  }

  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Estimated Value</CardTitle>
          <CardDescription>This is an AI-generated estimate based on the details you provided and market data.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-headline text-5xl font-bold text-primary mb-4">
            {formatCurrency(result.predictedPrice)}
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>Confidence Score</span>
                <span className="font-semibold text-foreground">{confidencePercent}%</span>
            </div>
            <Progress value={confidencePercent} aria-label={`${confidencePercent}% confidence`} />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className="rounded-lg bg-primary/10 p-2">
                    <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl">Property Description</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{result.description}</p>
            </CardContent>
        </Card>
        
        <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className="rounded-lg bg-primary/10 p-2">
                    <LineChart className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl">Market Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{result.comparison}</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}


function LoadingSkeleton() {
    return (
        <div className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-14 w-3/5 mb-4" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-full" />
                    </div>
                </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2">
                 <Card className="shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                       <Skeleton className="h-9 w-9 rounded-lg" />
                       <Skeleton className="h-6 w-36" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </CardContent>
                </Card>
                 <Card className="shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                       <Skeleton className="h-9 w-9 rounded-lg" />
                       <Skeleton className="h-6 w-40" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
