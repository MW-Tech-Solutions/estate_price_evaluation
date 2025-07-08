'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating property descriptions based on user-provided details.
 *
 * @function generatePropertyDescription - Generates a property description.
 * @typedef {GeneratePropertyDescriptionInput} GeneratePropertyDescriptionInput - Input type for the generatePropertyDescription function.
 * @typedef {GeneratePropertyDescriptionOutput} GeneratePropertyDescriptionOutput - Output type for the generatePropertyDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePropertyDescriptionInputSchema = z.object({
  location: z.string().describe('The location of the property.'),
  sizeSqft: z.number().describe('The size of the property in square feet.'),
  numRooms: z.number().describe('The number of rooms in the property.'),
  numBathrooms: z.number().describe('The number of bathrooms in the property.'),
  amenities: z.string().describe('A comma-separated list of amenities the property offers.'),
});

export type GeneratePropertyDescriptionInput = z.infer<
  typeof GeneratePropertyDescriptionInputSchema
>;

const GeneratePropertyDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated property description.'),
});

export type GeneratePropertyDescriptionOutput = z.infer<
  typeof GeneratePropertyDescriptionOutputSchema
>;

export async function generatePropertyDescription(
  input: GeneratePropertyDescriptionInput
): Promise<GeneratePropertyDescriptionOutput> {
  return generatePropertyDescriptionFlow(input);
}

const propertyDescriptionPrompt = ai.definePrompt({
  name: 'propertyDescriptionPrompt',
  input: {schema: GeneratePropertyDescriptionInputSchema},
  output: {schema: GeneratePropertyDescriptionOutputSchema},
  prompt: `Generate a compelling property description based on the following details:

Location: {{{location}}}
Size: {{{sizeSqft}}} sqft
Rooms: {{{numRooms}}}
Bathrooms: {{{numBathrooms}}}
Amenities: {{{amenities}}}

Write a description that highlights the key features and benefits of the property.  The description should be no more than 200 words.
`,
});

const generatePropertyDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePropertyDescriptionFlow',
    inputSchema: GeneratePropertyDescriptionInputSchema,
    outputSchema: GeneratePropertyDescriptionOutputSchema,
  },
  async input => {
    const {output} = await propertyDescriptionPrompt(input);
    return output!;
  }
);
