import { z } from 'zod'

export const tools = {
  saveContact: {
    description: 'Save a visitor contact when they share their name and email',
    inputSchema: z.object({
      name: z.string().describe('The visitor full name'),
      email: z.string().email().describe('The visitor email address'),
      intent: z.enum(['recruiter', 'hiring_manager', 'collaborator', 'other'])
        .describe('The visitor reason for reaching out')
    }),
    execute: async ({ name, email, intent }: { name: string; email: string; intent: string }) => {
      return { success: true, message: `Got it! I'll make sure John follows up with ${name}.` }
    }
  },

  fetchProfile: {
    description: "Fetch John's full profile when a visitor asks about his background or skills",
    inputSchema: z.object({
      placeholder: z.string().optional()
    }),
    execute: async () => {
      return {
        name: 'John Vincent Reyes',
        role: 'Full Stack Developer',
        skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AI/ML'],
        available: true
      }
    }
  },

  triggerBooking: {
    description: 'Trigger a meeting booking when a visitor wants to schedule time with John',
    inputSchema: z.object({
      visitorName: z.string().describe('The name of the visitor requesting a booking')
    }),
    execute: async ({ visitorName }: { visitorName: string }) => {
      return { success: true, message: `Booking requested for ${visitorName}. John will be in touch shortly!` }
    }
  }
}