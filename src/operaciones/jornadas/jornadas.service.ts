/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jornada } from './entities/jornada.entity';
import { CreateJornadaDto } from './dto/create-jornada.dto';
import { FinalizarJornadaDto } from './dto/update-jornada.dto';

@Injectable()
export class JornadasService {
  constructor(
    @InjectRepository(Jornada)
    private readonly jornadaRepo: Repository<Jornada>,
  ) {}

  // 1. Iniciar Turno
  async create(createJornadaDto: CreateJornadaDto) {
    const nuevaJornada = this.jornadaRepo.create({
      ...createJornadaDto,
      estado: 'EN_PROCESO',
      fecha_inicio: new Date(), // Servidor manda la hora oficial
    });
    return await this.jornadaRepo.save(nuevaJornada);
  }

  // 2. Finalizar Turno
  async finalizar(id: number, finalizarDto: FinalizarJornadaDto) {
    const jornada = await this.jornadaRepo.findOne({ where: { id } });
    if (!jornada) throw new NotFoundException('Jornada no encontrada');

    jornada.estado = 'FINALIZADA';
    jornada.fecha_fin = new Date();
    jornada.latitud_fin = finalizarDto.latitud_fin;
    jornada.longitud_fin = finalizarDto.longitud_fin;

    return await this.jornadaRepo.save(jornada);
  }

  // 3. Obtener Jornadas de un Usuario (Para el historial en Flutter)
  async findByUser(usuarioId: number) {
    return await this.jornadaRepo.find({
      where: { usuario_id: usuarioId },
      order: { fecha_inicio: 'DESC' },
      take: 10, // Traemos las últimas 10
    });
  }

  async findOne(id: number) {
    return await this.jornadaRepo.findOne({
      where: { id },
      relations: ['marcaciones'],
    });
  }

  async buscarActiva(usuarioId: number) {
    return await this.jornadaRepo.findOne({
      where: {
        usuario_id: usuarioId,
        estado: 'EN_PROCESO',
      },
      relations: ['marcaciones'], // Traemos los puntos para pintar el mapa
      order: {
        marcaciones: { fecha_hora_real: 'ASC' },
      },
    });
  }

  async obtenerEstado(id: number): Promise<string> {
    const jornada = await this.jornadaRepo.findOne({
      where: { id },
      select: ['estado'], // Solo traemos el estado por rendimiento
    });
    if (!jornada) throw new NotFoundException('Jornada no encontrada');
    return jornada.estado;
  }

  // Helper para sumar puntos visitados (lo llamará el servicio de marcaciones)
  async incrementarContador(id: number) {
    const jornada = await this.jornadaRepo.findOneBy({ id });
    if (jornada) {
      jornada.total_puntos_visitados += 1;
      await this.jornadaRepo.save(jornada);
    }
  }
}
