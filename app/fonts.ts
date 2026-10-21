import { Fraunces, Manrope } from "next/font/google";

export const display = Fraunces({ subsets: ["latin"], variable: "--f-display", weight: ["500", "600"] });
export const body = Manrope({ subsets: ["latin"], variable: "--f-body" });