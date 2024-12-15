'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const profileSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters."),
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, "Name must be at least 2 characters"),
  contactNumber: z.string().refine((e) => !isNaN(Number(e)), {
    message: 'Contact number must be in number format!'
  }),
  reminderFrequency: z.enum(['daily', 'weekly', 'monthly']),
  transportationPreferences: z.string().min(1, "At least one transportation preference is required."),
  dietaryPreferences: z.string().min(1, "At least one dietary preference is required.")
});

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      email: '',
      name: '',
      contactNumber: '',
      reminderFrequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
      transportationPreferences: '',
      dietaryPreferences: '',
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    const confirmSubmit = window.confirm('Are you sure you want to continue?');
    if (!confirmSubmit) return; 

    setIsLoading(true);
    try {
      const transformedValues = {
        ...values,
        transportationPreferences: values.transportationPreferences.split(",").map((item) => item.trim()),
        dietaryPreferences: values.dietaryPreferences.split(",").map((item) => item.trim()),
      };

      const response = await fetch("api/profile/register", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(transformedValues),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to save profile");
      }
      
      const res = await response.json();
      console.log(`${res.email}`);
      console.log(`${res.generatedPassword}`);
      router.push("/login");
    } catch(error){
      console.error("Error saving profile: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input type="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="transportationPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transportation Preferences</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dietaryPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Preferences</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reminderFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reminder Frequency</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>
    </Form>
  );
}
