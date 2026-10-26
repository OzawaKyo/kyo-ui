let nextId = 0;

/**
 * Returns a document-unique id. Ids are generated in creation order, so server and client
 * produce the same sequence for the same render and hydration stays consistent.
 */
export function uniqueId(prefix: string): string {
  return `${prefix}-${nextId++}`;
}
