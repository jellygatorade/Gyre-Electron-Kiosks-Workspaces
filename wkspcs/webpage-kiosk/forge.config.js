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
    icon: "./src/common/assets/icons/ncma-icon-orange-white", // no file extension required
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
    packageAfterCopy: async (config, buildPath, electronVersion, platform, arch) => {
      // install deps packages workaround
      // electron-forge is not compatible(?) with shared node_modules in npm workspaces

      console.log("Running packageAfterCopy hook");

      const src = path.join(__dirname, "src");
      const dist = buildPath;

      console.log(`buildPath is ${dist}`);

      child_process.execSync(`cd ${dist} && npm install --omit=dev`, {
        stdio: [0, 1, 2],
      });
    },
  },
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
