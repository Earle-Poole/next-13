import { decimetersToFeetAndInches, hectogramsToPounds } from '@/utils/lib'
import { Pokemon } from 'global'
import capitalize from 'lodash/capitalize'

const PokemonInfo = (props: { pokemon: Pokemon }) => {
  const { pokemon } = props
  return (
    <>
      <h1 className="text-2xl">{capitalize(pokemon.name)}</h1>
      <h2>Height: {decimetersToFeetAndInches(pokemon.height)}</h2>
      <h2>Weight: {hectogramsToPounds(pokemon.weight)} lbs</h2>
      <h2>
        Type: {pokemon.types.map((t) => capitalize(t.type.name)).join(', ')}
      </h2>
    </>
  )
}

export default PokemonInfo
