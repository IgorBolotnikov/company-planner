export const CONFIG = {
  ENV: getEnv("NODE_ENV"),
};

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined && defaultValue !== undefined) {
    return defaultValue;
  }
  if (value === undefined) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
}
