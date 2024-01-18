const path = require("path");
const fs = require("fs");
const child_process = require("child_process");

module.exports = {
  packagerConfig: {
    /**
     * Electron packager options:
     * https://electron.github.io/packager/main/interfaces/Options.html
     *
     * but you can not override the following options as they are set by Electron Forge internally.
     * dir
     * arch
     * platform
     * out
     * electronVersion
     *
     * See
     * https://www.electronforge.io/config/configuration
     */
    // asar: false,
    asar: { unpack: "*" },
    icon: "./src/assets/icons/ncma-icon", // no file extension required
    overwrite: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
  ],
  hooks: {
    packageAfterCopy: async (
      config,
      buildPath,
      electronVersion,
      platform,
      arch
    ) => {
      // install dotenv package workaround
      // electron-forge is not compatible with shared node_modules in npm workspaces

      console.log("This is the packageAfterCopy hook!");
      const src = path.join(__dirname, "src");
      const dst = buildPath;

      console.log(`${dst}`);

      // child_process.execSync(`cd ${dst}`, { stdio: [0, 1, 2] });
      // child_process.execSync("npm install dotenv", { stdio: [0, 1, 2] });
    },
  },
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
