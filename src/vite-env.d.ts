/// <reference types="vite/client" />
/// <reference types="vite-plugin.svgr/client" />

interface ImportMetaEnv {
  readonly VITE_TMDB_API_KEY: string;
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
