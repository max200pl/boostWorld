let mix = require("laravel-mix");
mix.override((config) => {
  delete config.watchOptions;
}); // игнорирование node_modules файлов на просмотр изменений
mix
  .js("resources/js/app.js", "public/js")
  .sass("resources/sass/app.scss", "public/css")
  .browserSync({
    // proxy: "localhost:8080",
    watch: true,
    server: "./public",
    files: [
      "./public/**/*.html",
      "./public/css/**/*.css",
      "./public/js/**/*.js",
    ],
  });
