import * as migration_20261010_145602_initial from './20261010_145602_initial';

export const migrations = [
  {
    up: migration_20261010_145602_initial.up,
    down: migration_20261010_145602_initial.down,
    name: '20261010_145602_initial'
  },
];
