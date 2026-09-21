/** Shared by HTML fields and server validation. */
export const formLimits = {
  name: 120,
  email: 254,
  phone: 40,
  organization: 200,
  role: 160,
  timeframe: 200,
  message: 4000,
} as const;
