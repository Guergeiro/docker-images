import { Octokit } from "npm:octokit";
import { createActionAuth } from "npm:@octokit/auth-action";

const octokit = new Octokit({
  authStrategy: createActionAuth,
});

const { data: release } = await octokit.rest.repos.getLatestRelease({
  owner: "home-assistant",
  repo: "core",
});

console.log(JSON.stringify({ tag: [release.tag_name] }));
