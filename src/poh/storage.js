const KEY = "clickerz-poh-planner-v1";

export function readStore() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.current?.floors?.ground) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeStore(store) {
  localStorage.setItem(KEY, JSON.stringify(store));
}
