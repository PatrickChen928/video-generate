import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';

const SOURCE_FOLDER_PATH = "/public/assets/{avatars,captions,music}/*.*";
const TARGET_FOLDER_PATH = "/lib";

export async function generateAssets() {
  try {
    const assets = await fg(path.join(process.cwd(), SOURCE_FOLDER_PATH));
    const result = {
      avatars: [],
      captions: [],
      music: []
    }
    assets.forEach(asset => {
      const type = asset.split('/').slice(-2, -1)[0];
      const filename = asset.split('/').slice(-1)[0];
      const slug = filename.split('.').slice(0, -1).join('.');
      result[type].push(slug);
    });
    fs.writeFileSync(path.join(process.cwd(), TARGET_FOLDER_PATH, 'video-assets.json'), JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  }
}

generateAssets()