"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed, Bath, Square, MapPin, Sparkles, Loader2 } from "lucide-react";
import type { PropertyFormData } from "@/app/actions";

const formSchema = z.object({
  location: z.string().min(2, "Location must be at least 2 characters."),
  sizeSqft: z.coerce.number().min(100, "Size must be at least 100 sqft."),
  numRooms: z.coerce.number().min(1, "Must have at least 1 room.").max(20, "Cannot exceed 20 rooms."),
  numBathrooms: z.coerce.number().min(1, "Must have at least 1 bathroom.").max(20, "Cannot exceed 20 bathrooms."),
  amenities: z.string().min(3, "Please list at least one amenity."),
});

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
  isLoading: boolean;
}

export function PropertyForm({ onSubmit, isLoading }: PropertyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "Yola",
      sizeSqft: 1200,
      numRooms: 3,
      numBathrooms: 2,
      amenities: "Borehole, Standby generator, Air conditioning",
    },
  });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Property Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (in Adamawa State)</FormLabel>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="e.g., Yola" {...field} className="pl-9" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sizeSqft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size (sqft)</FormLabel>
                    <div className="relative">
                      <Square className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input type="number" placeholder="1200" {...field} className="pl-9" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numRooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rooms</FormLabel>
                    <div className="relative">
                      <Bed className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input type="number" placeholder="3" {...field} className="pl-9" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="numBathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bathrooms</FormLabel>
                    <div className="relative">
                      <Bath className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input type="number" placeholder="2" {...field} className="pl-9" />
                      </FormControl>
                    </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Amenities</FormLabel>
                  <div className="relative">
                    <Sparkles className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Pool, Fireplace, etc."
                        className="resize-none pl-9"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Evaluating...
                </>
              ) : (
                'Evaluate Property'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
