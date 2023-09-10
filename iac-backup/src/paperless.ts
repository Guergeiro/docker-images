import { copy, join } from "../deps.ts";
import {
  backupDb,
  create7zip,
  deleteOldBackups,
  uploadRclone,
} from "./common.ts";

export async function paperless() {
  const backupDir = await Deno.makeTempDir();
  await backupPostgres(backupDir);
  await backupMedia(backupDir);
  const zipFile = await create7zip(backupDir);
  await uploadRclone(zipFile, "paperless");
  // await deleteOldBackups("paperless");
}

async function backupPostgres(tmpDir: string) {
  const to = join(tmpDir, "postgres");
  await Deno.mkdir(to, { recursive: true });
  return await backupDb(to);
}

async function backupMedia(tmpDir: string) {
  const from = Deno.env.get("MEDIA_DIR") || `/media`;
  const to = join(tmpDir, "media");
  await Deno.mkdir(to, { recursive: true });
  return await copy(from, to, { overwrite: true });
}
