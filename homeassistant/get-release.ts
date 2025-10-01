import { Octokit } from "npm:octokit";
import { z } from "jsr:@zod/zod";
import { createActionAuth } from "npm:@octokit/auth-action";
import { AsyncSeq } from "./AsyncSeq.ts";

const octokit = new Octokit({
  authStrategy: createActionAuth,
});

const today = new Date();

const argsSchema = z.object({
  count: z.coerce.number().default(1),
  majors: z.string().default(`${today.getUTCFullYear()}`).pipe(
    z.transform((val) => val.split(",")),
  ),
});
const jsonParser = z.preprocess((val) => {
  if (typeof val === "string") {
    return JSON.parse(val);
  }
  return val;
}, argsSchema);

const { majors, count } = jsonParser.parse(Deno.env.toObject());

const iterator = AsyncSeq.from(octokit.paginate.iterator(
  "GET /repos/{owner}/{repo}/releases",
  {
    owner: "home-assistant",
    repo: "core",
    per_page: 100,
  },
))
  .flatten(({ data }) => data)
  .filter(({ draft, prerelease }) => {
    if (draft === true) {
      return false;
    }
    if (prerelease === true) {
      return false;
    }
    return true;
  }).map(({ tag_name }) => {
    return tag_name;
  }).filter((tag) => {
    for (const major of majors) {
      if (tag.startsWith(major)) {
        return true;
      }
    }
    return false;
  });

const tags = await iterator.take(count);

console.log(JSON.stringify({ tag: ["latest", ...tags] }));
