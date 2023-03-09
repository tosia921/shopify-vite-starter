module.exports = {
  plugins: [
    require("cssnano")({
      preset: "default",
    }),
    require("autoprefixer"),
    require("postcss-preset-env")({
      stage: 2,
    }),
    require("precss"),
  ],
};
