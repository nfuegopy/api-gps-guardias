import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JornadasService } from './jornadas.service';
import { JornadasController } from './jornadas.controller';
import { Jornada } from './entities/jornada.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jornada])], // Solo Jornada
  controllers: [JornadasController],
  providers: [JornadasService],
  exports: [JornadasService], // EXPORTARLO para que Marcaciones lo use
})
export class JornadasModule {}
