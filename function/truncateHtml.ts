export function truncateHtml(content: any, maxLength: number) {
  if (typeof content !== "string") {
    return content;
  }

  if (content.length > maxLength) {
    return `${content.slice(0, maxLength)}...`;
  }

  return content;
}
