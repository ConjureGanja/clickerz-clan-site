const BIDI_AND_INVISIBLE = new Set([
  0x200b, 0x200c, 0x200d, 0x200e, 0x200f,
  0x202a, 0x202b, 0x202c, 0x202d, 0x202e,
  0x2060, 0x2061, 0x2062, 0x2063, 0x2064, 0x2065, 0x2066, 0x2067, 0x2068, 0x2069,
  0xfeff,
]);

export function stripUnsafeText(value) {
  let cleaned = "";
  for (const char of String(value ?? "")) {
    const code = char.codePointAt(0);
    if (code <= 0x1f || code === 0x7f || BIDI_AND_INVISIBLE.has(code)) continue;
    cleaned += char;
  }
  return cleaned;
}
