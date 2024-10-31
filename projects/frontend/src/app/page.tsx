'use client';
import { usePokemon } from '@/custom-hooks/usePokemon';

export default function Home() {
  const { isLoading, pokemons, error } = usePokemon();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {error && <div>{error.message}</div>}
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <ul>
            {pokemons.map((p) => (
              <li key={p.id}>
                {p.name}
                {p.types?.map((t) => <span key={t}>t</span>)}
              </li>
            ))}
          </ul>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
