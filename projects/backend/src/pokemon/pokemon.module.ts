import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
