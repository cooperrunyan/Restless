declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    readonly VITE_DEV_SERVER_HOST: string;
    readonly VITE_DEV_SERVER_PORT: string;
  }
}

declare module '*.module.scss' {
  const data: Record<string, string>;
  export default data;
}
