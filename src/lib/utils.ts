import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentDate() {
  const today = new Date();

  // Get day, month, and year components
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
  const year = String(today.getFullYear()); // Get last two digits of the year

  // Format the date as dd/mm/yy
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

