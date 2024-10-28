import { Injectable } from '@nestjs/common';
import { mapPokemonDTO, PokemonDTO, randomNumberList } from 'core';

@Injectable()
export class PokemonService {
  async getRandom(
    length: number = 6,
    min: number = 1,
    max: number = 255,
  ): Promise<PokemonDTO[]> {
    try {
      const randomIds = randomNumberList(length, min, max);
      const promises = randomIds.map((rId) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${rId}/`),
      );
      const responses = await Promise.all(promises);
      const data = await Promise.all(
        responses.map((response) => response.json()),
      );
      return data.map((d) => mapPokemonDTO(d));
    } catch (error) {
      console.error('### Error getting random pokemon: ', error.message);
      return null;
    }
  }
}
