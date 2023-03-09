module.exports = {
  plugins: [
    require("postcss-nested"),
    require("autoprefixer"),
    require("cssnano")({
      preset: "default",
    }),
    // require("postcss-preset-env")({
    //   stage: 2,
    // }),
    // require("precss"),
  ],
};
