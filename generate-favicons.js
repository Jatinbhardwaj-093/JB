// Script to generate favicons from cicada.png
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
  "src/assets/images/profileImage/navbar_logo.png"
);

async function generateFavicons() {
  try {
    // Create white background images in different sizes
    const sizes = [16, 32, 64, 180];

    for (const size of sizes) {
      const outputFilename =
        size === 64
          ? "favicon.png"
          : size === 180
          ? "apple-touch-icon.png"
          : `favicon-${size}x${size}.png`;

      // Create a white background
      await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
      })
        .composite([
          {
            // Resize and overlay the cicada image
            input: await sharp(SOURCE_IMAGE)
              .resize({
                width: Math.round(size * 0.8),
                height: Math.round(size * 0.8),
                fit: "contain",
                background: { r: 255, g: 255, b: 255, alpha: 0 },
              })
              .toBuffer(),
            gravity: "center",
          },
        ])
        .png()
        .toFile(`public/${outputFilename}`);
    }

    console.log("✅ Favicons generated successfully!");
  } catch (error) {
    console.error("❌ Error generating favicons:", error);
  }
}

generateFavicons();
