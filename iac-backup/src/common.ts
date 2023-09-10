import { join } from "../deps.ts";

const decoder = new TextDecoder();

export async function create7zip(inputDir: string) {
  const ZIP_PASSWORD = Deno.env.get("ZIP_PASSWORD") || "password";
  const ZIP_TEMP_DIR = await Deno.makeTempDir();
  const ZIP_FILENAME = join(ZIP_TEMP_DIR, `backup.${now()}.7z`);

  const args = [
    "a",
    "-t7z",
    "-m0=lzma2",
    "-mx=9",
    "-mfb=64",
    "-md=32m",
    "-ms=on",
    "-mhe=on",
    `-p${ZIP_PASSWORD}`,
    `${ZIP_FILENAME}`,
    `${inputDir}/*`,
  ];
  const p = new Deno.Command("7z", { args });

  const { code, stderr, stdout } = await p.output();
  if (code !== 0) {
    throw new Error(decoder.decode(stderr));
  }
  console.log(decoder.decode(stdout));
  return ZIP_FILENAME;
}

export async function backupDb(to: string) {
  const PG_HOST = Deno.env.get("PG_HOST");
  const PG_PORT = parseInt(Deno.env.get("PG_PORT") || "5432");
  const PG_DBNAME = Deno.env.get("PG_DBNAME") || "postgres";
  const PG_USERNAME = Deno.env.get("PG_USERNAME") || "postgres";
  const PG_PASSWORD = Deno.env.get("PG_PASSWORD") || "postgres";

  const BACKUP_FILE = join(to, `${PG_DBNAME}_dump.sql`);

  const args = [
    "-Fc",
    "-d",
    `${PG_DBNAME}`,
    "-h",
    `${PG_HOST}`,
    "-p",
    `${PG_PORT}`,
    "-U",
    `${PG_USERNAME}`,
    "-f",
    `${BACKUP_FILE}`,
  ];

  const p = new Deno.Command("pg_dump", {
    args,
    env: {
      PGPASSWORD: PG_PASSWORD,
    },
  });

  const { code, stderr, stdout } = await p.output();
  if (code !== 0) {
    throw new Error(decoder.decode(stderr));
  }
  console.log(decoder.decode(stdout));
}

export async function uploadRclone(zipFile: string, directory: string) {
  const args = [
    "copy",
    "--s3-no-check-bucket",
    zipFile,
    s3FinalName(directory),
    "--progress",
  ];
  const p = new Deno.Command("rclone", { args });

  const { code, stderr, stdout } = await p.output();
  if (code !== 0) {
    throw new Error(decoder.decode(stderr));
  }
  console.log(decoder.decode(stdout));
}

export async function deleteOldBackups(directory: string) {
  const BACKUP_KEEP_DAYS = parseInt(Deno.env.get("BACKUP_KEEP_DAYS") || "7");

  const args = [
    "lsf",
    s3FinalName(directory),
    "--min-age",
    `${BACKUP_KEEP_DAYS}d`,
  ];

  const p = new Deno.Command("rclone", { args });

  const { code, stdout, stderr } = await p.output();

  if (code !== 0) {
    throw new Error(decoder.decode(stderr));
  }
  const str = new TextDecoder().decode(stdout);
  const files = str.split("\n").filter(function (file) {
    return file.trim().length !== 0;
  });

  const promises = files.map(function (file) {
    return deleteBackup(`${s3FinalName(directory)}/${file}`);
  });

  const results = await Promise.allSettled(promises);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error(result.reason);
    }
  }
}

async function deleteBackup(file: string) {
  const args = [
    "delete",
    file,
  ];
  const p = new Deno.Command("rclone", { args });

  const { code, stderr, stdout } = await p.output();
  if (code !== 0) {
    throw new Error(decoder.decode(stderr));
  }
  console.log(decoder.decode(stdout));
}

function s3FinalName(directory: string) {
  const remoteName = Deno.env.get("RCLONE_REMOTE_NAME") || "r2";

  return `${remoteName}:lisbon-brenosalles-com/${directory}`;
}

export function now() {
  return new Date().toISOString().slice(0, 10).replaceAll("-", "_");
}
