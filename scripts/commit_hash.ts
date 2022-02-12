import fs from "fs/promises";
import path from "path";
const { execSync } = require("child_process");

const filePath = path.join(__dirname, "../app", "commit_hash.json");

function run(cmds: string): string {
  try {
    return execSync(cmds).toString();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function main() {
  const gitCommitHash = run(
    'git log -1 | grep ^commit | cut -d " " -f 2'
  ).replace(/[\n\r]/g, "");
  const obj = {
    commit_hash: gitCommitHash,
  };
  await fs.writeFile(filePath, JSON.stringify(obj));
}

main();
