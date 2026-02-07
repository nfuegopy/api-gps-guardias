/* eslint-disable prettier/prettier */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../../../gestion/usuarios/entities/usuario.entity';
import { MarcacionRuta } from '../../marcaciones/entities/marcacion.entity';

@Entity('jornadas_laborales')
export class Jornada {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true })
  usuario_id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_inicio: Date;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitud_inicio: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitud_inicio: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_fin: Date;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitud_fin: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitud_fin: number;

  @Column({
    type: 'enum',
    enum: ['EN_PROCESO', 'FINALIZADA'],
    default: 'EN_PROCESO',
  })
  estado: string;

  @Column({ type: 'int', default: 0 })
  total_puntos_visitados: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relaciones
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  // Descomentar cuando crees la entidad Marcacion
  @OneToMany(() => MarcacionRuta, (marcacion) => marcacion.jornada)
  marcaciones: MarcacionRuta[];
}
