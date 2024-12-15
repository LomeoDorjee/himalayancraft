import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const catchErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message)
  } else {
    message = "Uncaught Error"
  }

  return message
}

export function currencyFormat(num: number) {
  const newnum: string = Number(num).toFixed(2)
  return '$' + newnum.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function enc(input: string): string {
  return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '.');
}

export function dec(input: string): string {
  input = input.replace(/-/g, '+').replace(/_/g, '/').replace(/\./g, '=');
  return atob(input);
}