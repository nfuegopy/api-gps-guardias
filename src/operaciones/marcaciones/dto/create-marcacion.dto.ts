/* eslint-disable prettier/prettier */
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMarcacionDto {
  @IsNumber()
  @IsNotEmpty()
  jornada_id: number;

  @IsEnum(['INICIO', 'PUNTO_CONTROL', 'INCIDENCIA', 'FIN'])
  @IsNotEmpty()
  tipo_evento: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_hora_real: Date; // Flutter envía: "2024-02-06T10:00:00.000Z"

  @IsNumber()
  @IsNotEmpty()
  latitud: number;

  @IsNumber()
  @IsNotEmpty()
  longitud: number;

  @IsNumber()
  @IsOptional()
  precision_gps?: number;

  @IsString()
  @IsOptional()
  nombre_punto?: string;

  @IsString()
  @IsOptional()
  observacion?: string;
}
