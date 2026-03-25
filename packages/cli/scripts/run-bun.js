#!/usr/bin/env node

import { spawn, spawnSync } from 'node:child_process';

const args = process.argv.slice(2);

const check = spawnSync('bun', ['--version'], {
  stdio: 'ignore',
  shell: process.platform === 'win32',
});

if (check.status !== 0) {
  console.error('Bun is required to run this command, but it is not available on PATH.');
  console.error('Install Bun from https://bun.sh or ensure setup-bun runs before this step.');
  process.exit(check.status ?? 1);
}

const child = spawn('bun', args, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error('Failed to start Bun:', error.message);
  process.exit(1);
});
