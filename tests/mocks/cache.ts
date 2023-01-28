import { BlockTypes } from "@/utils/constants";
import { generateUUID } from "@/utils/lib";
import { NamedAPIResourceList } from "global";

export const getContentMockResponse = {
  results: [
    {
      id: generateUUID(),
      headline: 'Test Headline',
      blocks: {
        blocks: [
          {
            type: BlockTypes.H2,
            key: generateUUID(),
            text: 'Test H2',
          },
          {
            type: BlockTypes.LI,
            key: generateUUID(),
            text: 'Test LI',
          },
        ],
      },
    },
  ],
}

export const getContentByIDMockResponse = {
  id: generateUUID(),
  headline: 'This is an example headline',
  blocks: [
    {
      type: 'H2',
      key: generateUUID(),
      text: 'This is an example H2 block',
    },
  ],
}

export const getPokemonListResponse: NamedAPIResourceList = {
  count: 100,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=100&limit=20',
  previous: null,
  results: []
}