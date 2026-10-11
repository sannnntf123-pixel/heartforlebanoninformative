import * as migration_20261010_145602_initial from './20261010_145602_initial';
import * as migration_20261010_153529_media_storage_prefix from './20261010_153529_media_storage_prefix';
import * as migration_20261010_165521_events_single_date_gallery_no_signup from './20261010_165521_events_single_date_gallery_no_signup';
import * as migration_20261011_144712_add_featured_events from './20261011_144712_add_featured_events';

export const migrations = [
  {
    up: migration_20261010_145602_initial.up,
    down: migration_20261010_145602_initial.down,
    name: '20261010_145602_initial',
  },
  {
    up: migration_20261010_153529_media_storage_prefix.up,
    down: migration_20261010_153529_media_storage_prefix.down,
    name: '20261010_153529_media_storage_prefix',
  },
  {
    up: migration_20261010_165521_events_single_date_gallery_no_signup.up,
    down: migration_20261010_165521_events_single_date_gallery_no_signup.down,
    name: '20261010_165521_events_single_date_gallery_no_signup',
  },
  {
    up: migration_20261011_144712_add_featured_events.up,
    down: migration_20261011_144712_add_featured_events.down,
    name: '20261011_144712_add_featured_events'
  },
];
