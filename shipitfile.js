'use strict';

module.exports = function(shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/github-monitor',
      deployTo: '/home/nono/app',
      repositoryUrl: 'https://github.com/MiYogurt/deploy-egg-sample.git',
      ignores: [ '.git', 'node_modules' ],
      rsync: [ '--del' ],
      keepReleases: 2,
      key: './scripts/source.key',
      shallowClone: true,
    },
    staging: {
      servers: 'root@139.199.227.41',
    },
  });

  shipit.task('install', function() {
    return shipit.remote('npm install --prod', {
      cwd: '/home/nono/app/current',
    }).then(() => {
      shipit.start('stop')
      return shipit.start('run')
    });
  });

  shipit.task('run', function() {
    return shipit.remote('PORT=8080 npm start', {
      cwd: '/home/nono/app/current',
    });
  });

  shipit.blTask('stop', function() {
    return shipit.remote('npm run stop', {
      cwd: '/home/nono/app/current',
    });
  });
};
