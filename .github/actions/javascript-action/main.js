const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

function run() {
  const bucket = core.getInput("bucket", { require: true });
  const bucketRegion = core.getInput("bucket-region", { require: true });
  const disFolder = core.getInput("dist-folder", { require: true });

  //upload file to s3 by aws cli command
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${disFolder} ${s3Uri} --region ${bucketRegion}`);

  core.notice("javascript custom action");
  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazon.com`;
  core.setOutput("website-url", websiteUrl);
}

run();
