module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      'public/dist/client.js': ['public/client/*.js'],
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      client: {
        files: {
          'public/dist/client.min.js': ['public/dist/client.js']
        }
      }
    },

    eslint: {
      target: [
        '*.js', '**/*.js', '**/**/*.js'
      ]
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    clean: {
      js: ['public/dist/*.js']
    },

    shell: {
      prodServer: {
      }
    },

    gitadd: {
      task: {
        options: {
          all: true
        } 
      }
    },

    gitcommit: {
      task: {
      }
    },

    gitpush: {
      task: {
        options: {
          remote: 'live',
          branch: 'master'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build-watch', function(target) {
    grunt.task.run([ 'build', 'watch' ]);
  });

  grunt.registerTask('build', [
    'eslint', 'test', 'concat', 'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'clean', 'build'
  ]);

  grunt.registerTask('deploy --prod', [
    'clean', 'build', 'gitadd', 'gitcommit', 'gitpush'
  ]);
};
