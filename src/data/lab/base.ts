import type { LessonBase, ModuleBase } from '../types';

/**
 * Structure of the Photography School: modules (with level) and the ordered lessons in each.
 * Lesson texts live in el.ts / en.ts (and el2.ts / en2.ts for the newer lessons).
 */
export const MODULE_BASE: ModuleBase[] = [
  { id: 'light', level: 1, icon: 'Sun' },
  { id: 'exposure', level: 1, icon: 'Aperture' },
  { id: 'comp-basics', level: 1, icon: 'Grid3X3' },
  { id: 'focus-dof', level: 2, icon: 'Focus' },
  { id: 'metering', level: 2, icon: 'Gauge' },
  { id: 'comp-advanced', level: 2, icon: 'Shapes' },
  { id: 'lenses', level: 3, icon: 'ScanSearch' },
  { id: 'editing', level: 3, icon: 'SlidersHorizontal' },
];

export const LESSON_BASE: LessonBase[] = [
  /* Level 1 — Light */
  { id: 'exp-light', module: 'light', widget: 'lightdir' },
  { id: 'light-quality', module: 'light' },
  { id: 'light-time', module: 'light' },
  { id: 'exp-whitebalance', module: 'light', widget: 'whitebalance' },

  /* Level 1 — Exposure */
  { id: 'exp-what', module: 'exposure' },
  { id: 'exp-stops', module: 'exposure', widget: 'stops' },
  { id: 'exp-aperture', module: 'exposure' },
  { id: 'exp-shutter', module: 'exposure' },
  { id: 'exp-iso', module: 'exposure' },
  { id: 'exp-equivalent', module: 'exposure', widget: 'equivalent' },
  { id: 'exp-modes', module: 'exposure', widget: 'modes' },
  { id: 'exp-rules', module: 'exposure' },

  /* Level 1 — Framing basics */
  { id: 'comp-thirds', module: 'comp-basics' },
  { id: 'comp-horizon', module: 'comp-basics' },
  { id: 'comp-lines', module: 'comp-basics' },
  { id: 'comp-framing', module: 'comp-basics' },
  { id: 'comp-fill', module: 'comp-basics' },
  { id: 'comp-simplicity', module: 'comp-basics' },
  { id: 'comp-viewpoint', module: 'comp-basics' },

  /* Level 2 — Focus & depth of field */
  { id: 'focus-how', module: 'focus-dof' },
  { id: 'dof-what', module: 'focus-dof', widget: 'dof' },
  { id: 'dof-aperture', module: 'focus-dof', widget: 'dof' },
  { id: 'dof-distance', module: 'focus-dof', widget: 'dof' },
  { id: 'dof-lens-sensor', module: 'focus-dof', widget: 'dof' },
  { id: 'dof-hyperfocal', module: 'focus-dof', widget: 'dof' },

  /* Level 2 — Metering & histogram */
  { id: 'exp-metering', module: 'metering', widget: 'metering' },
  { id: 'exp-histogram', module: 'metering', widget: 'histogram' },

  /* Level 2 — Advanced composition */
  { id: 'comp-golden', module: 'comp-advanced' },
  { id: 'comp-symmetry', module: 'comp-advanced' },
  { id: 'comp-negative', module: 'comp-advanced' },
  { id: 'comp-diagonals', module: 'comp-advanced' },
  { id: 'comp-odds', module: 'comp-advanced' },
  { id: 'comp-layers', module: 'comp-advanced' },
  { id: 'comp-leadroom', module: 'comp-advanced' },
  { id: 'comp-contrast', module: 'comp-advanced' },
  { id: 'comp-patterns', module: 'comp-advanced' },
  { id: 'comp-balance', module: 'comp-advanced' },
  { id: 'comp-break', module: 'comp-advanced' },

  /* Level 3 — Lenses */
  { id: 'lens-focal', module: 'lenses', widget: 'focal' },
  { id: 'lens-perspective', module: 'lenses' },

  /* Level 3 — Editing */
  { id: 'edit-basics', module: 'editing' },
  { id: 'edit-workflow', module: 'editing' },
];
