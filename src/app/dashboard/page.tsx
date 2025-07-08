'use client';

import { useState } from 'react';
import type { EvaluationResult, PropertyFormData } from '@/app/actions';
import { PropertyForm } from '@/components/property-form';
import { ResultsDisplay } from '@/components/results-display';
import { getEvaluation } from '@/app/actions';
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const handleEvaluate = async (formData: PropertyFormData) => {
    setIsLoading(true);
    setEvaluation(null);
    try {
      const result = await getEvaluation(formData);
      setEvaluation(result);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Evaluation Failed",
        description: "There was an error processing your request. Please try again.",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Navigate Your Next Move
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Our AI-powered platform gives you instant property valuations and market insights. Enter the details below to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5 lg:col-span-4">
              <PropertyForm onSubmit={handleEvaluate} isLoading={isLoading} />
            </div>
            <div className="md:col-span-7 lg:col-span-8">
              <ResultsDisplay result={evaluation} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
