import { vaultwarden } from "./src/vaultwarden.ts";
import { paperless } from "./src/paperless.ts";

if (import.meta.main === true) {
  await main();
}

async function main() {
  try {
    for (const script of Deno.args) {
      switch (script.toLowerCase()) {
        case "paperless":
          await paperless();
          break;
        case "vaultwarden":
          await vaultwarden();
          break;
        default:
          throw new Error(`${script} is not allowed`);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
    Deno.exit(1);
  }
}

export { paperless, vaultwarden };
