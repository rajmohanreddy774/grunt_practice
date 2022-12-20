const webpackConfig = require("./webpack.config");

module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      files: ["Gruntfile.js", "src/hello.js", "test/**/*.js"],
      options: {
        globals: {
          jQuery: true,
        },
      },
    },
    watch: {
      files: ["src/*.html", "src/*.css", "src/*.js"],
      tasks: ["htmlmin", "cssmin", "uglify"],
      options: {
        livereload: true,
      },
    },
    uglify: {
      options: {
        banner: 'const b="<%= package.name %>";',
      },
      t1: {
        files: [
          {
            src: ["src/*.js"],
            dest: "build/helloworld.min.js",
          },
        ],
      },
    },
    cssmin: {
      target: {
        files: [
          {
            src: "src/Style.css",
            dest: "build/style.min.css",
          },
        ],
      },
    },
    htmlmin: {
      options: {
        collapseWhitespace: true,
      },
      target: {
        files: [
          {
            src: "src/index.html",
            dest: "build/index.min.html",
          },
        ],
      },
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: {
            path: "build/",
            options: {
              index: "index.html",
            },
          },
        },
      },
    },
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: true }, webpackConfig),
    },
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["jshint"]);
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.registerTask("compressJS", "uglify");
  grunt.registerTask("default", ["connect", "watch"]);
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.registerTask("compress", ["uglify", "cssmin", "htmlmin"]);
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.registerTask("myTask", "my basic task", function (a, b) {
    grunt.log.writeln(a, b);
    grunt.task.run("htmlmin");
    grunt.loadNpmTasks("grunt-webpack");
  });
};
