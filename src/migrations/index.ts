import * as migration_20261010_145602_initial from './20261010_145602_initial';
import * as migration_20261010_153529_media_storage_prefix from './20261010_153529_media_storage_prefix';

export const migrations = [
  {
    up: migration_20261010_145602_initial.up,
    down: migration_20261010_145602_initial.down,
    name: '20261010_145602_initial',
  },
  {
    up: migration_20261010_153529_media_storage_prefix.up,
    down: migration_20261010_153529_media_storage_prefix.down,
    name: '20261010_153529_media_storage_prefix'
  },
];
