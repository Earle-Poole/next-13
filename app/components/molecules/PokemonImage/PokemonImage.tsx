import Image from 'next/image'
import { Pokemon } from 'global'

const PokemonImage = (props: { pokemon: Pokemon }) => {
  const { front_default, back_default } = props.pokemon.sprites

  return (
    <section className='flex'>
      {back_default ? (
        <Image
          style={{ imageRendering: 'pixelated' }}
          src={back_default}
          height='280'
          width='280'
          priority
          alt={`Back view of ${props.pokemon.name}`}
        />
      ) : null}
      {front_default ? (
        <Image
          style={{ imageRendering: 'pixelated' }}
          src={front_default}
          height='280'
          width='280'
          priority
          alt={`Front view of ${props.pokemon.name}`}
        />
      ) : null}
    </section>
  )
}

export default PokemonImage
