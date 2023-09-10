import { copy, join } from "../deps.ts";
import {
  backupDb,
  create7zip,
  deleteOldBackups,
  uploadRclone,
} from "./common.ts";

export async function vaultwarden() {
  const backupDir = await Deno.makeTempDir();
  await backupPostgres(backupDir);
  await backupAttachments(backupDir);
  await backupSends(backupDir);
  await backupKeys(backupDir);
  const zipFile = await create7zip(backupDir);
  await uploadRclone(zipFile, "vaultwarden");
  // await deleteOldBackups("vaultwarden");
}

async function backupPostgres(tmpDir: string) {
  const to = join(tmpDir, "postgres");
  await Deno.mkdir(to, { recursive: true });
  return await backupDb(to);
}

async function backupAttachments(tmpDir: string) {
  const from = Deno.env.get("ATTACHMENTS_DIR") || `/attachments`;
  const to = join(tmpDir, "attachments");
  await Deno.mkdir(to, { recursive: true });
  return await copy(from, to, { overwrite: true });
}

async function backupSends(tmpDir: string) {
  const from = Deno.env.get("SENDS_DIR") || `/sends`;
  const to = join(tmpDir, "sends");
  await Deno.mkdir(to, { recursive: true });
  return await copy(from, to, { overwrite: true });
}

async function backupKeys(tmpDir: string) {
  const from = Deno.env.get("KEYS_DIR") || `/keys`;
  const to = join(tmpDir, "keys");
  await Deno.mkdir(to, { recursive: true });
  return await copy(from, to, { overwrite: true });
}
