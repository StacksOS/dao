import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export const getPercentage = (totalSupply, totalVotes) => {
    if (isNaN((totalVotes / totalSupply) * 100)) {
        return 0;
    }
    return (totalVotes / totalSupply) * 100;
};
