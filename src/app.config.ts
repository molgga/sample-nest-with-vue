export function createConfigEnv() {
  const { CONFIG_ENV } = process.env;
  return { envFilePath: `.env${CONFIG_ENV ? `.${CONFIG_ENV}` : ''}` };
}