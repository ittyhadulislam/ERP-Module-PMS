
import fs from 'fs'

// Get today's date and format it as "Month day"
const today = new Date();
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const formattedDate = `${monthNames[today.getMonth()]} ${today.getDate()}`;

// Read the current build number from the package.json file
const packageJsonFile = "package.json";
const packageJson = JSON.parse(fs.readFileSync(packageJsonFile));
const versionString = packageJson.version;
const prevBuildNumber = parseInt(versionString.match(/Build (\d+)/)[1]);
const prevDate = versionString.match(/(.+), Build \d+/)[1];

// Increment the build number or reset it to 1 if it's a new day
let newBuildNumber;
if (prevDate === formattedDate) {
    newBuildNumber = prevBuildNumber + 1;
} else {
    newBuildNumber = 1;
}

packageJson.version = `${formattedDate}, Build ${newBuildNumber}`;
fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null, 2));

// Output the new version number
console.log(`New Version: ${formattedDate}, Build ${newBuildNumber}`);