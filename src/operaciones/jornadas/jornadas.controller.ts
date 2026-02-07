/* eslint-disable prettier/prettier */

import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { JornadasService } from './jornadas.service';
import { CreateJornadaDto } from './dto/create-jornada.dto';
import { FinalizarJornadaDto } from './dto/update-jornada.dto';

@Controller('jornadas')
export class JornadasController {
  constructor(private readonly jornadasService: JornadasService) {}

  @Post('iniciar')
  iniciar(@Body() createDto: CreateJornadaDto) {
    return this.jornadasService.create(createDto);
  }

  // AGREGAMOS ParseIntPipe AQUÍ
  @Patch(':id/finalizar')
  finalizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() finalizarDto: FinalizarJornadaDto,
  ) {
    return this.jornadasService.finalizar(id, finalizarDto);
  }

  // AGREGAMOS ParseIntPipe AQUÍ
  @Get('usuario/:id')
  historialUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.jornadasService.findByUser(id);
  }

  // AGREGAMOS ParseIntPipe AQUÍ
  @Get(':id')
  detalle(@Param('id', ParseIntPipe) id: number) {
    return this.jornadasService.findOne(id);
  }

  @Get('estado-actual/usuario/:id')
  async obtenerEstadoActual(@Param('id', ParseIntPipe) id: number) {
    // 1. Buscamos si tiene turno activo
    const activa = await this.jornadasService.buscarActiva(id);

    if (activa) {
      return {
        tiene_turno: true,
        jornada_actual: activa,
        historial: [],
      };
    } else {
      const historial = await this.jornadasService.findByUser(id);
      return {
        tiene_turno: false,
        jornada_actual: null,
        historial: historial,
      };
    }
  }
}
