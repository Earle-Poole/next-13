import { NamedAPIResourceList } from 'global'

export const mockPokemonList: NamedAPIResourceList = {
    count: 1,
    next: null,
    previous: null,
    results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ],
}
