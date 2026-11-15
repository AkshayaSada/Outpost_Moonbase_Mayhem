const fs = require("fs");
const path = require("path");

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);

    if (full.includes("node_modules")) continue;

    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    try {
      const content = fs.readFileSync(full, "utf8").trim();

      if (
        content.startsWith("{") &&
        content.includes('"path"') &&
        content.includes('"text"')
      ) {
        const obj = JSON.parse(content);

        if (obj.text) {
          let text = obj.text;

          text = text
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;/g, "&");

          fs.writeFileSync(full, text);

          console.log("Fixed:", full);
        }
      }
    } catch (err) {
      console.log("Skipped:", full);
    }
  }
}

walk(__dirname);

console.log("Done!");