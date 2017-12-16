config="Host *\n
  \tStrictHostKeyChecking no\n
  \tUserKnownHostsFile=/dev/null"

echo $config >> /etc/ssh/ssh_config
