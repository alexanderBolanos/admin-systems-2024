import { z } from 'zod';

export type BaseRecord = Record<string, any>;

export enum Status {
  SUCCESS = 1,
  FAIL = 0,
  UNKNOW = -1,
  WAITING = 2,
}

export const BaseDTO = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  status: z.nativeEnum(Status),
  payload: z.record(z.any()).optional(),
});

export function validateDTO(o: any) {
  const result = BaseDTO.safeParse(o);
  return result;
}

/**
 * DTO Pokemon record
 */
export const PokemonDTO = z.object({
  id: z.number().positive().min(1),
  name: z.string().min(1),
  heigth: z.number().positive(),
  weight: z.number().positive(),
  sprites: z.object({
    back: z.string().url(),
    front: z.string().url(),
  }),
  types: z.array(z.string()),
});

export type PokemonDTO = z.infer<typeof PokemonDTO>;

/**
 * It receives a record of any type and tries to map it to a PokemonDTO type
 * @param record
 * @returns a PokemonDTO object or null
 */
export function mapPokemonDTO(record: any): PokemonDTO | null {
  try {
    console.log('??? sprites: ', record.sprites);
    const pokemon: PokemonDTO = {
      id: record.id,
      name: record.name,
      heigth: record.height,
      weight: record.weight,
      sprites: {
        back: record.sprites.back_default,
        front: record.sprites.front_default,
      },
      types: record.types.map((t) => t.type.name),
    };

    return PokemonDTO.parse(pokemon);
  } catch (error) {
    console.error('$$$ error while mapping pokemon: ', error);
    return null;
  }
}

/**
 * It returns an array with random unrepeated sorted numbers, between min and max
 * @param length the amount of desired random numbers (default 1)
 * @param min the minimun random number (default 1)
 * @param max the maximun random number (default 255)
 */
export function randomNumberList(
  length: number = 1,
  min: number = 1,
  max: number = 255,
): number[] {
  const randomNumbers: number[] = [];

  while (randomNumbers.length < length) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }

  return randomNumbers;
}
