/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateJornadaDto {
  @IsNumber()
  @IsNotEmpty()
  usuario_id: number; // En producción, esto se saca del Token, pero para probar lo enviaremos.

  @IsNumber()
  @IsNotEmpty()
  latitud_inicio: number;

  @IsNumber()
  @IsNotEmpty()
  longitud_inicio: number;
}
