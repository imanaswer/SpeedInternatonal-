import { z } from "zod";

export const modes = ["Air freight", "Ocean freight", "Land transport", "Not sure yet"] as const;

export const quoteSchema = z.object({
  origin: z.string().trim().min(2, "Tell us where the cargo starts").max(120),
  destination: z.string().trim().min(2, "Tell us where it is going").max(120),
  mode: z.enum(modes),
  weight: z.string().trim().max(120).optional().or(z.literal("")),
  cargo: z.string().trim().min(5, "A short description helps us quote accurately").max(2000),
  name: z.string().trim().min(2, "Your name").max(120),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  contact: z.string().trim().min(5, "An email or WhatsApp number so we can reply").max(160),
  // Honeypot: real users leave this empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
