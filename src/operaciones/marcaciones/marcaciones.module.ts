import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcacionesService } from './marcaciones.service';
import { MarcacionesController } from './marcaciones.controller';
import { MarcacionRuta } from './entities/marcacion.entity';
import { JornadasModule } from '../jornadas/jornadas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MarcacionRuta]),
    JornadasModule, // IMPORTAR JornadasModule para usar su servicio
  ],
  controllers: [MarcacionesController],
  providers: [MarcacionesService],
})
export class MarcacionesModule {}
