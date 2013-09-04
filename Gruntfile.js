module.exports = function(grunt) {
  var con = {
    zippath: 'build'
  }
  //console.log(grunt.option( "aa" ));
  // Project configuration.
  grunt.initConfig({
    //pkg: grunt.file.readJSON('<%= pro.name %>/package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      //compress: {
      //  files: {
      //    '/public/build/compress.js': [project + '/public/helloworld.js']
      //  },
      //  options: { 
      //    mangle: false //變數名稱不被簡化
      //  }
      //},
      build: {
        src:  '<%= pro.name %>/public/*.js',
        dest: '<%= pro.name %>/public/build/<%= pro.name %>.min.js'
      }
    },
    jshint: {
      all: [
        'src/*.js',
        //'<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    compress: {
      zip: {
        options: {
          archive: con.zippath + '/<%= pro.name %>.zip'
        },
        files: [
          //{expand: true, cwd: 'test/fixtures/', src: ['**/*']}
          //{expand: true, src: ['**/*'], dest: 'helloworld/'}
          {expand: true, src: ['<%= pro.name %>/**'], dest: '<%= pro.name %>'}
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'compress']);
  grunt.registerTask('run', function(proname, fun){
    grunt.config.set('pro', {name: proname});
    grunt.config.set('pkg', grunt.file.readJSON(proname + '/package.json'));
    switch (fun){
      case 'uglify':
        grunt.task.run('uglify');
        break;
      case 'compress':
        grunt.task.run('compress');
        break;
      default:
        grunt.task.run('default');
        break;
    }
  });
};
