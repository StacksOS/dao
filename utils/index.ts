import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPercentage = (totalSupply: number, totalVotes: number) => {
  if (isNaN((totalVotes / totalSupply) * 100)) {
    return 0;
  }
  return (totalVotes / totalSupply) * 100;
};
