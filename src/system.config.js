(function(global) {
  
  var plugin = 'bootstrap';
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'rxjs':                       'node_modules/rxjs',
    'mydatepicker':               'node_modules/mydatepicker',
    'jquery':                     'node_modules/jquery/dist/jquery.js',
    'timepicker':                 'node_modules/jquery-timepicker/jquery.timepicker.js',
    'angular2-modal':             'node_modules/angular2-modal' 
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'format':'register',
    'app':                        { main:'main',defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'mydatepicker':               { defaultExtension: 'js' },
    'ng2-datetime':               {defaultExtension: 'js'},
    'angular2-modal':             {main:'bundles/angular2-modal.umd',defaultExtension: 'js'}
  };
  map['angular2-modal/plugins/bootstrap'] = map['angular2-modal'] + '/bundles';
  packages['angular2-modal/plugins/bootstrap'] =  { defaultExtension:'js', main:'angular2-modal.bootstrap.umd'};

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'Http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);