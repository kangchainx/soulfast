export const colors = {
  background: "#0F172A", // Dark slate/blue for deep focus
  surface: "#1E293B",
  primary: "#38BDF8", // Sky blue for calm/trust
  secondary: "#818CF8", // Indigo
  text: {
    primary: "#F8FAFC",
    secondary: "#94A3B8",
    muted: "#64748B",
  },
  status: {
    success: "#4ADE80", // Green
    warning: "#FBBF24", // Amber
    error: "#F87171", // Red
  },
  phases: {
      fasting: "#0F172A", // Deep Blue (Existing)
      eating: "#451A03", // Energetic Orange/Brown (New)
  }
} as const;
