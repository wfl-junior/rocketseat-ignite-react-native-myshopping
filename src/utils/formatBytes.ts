function fixBytes(bytes: number) {
  return bytes.toFixed(2);
}

export function formatBytes(bytes: number) {
  if (bytes >= 1000000000) {
    return `${fixBytes(bytes / 1000000000)}GB`;
  }

  if (bytes >= 1000000) {
    return `${fixBytes(bytes / 1000000)}MB`;
  }

  if (bytes >= 1000) {
    return `${fixBytes(bytes / 1000)}KB`;
  }

  return `${fixBytes(bytes)}B`;
}
