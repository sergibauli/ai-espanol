import { MODULOS_01_20 } from "./modulos-01-20.js";
import { MODULOS_21_40 } from "./modulos-21-40.js";
import { MODULOS_41_60 } from "./modulos-41-60.js";
import { MODULOS_61_80 } from "./modulos-61-80.js";
import { MODULOS_81_85 } from "./modulos-81-85.js";
import { MODULOS_86_90 } from "./modulos-86-90.js";
const ALL_MODULES = [...MODULOS_01_20, ...MODULOS_21_40, ...MODULOS_41_60, ...MODULOS_61_80, ...MODULOS_81_85, ...MODULOS_86_90].sort(
  (i, t) => i.numero - t.numero,
);
export { buildStudentProfile } from "./profile.js";
export { ALL_MODULES };
