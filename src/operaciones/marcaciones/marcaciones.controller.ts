/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MarcacionesService } from './marcaciones.service';
import { CreateMarcacionDto } from './dto/create-marcacion.dto';

@Controller('marcaciones')
export class MarcacionesController {
  constructor(private readonly marcacionesService: MarcacionesService) {}

  @Post() // POST /marcaciones
  registrar(@Body() createDto: CreateMarcacionDto) {
    return this.marcacionesService.create(createDto);
  }

  @Get('jornada/:id') // GET /marcaciones/jornada/100
  listarPorJornada(@Param('id') id: string) {
    return this.marcacionesService.findByJornada(+id);
  }
}
