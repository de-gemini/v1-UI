const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Paste your arrays here:
const roomTypes = [
"https://www.emop.co.uk/static/images/certificate/presents.svg",

  // Google & Ecover
  "https://www.emop.co.uk/static/images/google-icon.png",
  "https://www.emop.co.uk/static/images/ecover_svg_mob.svg",

  // Reclean
  "https://www.emop.co.uk/static/images/reclean-wave.png",
  "https://www.emop.co.uk/static/images/reclean-employer.png",

  // Combined Shape
  "https://www.emop.co.uk/static/images/Combined_Shape.png",

  // Bot CTA background
  "https://www.emop.co.uk/static/images/bot_cta_bg_new.png",

  // Best/Last minute
  "https://www.emop.co.uk/static/images/best1.svg",
  "https://www.emop.co.uk/static/images/best2.svg",
  "https://www.emop.co.uk/static/images/best3.svg",
  "https://www.emop.co.uk/static/images/last_minute.svg"
];

const addOns = [
  { key: "fridge", label: "Fridge (inside)", estimatedTime: 30, icon: "https://www.emop.co.uk/static/images/steps_booking/fridge_inside.svg" },
  { key: "windows", label: "Windows (inside)", estimatedTime: 20, icon: "https://www.emop.co.uk/static/images/steps_booking/windows.svg" },
  { key: "ironing", label: "Ironing", estimatedTime: 60, icon: "https://www.emop.co.uk/static/images/steps_booking/Ironing.svg" },
  { key: "laundry", label: "Laundry", estimatedTime: 0, icon: "https://www.emop.co.uk/static/images/steps_booking/Laundry.svg", yesNo: true },
  { key: "microwave", label: "Microwave (inside)", estimatedTime: 10, icon: "https://www.emop.co.uk/static/images/steps_booking/microwave.svg" },
  { key: "kitchen_inside", label: "Kitchen (inside)", estimatedTime: 60, icon: "https://www.emop.co.uk/static/images/steps_booking/kitchen_inside.svg" },
  { key: "bed_making", label: "Bed making", estimatedTime: 10, icon: "https://www.emop.co.uk/static/images/steps_booking/bed_making.svg" },
  { key: "bookcase", label: "Bookcase", estimatedTime: 25, icon: "https://www.emop.co.uk/static/images/steps_booking/bookcase.svg" },
  { key: "oven", label: "Oven", estimatedTime: 30, icon: "https://www.emop.co.uk/static/images/steps_booking/Oven.svg", price: 25, yesNo: true },
  { key: "oven_grill", label: "Oven & Grill", estimatedTime: 45, icon: "https://www.emop.co.uk/static/images/steps_booking/Ovenandgrill.svg", price: 35, yesNo: true },
  { key: "outdoor", label: "Outdoor cleaning", estimatedTime: 0, icon: "https://www.emop.co.uk/static/images/bookAgain/Outdoor_cleaning.svg", yesNo: true },
];

// Combine all icons
const allIcons = [
  ...roomTypes.map(r => r)
];

// Create output directory
const outputDir = path.join(__dirname, 'downloaded-images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}




async function downloadImage(url, filename) {
  const filePath = path.join(outputDir, filename);
  try {
    const response = await axios.get(url, { responseType: 'stream' });
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (err) {
    console.error(`Failed to download ${url}: ${err.message}`);
  }
}

(async () => {
  for (const url of allIcons) {
    const filename = url.split('/').pop();
    console.log(`Downloading ${url} -> ${filename}`);
    await downloadImage(url, filename);
  }
  console.log('All images downloaded!');
})();