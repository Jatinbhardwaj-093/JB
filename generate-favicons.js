// Script to generate favicons from GitHub profile picture
import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the public directory exists
if (!fs.existsSync("public")) {
  fs.mkdirSync("public");
}

const SOURCE_IMAGE = path.join(
  __dirname,
  "src/assets/images/favicon/gihubpic.png"
);

async function generateFavicons() {
  try {
    console.log(`🔍 Looking for source image: ${SOURCE_IMAGE}`);

    // Check if source file exists
    if (!fs.existsSync(SOURCE_IMAGE)) {
      console.error(`❌ Source image not found: ${SOURCE_IMAGE}`);
      return;
    }

    console.log(`✅ Source image found!`);

    // Create favicon images in different sizes
    const sizes = [16, 32, 64, 180];

    for (const size of sizes) {
      const outputFilename =
        size === 64
          ? "favicon.png"
          : size === 180
          ? "apple-touch-icon.png"
          : `favicon-${size}x${size}.png`;

      console.log(`🎨 Generating ${outputFilename} (${size}x${size})...`);

      // Create favicon from GitHub profile picture
      await sharp(SOURCE_IMAGE)
        .resize(size, size, {
          fit: "cover",
          position: "center",
        })
        .png()
        .toFile(`public/${outputFilename}`);

      console.log(`✅ Created: ${outputFilename}`);
    }

    // Create legacy ICO favicon (32x32 for better compatibility)
    console.log(`🎨 Generating favicon.ico (32x32)...`);
    await sharp(SOURCE_IMAGE)
      .resize(32, 32, {
        fit: "cover",
        position: "center",
      })
      .toFormat("png")
      .toFile(`public/favicon.ico`);
    console.log(`✅ Created: favicon.ico`);

    console.log(
      "🎉 All favicons generated successfully from GitHub profile picture!"
    );
  } catch (error) {
    console.error("❌ Error generating favicons:", error);
  }
}

generateFavicons();
