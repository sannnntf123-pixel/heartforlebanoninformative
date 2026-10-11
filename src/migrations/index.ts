import * as migration_20261010_145602_initial from './20261010_145602_initial';
import * as migration_20261010_153529_media_storage_prefix from './20261010_153529_media_storage_prefix';
import * as migration_20261010_165521_events_single_date_gallery_no_signup from './20261010_165521_events_single_date_gallery_no_signup';
import * as migration_20261011_144712_add_featured_events from './20261011_144712_add_featured_events';
import * as migration_20261011_145629_fix_featured_event_photos from './20261011_145629_fix_featured_event_photos';
import * as migration_20261011_151256_add_more_events from './20261011_151256_add_more_events';
import * as migration_20261011_152513_events_show_on_home from './20261011_152513_events_show_on_home';

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
    name: '20261011_144712_add_featured_events',
  },
  {
    up: migration_20261011_145629_fix_featured_event_photos.up,
    down: migration_20261011_145629_fix_featured_event_photos.down,
    name: '20261011_145629_fix_featured_event_photos',
  },
  {
    up: migration_20261011_151256_add_more_events.up,
    down: migration_20261011_151256_add_more_events.down,
    name: '20261011_151256_add_more_events',
  },
  {
    up: migration_20261011_152513_events_show_on_home.up,
    down: migration_20261011_152513_events_show_on_home.down,
    name: '20261011_152513_events_show_on_home'
  },
];
