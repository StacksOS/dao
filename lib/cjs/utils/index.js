"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPercentage = exports.cn = void 0;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
const getPercentage = (totalSupply, totalVotes) => {
    if (isNaN((totalVotes / totalSupply) * 100)) {
        return 0;
    }
    return (totalVotes / totalSupply) * 100;
};
exports.getPercentage = getPercentage;
