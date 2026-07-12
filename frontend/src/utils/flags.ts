export function countryCodeToFlag(alpha2?: string):string {
    if (!alpha2) return '';
    return alpha2
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e0 + c.charCodeAt(0) - 65))
    .join("");
}