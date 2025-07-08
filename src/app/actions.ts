'use server';

import { 
    generatePropertyDescription, 
    type GeneratePropertyDescriptionInput 
} from '@/ai/flows/property-description-flow';
import {
    comparePropertyToMarket,
    type ComparePropertyToMarketInput,
} from '@/ai/flows/market-comparison-flow';
import * as z from "zod";

const formSchema = z.object({
  location: z.string().min(2, "Location must be at least 2 characters."),
  sizeSqft: z.coerce.number().min(100, "Size must be at least 100 sqft."),
  numRooms: z.coerce.number().min(1, "Must have at least 1 room.").max(20, "Cannot exceed 20 rooms."),
  numBathrooms: z.coerce.number().min(1, "Must have at least 1 bathroom.").max(20, "Cannot exceed 20 bathrooms."),
  amenities: z.string().min(3, "Please list at least one amenity."),
});

export type PropertyFormData = z.infer<typeof formSchema>;

export interface EvaluationResult {
    predictedPrice: number;
    description: string;
    comparison: string;
    confidence: number;
}

export async function getEvaluation(input: PropertyFormData): Promise<EvaluationResult> {
    const validatedInput = formSchema.parse(input);

    // 1. Mock price prediction in Naira
    const predictedPrice = validatedInput.sizeSqft * 150000 + validatedInput.numRooms * 5000000 + validatedInput.numBathrooms * 2500000 + (validatedInput.amenities.length * 100000);

    const propertyLocation = `${validatedInput.location}, Adamawa State, Nigeria`;
    const propertyDetailsString = `A ${validatedInput.sizeSqft} sqft property with ${validatedInput.numRooms} rooms and ${validatedInput.numBathrooms} bathrooms, located in ${propertyLocation}. Amenities include: ${validatedInput.amenities}.`;

    // 2. Mock market data for comparison in Adamawa State
    const mockMarketData = `Comparable properties recently sold in Adamawa State, Nigeria:
- A ${validatedInput.sizeSqft - 50 > 100 ? validatedInput.sizeSqft - 50 : 100} sqft property with ${validatedInput.numRooms} rooms sold for ₦${(predictedPrice - 2000000).toLocaleString()}.
- A ${validatedInput.sizeSqft + 50} sqft property with ${validatedInput.numRooms + 1} rooms sold for ₦${(predictedPrice + 5000000).toLocaleString()}.
- The average price for a ${validatedInput.numRooms}-room property in this neighborhood is approximately ₦${(predictedPrice + 1000000).toLocaleString()}.`;
    
    const genkitDescriptionInput: GeneratePropertyDescriptionInput = {
        location: propertyLocation,
        sizeSqft: validatedInput.sizeSqft,
        numRooms: validatedInput.numRooms,
        numBathrooms: validatedInput.numBathrooms,
        amenities: validatedInput.amenities,
    };

    const genkitComparisonInput: ComparePropertyToMarketInput = {
        propertyDetails: propertyDetailsString,
        predictedPrice: predictedPrice,
        marketData: mockMarketData,
    };

    // 3. Run AI flows in parallel for efficiency
    const [descriptionResult, comparisonResult] = await Promise.all([
        generatePropertyDescription(genkitDescriptionInput),
        comparePropertyToMarket(genkitComparisonInput)
    ]);

    return {
        predictedPrice,
        description: descriptionResult.description,
        comparison: comparisonResult.comparisonSummary,
        confidence: comparisonResult.confidenceScore,
    };
}
