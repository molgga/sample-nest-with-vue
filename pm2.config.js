/* eslint-disable */
const Config = {
  name: 'first-app',
  script: './dist/main.js',
  env: {
    HOST: '0.0.0.0',
    PORT: 3000,
  },
  instances: 1, // -1,
  exec_mode: 'cluster',
  // exec_mode: 'fork',
  // 오류 등으로 인해 재가동할 때 대기 시간. 재시도 횟수가 많아질 수록 증가(최대 15000ms)
  exp_backoff_restart_delay: 500,
  // 재시도 최소 업타임 체크는 10초. 10초 이상 올라오면 재시도 횟수는 초기화
  min_uptime: 10000,
  // 10번(9번) 재시도가 일어나면 오류로 간주.
  max_restarts: 10,
};

const apps = [Config];

module.exports = {
  apps,
};
