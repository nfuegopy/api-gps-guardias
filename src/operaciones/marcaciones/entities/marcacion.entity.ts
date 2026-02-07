/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Jornada } from '../../jornadas/entities/jornada.entity';

@Entity('marcaciones_ruta')
export class MarcacionRuta {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  jornada_id: number;

  @Column({
    type: 'enum',
    enum: ['INICIO', 'PUNTO_CONTROL', 'INCIDENCIA', 'FIN'],
  })
  tipo_evento: string;

  @Column({ type: 'datetime' })
  fecha_hora_real: Date;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitud: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitud: number;

  @Column({ type: 'float', nullable: true })
  precision_gps: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  nombre_punto: string;

  @Column({ type: 'text', nullable: true })
  observacion: string;

  @ManyToOne(() => Jornada, (jornada) => jornada.marcaciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'jornada_id' })
  jornada: Jornada;
}
