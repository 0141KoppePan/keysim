const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("not enough args");
  console.log("Usage: node createColorway.js <name> <label>");
  process.exit(1);
}

const colorwayName = args[0];
const colorwayLabel = args[1];

const colorwaysDir = path.join(__dirname, "..", "config", "colorways");
const colorwaysJsPath = path.join(colorwaysDir, "colorways.js");
const templatePath = path.join(colorwaysDir, "colorway_template.json");
const newJsonPath = path.join(colorwaysDir, `colorway_${colorwayName}.json`);

console.log(`creating colorway: ${colorwayName}`);

// Check if already exists in colorways.js
if (fs.existsSync(colorwaysJsPath)) {
  const content = fs.readFileSync(colorwaysJsPath, "utf8");
  if (content.includes(`colorway_${colorwayName}`)) {
    console.error("colorway already exists");
    process.exit(1);
  }
}

// Create JSON from template
if (!fs.existsSync(templatePath)) {
  console.error("Template not found:", templatePath);
  process.exit(1);
}

let templateContent = fs.readFileSync(templatePath, "utf8");
let newJsonContent = templateContent
  .replace(/COLORWAY_NAME/g, colorwayName)
  .replace(/COLORWAY_LABEL/g, colorwayLabel);

fs.writeFileSync(newJsonPath, newJsonContent);

// Update colorways.js
if (fs.existsSync(colorwaysJsPath)) {
  let jsContent = fs.readFileSync(colorwaysJsPath, "utf8");

  // IMPORT replacement
  const importStatement = `import colorway_${colorwayName} from './colorway_${colorwayName}.json';\n//IMPORT`;
  jsContent = jsContent.replace("//IMPORT", importStatement);

  // APPEND replacement
  const appendStatement = `'${colorwayName}': colorway_${colorwayName},\n    //APPEND`;
  jsContent = jsContent.replace("//APPEND", appendStatement);

  fs.writeFileSync(colorwaysJsPath, jsContent);
} else {
  console.warn("colorways.js not found, skipping JS update.");
}

console.log("Successfully created colorway.");
