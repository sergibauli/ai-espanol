/** Las ocho criaturas de la mitología china que montan los pilotos (dominio público). */
import type { Criatura } from './comun';
import { fenix } from './fenix';
import { carpa } from './carpa';
import { qilin } from './qilin';
import { dragon } from './dragon';
import { tigre } from './tigre';
import { tortuga } from './tortuga';
import { leon } from './leon';
import { pixiu } from './pixiu';

export const CRIATURAS: Record<string, Criatura> = {
  zippy: fenix,
  pixel: carpa,
  fennec: qilin,
  max: dragon,
  juno: tigre,
  kai: tortuga,
  bram: leon,
  rosa: pixiu,
};

export const CRIATURA_POR_INDICE = ['zippy', 'pixel', 'fennec', 'max', 'juno', 'kai', 'bram', 'rosa'];
