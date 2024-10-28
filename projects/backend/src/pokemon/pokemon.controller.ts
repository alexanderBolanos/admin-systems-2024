import { Controller, Get, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('random-list')
  async getRandomList(
    @Query('length') length: number = 1,
    @Query('min') min: number = 1,
    @Query('max') max: number = 255,
  ) {
    console.info('%%% query parameters: ', length, min, max);
    return await this.pokemonService.getRandom(length, min, max);
  }
}
