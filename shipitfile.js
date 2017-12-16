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

  shipit.task('docker', function() {
      shipit.start('build');
      shipit.start('remove');
      shipit.start('create');
  });
  shipit.blTask('build', function() {
    return shipit.remote('docker build -t nodelover:v1 .', {
      cwd: '/home/nono/app/current',
    });
  });

  shipit.blTask('create', function() {
    return shipit.remote('docker run --name app nodelover:v1', {
      cwd: '/home/nono/app/current',
    });
  });

  shipit.blTask('remove', function() {
    return shipit.remote('docker stop app', {
      cwd: '/home/nono/app/current',
    }).then(() => {
      shipit.remote('docker rm app', {
        cwd: '/home/nono/app/current',
      });
    });
  });
};
