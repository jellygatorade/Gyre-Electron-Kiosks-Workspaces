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
    icon: "./src/common/assets/icons/ncma-icon", // no file extension required
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
    ) => {},
  },
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
