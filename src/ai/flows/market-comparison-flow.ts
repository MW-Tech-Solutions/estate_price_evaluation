'use server';

/**
 * @fileOverview An AI agent that compares a property's predicted price against similar properties in the area.
 *
 * - comparePropertyToMarket - A function that handles the property market comparison process.
 * - ComparePropertyToMarketInput - The input type for the comparePropertyToMarket function.
 * - ComparePropertyToMarketOutput - The return type for the comparePropertyToMarket function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ComparePropertyToMarketInputSchema = z.object({
  propertyDetails: z.string().describe('Details of the property being evaluated, including location, size, number of rooms, and amenities.'),
  predictedPrice: z.number().describe('The AI-predicted price of the property.'),
  marketData: z.string().describe('Data about similar properties in the area, including their features and sale prices.'),
});
export type ComparePropertyToMarketInput = z.infer<typeof ComparePropertyToMarketInputSchema>;

const ComparePropertyToMarketOutputSchema = z.object({
  comparisonSummary: z.string().describe('A summary comparing the property to similar properties in the area, highlighting its relative value.'),
  confidenceScore: z.number().describe('A confidence score for the comparison summary, indicating the reliability of the assessment.'),
});
export type ComparePropertyToMarketOutput = z.infer<typeof ComparePropertyToMarketOutputSchema>;

export async function comparePropertyToMarket(input: ComparePropertyToMarketInput): Promise<ComparePropertyToMarketOutput> {
  return comparePropertyToMarketFlow(input);
}

const prompt = ai.definePrompt({
  name: 'comparePropertyToMarketPrompt',
  input: {schema: ComparePropertyToMarketInputSchema},
  output: {schema: ComparePropertyToMarketOutputSchema},
  prompt: `You are a real estate expert providing insights into property values.

You will analyze the provided property details, its predicted price, and market data of comparable properties to generate a comparison summary.

Property Details: {{{propertyDetails}}}
Predicted Price: {{{predictedPrice}}}
Market Data: {{{marketData}}}

Based on this information, provide a comparison summary that highlights the property's relative value compared to similar properties in the area. Include a confidence score (0-1) for the comparison summary.

Comparison Summary:`, // Changed to Comparison Summary:
});

const comparePropertyToMarketFlow = ai.defineFlow(
  {
    name: 'comparePropertyToMarketFlow',
    inputSchema: ComparePropertyToMarketInputSchema,
    outputSchema: ComparePropertyToMarketOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
