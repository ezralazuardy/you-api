export function getNameInitialImageUrl(name: string): string {
  return `https://ui-avatars.com/api?background=random&bold=true&name=${encodeURI(name)}`;
}
