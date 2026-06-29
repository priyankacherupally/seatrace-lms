import AntibioticConfig             from './tabs/AntibioticConfig.js';
import MicroConfig                 from './tabs/MicroConfig.js';
import SulphateConfig              from './tabs/SulphateConfig.js';
import SodiumConfig                from './tabs/SodiumConfig.js';
import MoistureConfig              from './tabs/MoistureConfig.js';
import ReceivingDetailsConfig      from './tabs/oi/ReceivingDetailsConfig.js';
import BeheadingConfig             from './tabs/oi/BeheadingConfig.js';
import GradingOIConfig             from './tabs/oi/GradingOIConfig.js';
import PeelingCuttingConfig        from './tabs/oi/PeelingCuttingConfig.js';
import SoakingConfig               from './tabs/oi/SoakingConfig.js';
import NobashiConfig               from './tabs/oi/NobashiConfig.js';
import FrozenCookedIQFConfig       from './tabs/oi/FrozenCookedIQFConfig.js';
import TemperatureConfig           from './tabs/oi/TemperatureConfig.js';
import CookingPeelingCuttingConfig from './tabs/oi/CookingPeelingCuttingConfig.js';
import BreadingConfig              from './tabs/oi/BreadingConfig.js';

export const HARVEST_OPTIONS = [
  { value: 'pre-harvest', label: 'Pre-Harvest' },
  { value: 'processing',  label: 'Processing'  },
  { value: 'others',      label: 'Others'      },
];

export const MAIN_TABS   = ['Lab Test', 'Organoleptic Inspection'];
export const SUB_TABS    = ['Antibiotic', 'Micro', 'Sulphate', 'Sodium', 'Moisture'];
export const OI_SUB_TABS = [
  'Receiving Details', 'Beheading', 'Grading', 'Peeling & Cutting', 'Soaking', 'Nobashi',
  'Frozen/Cooked/Breaded-IQF', 'Temperature', 'Cooking Peeling & Cutting', 'Breading',
];

export const OI_BASE_COLS = [
  { title: 'Section',       dataIndex: 'section',      key: 'section',      sorter: (a, b) => a.section.localeCompare(b.section) },
  { title: 'Grade',         dataIndex: 'grade',        key: 'grade',        sorter: (a, b) => a.grade.localeCompare(b.grade) },
  { title: 'Variety',       dataIndex: 'variety',      key: 'variety',      sorter: (a, b) => a.variety.localeCompare(b.variety) },
  { title: 'Brand',         dataIndex: 'brand',        key: 'brand',        sorter: (a, b) => a.brand.localeCompare(b.brand) },
  { title: 'Packing Style', dataIndex: 'packingStyle', key: 'packingStyle', sorter: (a, b) => a.packingStyle.localeCompare(b.packingStyle) },
];

export const TAB_CONFIG = {
  Antibiotic: AntibioticConfig,
  Micro:      MicroConfig,
  Sulphate:   SulphateConfig,
  Sodium:     SodiumConfig,
  Moisture:   MoistureConfig,
};

export const OI_TAB_CONFIG = {
  'Receiving Details':         ReceivingDetailsConfig,
  'Beheading':                 BeheadingConfig,
  'Grading':                   GradingOIConfig,
  'Peeling & Cutting':         PeelingCuttingConfig,
  'Soaking':                   SoakingConfig,
  'Nobashi':                   NobashiConfig,
  'Frozen/Cooked/Breaded-IQF': FrozenCookedIQFConfig,
  'Temperature':               TemperatureConfig,
  'Cooking Peeling & Cutting': CookingPeelingCuttingConfig,
  'Breading':                  BreadingConfig,
};
