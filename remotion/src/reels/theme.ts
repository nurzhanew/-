import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontFamily = "Montserrat";

// Fonts are vendored in public/fonts so renders don't depend on Google Fonts being reachable.
for (const weight of ["600", "800", "900"]) {
  for (const subset of ["cyrillic", "latin"]) {
    loadFont({
      family: fontFamily,
      url: staticFile(`fonts/montserrat-${weight}-${subset}.woff2`),
      weight,
    });
  }
}

export const colors = {
  ink: "#0B0B0F",
  white: "#FFFFFF",
  accent: "#FFD400",
  danger: "#FF3B30",
  success: "#34C759",
};
