'use client';
import { PokemonDTO } from 'core';
import { useEffect, useState } from 'react';

export const usePokemon = () => {
  const [pokemons, setPokemons] = useState<PokemonDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();

  const fetchData = async (
    url: string = 'http://localhost:3000/api/v1/pokemon/random-list?length=3&min=1&max=100',
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPokemons(data);
      setError(null);
    } catch (e: unknown) {
      console.log('Exception while fetching pokemon: ', e);
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    pokemons,
    isLoading,
    error,
  };
};
