import fs from "fs";
import path from "path";
import { getRequestConfig } from "next-intl/server";
import { serverJar } from "@/features/cookies/server-jar";

const isDevEnvironment = process.env.NODE_ENV === "development";

const MESSAGES_ROOT_DIR = path.join(
  process.cwd(),
  "src/features/i18n/messages"
);

async function buildMessagesFromDirectory(dirPath: string) {
  const messages: Record<string, any> = {};

  try {
    const files = await fs.promises.readdir(dirPath, { withFileTypes: true });

    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dirPath, file.name);

        if (file.isDirectory()) {
          // If it's a directory, recursively build the nested object
          messages[file.name] = await buildMessagesFromDirectory(filePath);
        } else if (file.isFile() && file.name.endsWith(".json")) {
          // If it's a JSON file, read and parse it
          const fileContent = await fs.promises.readFile(filePath, "utf-8");
          messages[path.basename(file.name, ".json")] = JSON.parse(fileContent);
        }
      })
    );
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }

  return messages;
}

async function getDevMessages() {
  const locale = await serverJar.locale.get();
  const localeDir = path.join(MESSAGES_ROOT_DIR, locale);
  const messages = await buildMessagesFromDirectory(localeDir);

  return {
    locale,
    messages,
  };
}

export default getRequestConfig(async () => {
  const locale = await serverJar.locale.get();

  const messages = isDevEnvironment
    ? (await getDevMessages()).messages
    : (await import(`./locales/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
