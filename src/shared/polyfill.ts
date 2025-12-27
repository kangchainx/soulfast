// Polyfill for import.meta.env
// This file is imported at the very top of index.ts to ensure it runs before any dependencies

if (typeof window !== 'undefined') {
  // @ts-ignore
  if (!window.import) {
     // @ts-ignore
     window.import = {};
  }
}

