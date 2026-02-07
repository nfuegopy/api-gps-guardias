/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarcacionRuta } from './entities/marcacion.entity';
import { CreateMarcacionDto } from './dto/create-marcacion.dto';
import { JornadasService } from '../jornadas/jornadas.service';

@Injectable()
export class MarcacionesService {
  constructor(
    @InjectRepository(MarcacionRuta)
    private readonly marcacionRepo: Repository<MarcacionRuta>,
    private readonly jornadasService: JornadasService, // Inyectamos para actualizar contador
  ) {}

  async create(createDto: CreateMarcacionDto) {
    const estadoJornada = await this.jornadasService.obtenerEstado(
      createDto.jornada_id,
    );

    if (estadoJornada === 'FINALIZADA') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      throw new BadRequestException(
        'La jornada ya está finalizada. No se pueden agregar nuevas marcaciones.',
      );
    }
    const nuevaMarcacion = this.marcacionRepo.create(createDto);
    const guardado = await this.marcacionRepo.save(nuevaMarcacion);

    if (createDto.tipo_evento === 'PUNTO_CONTROL') {
      await this.jornadasService.incrementarContador(createDto.jornada_id);
    }

    return guardado;
  }

  async findByJornada(jornadaId: number) {
    return await this.marcacionRepo.find({
      where: { jornada_id: jornadaId },
      order: { fecha_hora_real: 'ASC' },
    });
  }
}
