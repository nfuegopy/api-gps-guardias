/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber } from 'class-validator';

export class FinalizarJornadaDto {
  @IsNumber()
  @IsNotEmpty()
  latitud_fin: number;

  @IsNumber()
  @IsNotEmpty()
  longitud_fin: number;
}
