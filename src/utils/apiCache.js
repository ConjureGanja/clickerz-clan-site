// Module-level promise cache with TTL.
// Stores the Promise itself (not the resolved value) so concurrent callers
// share one in-flight request. Failed requests are evicted so retries can run.
const entries = new Map();

export function cachedFetch(key, ttlMs, loader) {
  const now = Date.now();
  const existing = entries.get(key);

  if (existing && now - existing.timestamp < ttlMs) {
    return existing.promise;
  }

  const promise = Promise.resolve()
    .then(loader)
    .catch((error) => {
      if (entries.get(key)?.promise === promise) {
        entries.delete(key);
      }
      throw error;
    });

  entries.set(key, { promise, timestamp: now });
  return promise;
}

export function invalidateCache(key) {
  entries.delete(key);
}
