'use server';

/**
 * @fileOverview Generates a motivational message or tip for the user to stay on track with their goals.
 *
 * - generateMotivationMessage - A function that generates a motivational message.
 * - GenerateMotivationMessageInput - The input type for the generateMotivationMessage function.
 * - GenerateMotivationMessageOutput - The return type for the generateMotivationMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMotivationMessageInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
  goal: z.string().describe('The user\'s goal.'),
  progressPercentage: z.number().describe('The percentage of progress the user has made towards their goal.'),
  consistencyScore: z.number().describe('A score representing the user\'s consistency in working towards their goal.'),
});
export type GenerateMotivationMessageInput = z.infer<typeof GenerateMotivationMessageInputSchema>;

const GenerateMotivationMessageOutputSchema = z.object({
  message: z.string().describe('A motivational message or tip for the user.'),
});
export type GenerateMotivationMessageOutput = z.infer<typeof GenerateMotivationMessageOutputSchema>;

export async function generateMotivationMessage(input: GenerateMotivationMessageInput): Promise<GenerateMotivationMessageOutput> {
  return generateMotivationMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMotivationMessagePrompt',
  input: {schema: GenerateMotivationMessageInputSchema},
  output: {schema: GenerateMotivationMessageOutputSchema},
  prompt: `You are an AI assistant designed to provide motivational messages to users who are at risk of falling behind on their goals.

  The user's name is: {{userName}}
  The user\'s goal is: {{goal}}
  The user\'s progress percentage is: {{progressPercentage}}%
  The user\'s consistency score is: {{consistencyScore}}

  Based on this information, generate a motivational message or tip to help the user stay on track. The message should be encouraging, specific to their goal and progress, and no more than 50 words.
  `,
});

const generateMotivationMessageFlow = ai.defineFlow(
  {
    name: 'generateMotivationMessageFlow',
    inputSchema: GenerateMotivationMessageInputSchema,
    outputSchema: GenerateMotivationMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
