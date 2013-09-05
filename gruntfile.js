module.exports = function(grunt) {
  var CONFIG = {
    argu: [],
    zippath: 'build',
    tasks: ['uglify', 'compress'],
    pro: process.argv[2].replace(/:.*/,'')
  }
  var config = CONFIG;
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
        src:  '<%= pro.name %>/public/js/*.js',
        dest: '<%= pro.name %>/public/js/build/<%= pro.name %>.min.js'
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
          archive: config.zippath + '/<%= pro.name %>.zip'
        },
        files: [
          //{expand: true, cwd: 'test/fixtures/', src: ['**/*']}
          //{expand: true, src: ['**/*'], dest: 'helloworld/'}
          {expand: true, src: ['<%= pro.name %>/**'], dest: '<%= pro.name %>'}
        ]
      }
    },
    watch: {
      options: {
        // Start a live reload server on the default port 35729
        // client website insert into <script src="http://localhost:35729/livereload.js"></script>
        livereload: true,
      },
      css: {
        files: ['**/*.css'],
      },
      js: {
        files: ['**/*.js'],
      },
      html: {
        files: ['**/*.html'],
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask(config.pro, function() {CONFIG.argu = arguments; grunt.task.run('default')});
  //grunt.registerTask('run', function() {CONFIG.argu = arguments; grunt.task.run('default')});
  grunt.registerTask('default', function () {
    var proname, task, tasks, con;
    con = CONFIG;
    if (con.pro == "livereload") { grunt.task.run('watch'); return;}
    tasks = con.tasks;
    task = con.argu[0];
    proname = con.pro;
    grunt.config.set('pro', {name: proname});
    grunt.config.set('pkg', grunt.file.readJSON(proname + '/package.json'));
    switch (task){
      case 'uglify':
        grunt.task.run('uglify');
        break;
      case 'compress':
        grunt.task.run('compress');
        break;
      default:
        grunt.task.run(tasks);
        break;
    }
  });
};
