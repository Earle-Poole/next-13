import { BlockTypes } from "./utils/constants"

interface GetContentsResponse {
  count: number
  next: string | null
  previous: string | null
  results: string[]
}

interface Author {
  username: string
  display_name: string
  subscription: null
}

interface Topic {
  slug: string
  id: string
  headline: string
  seo_headline: string
  authors: Author[]
  byline_photo: string
  published_date: string
  last_published: string
  first_published: string
  primary_section: string
  cover_for_deep_dive: string
  deep_dive: string
  sections: {}[]
  primary_tag: {}
  tags: {}[]
  is_featured: boolean
  new_featured: boolean
  permalink: string
  amp_permalink: string
  primary_image?: {
    id: string
    alt_text: string
    blurred_data: string
    caption: { blocks: [][]; entityMap: [] }
    source: string
    base_image_url: string
    crops: { "1x1": {}[]; "4x3": {}[]; "16x9": {}[] }
    embed: boolean
    is_animated: boolean
  }
  social_image: null
  og_headline: string
  og_description: string
  rubric: null
  template: null
  promotion: null
  wordcount: number
  read_more_wordcount: number
  before_read_more_wordcount: number
  keep_reading_mins: string
  is_breaking_news: boolean
  topics: {}[]
  subtopics: {}[]
  audience: {}
  cross_promote_to: []
  include_on_site: boolean
  include_in_latest_stories: boolean
  homepage_unit_title: boolean
  needs_redirect: boolean
  is_paywalled: boolean
  blocks: {
    blocks: Block[]
  }
}

export interface Block {
  key: string
  text: string
  type: BlockTypes
  depth: number
  inlineStyleRanges: []
  entityRanges: []
  data: {}[]
}

export interface NamedAPIResource {
  /** The name of the referenced resource */
  name: string
  /** The URL of the referenced resource */
  url: string
}

export interface NamedAPIResourceList {
  /** The total number of resources available from this API */
  count: number
  /** The URL for the next page in the list */
  next: string | null
  /** The URL for the previous page in the list */
  previous: string | null
  /** A list of named API resources */
  results: NamedAPIResource[]
}

export interface Pokemon {
  /** The identifier for this resource */
  id: number
  /** The name for this resource */
  name: string
  /** The base experience gained for defeating this Pokémon */
  base_experience: number
  /** The height of this Pokémon in decimetres */
  height: number
  /** Set for exactly one Pokémon used as the default for each species */
  is_default: boolean
  /** Order for sorting. Almost national order, except families are grouped together */
  order: number
  /** The weight of this Pokémon in hectograms */
  weight: number
  /** A list of abilities this Pokémon could potentially have */
  abilities: PokemonAbility[]
  /** A list of forms this Pokémon can take on */
  forms: NamedAPIResource[]
  /** A list of game indices relevent to Pokémon item by generation */
  game_indices: VersionGameIndex[]
  /** A list of items this Pokémon may be holding when encountered */
  held_items: PokemonHeldItem[]
  /** A link to a list of location areas, as well as encounter details pertaining to specific versions */
  location_area_encounters: string
  /** A list of moves along with learn methods and level details pertaining to specific version groups */
  moves: PokemonMove[]
  /** A set of sprites used to depict this Pokémon in the game.
   * A visual representation of the various sprites can be found at [PokeAPI/sprites](https://github.com/PokeAPI/sprites#sprites)
   */
  sprites: PokemonSprites
  /** The species this Pokémon belongs to */
  species: NamedAPIResource
  /** A list of base stat values for this Pokémon */
  stats: PokemonStat[]
  /** A list of details showing types this Pokémon has */
  types: PokemonType[]
}

export interface PokemonAbility {
  /** Whether or not this is a hidden ability */
  is_hidden: boolean
  /** The slot this ability occupies in this Pokémon species */
  slot: number
  /** The ability the Pokémon may have */
  ability: NamedAPIResource
}

export interface PokemonType {
  /** The order the Pokémon's types are listed in */
  slot: number
  /** The type the referenced Pokémon has */
  type: NamedAPIResource
}

export interface PokemonHeldItem {
  /** The item the referenced Pokémon holds */
  item: NamedAPIResource
  /** The details of the different versions in which the item is held */
  version_details: PokemonHeldItemVersion[]
}

export interface PokemonHeldItemVersion {
  /** The version in which the item is held */
  version: NamedAPIResource
  /** How often the item is held */
  rarity: number
}

export interface PokemonMove {
  /** The move the Pokémon can learn */
  move: NamedAPIResource
  /** The details of the version in which the Pokémon can learn the move */
  version_group_details: PokemonMoveVersion[]
}

export interface PokemonMoveVersion {
  /** The method by which the move is learned */
  move_learn_method: NamedAPIResource
  /** The version group in which the move is learned */
  version_group: NamedAPIResource
  /** The minimum level to learn the move */
  level_learned_at: number
}

export interface PokemonStat {
  /** The stat the Pokémon has */
  stat: NamedAPIResource
  /** The effort points (EV) the Pokémon has in the stat */
  effort: number
  /** The base value of the stat */
  base_stat: number
}

export interface PokemonSprites {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string
  /** The shiny female depiction of this Pokémon from the front in battle */
  front_shiny_female: string
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string
}

export interface LocationAreaEncounter {
  /** The location area the referenced Pokémon can be encountered in */
  location_area: NamedAPIResource
  /** A list of versions and encounters with the referenced Pokémon that might happen */
  version_details: VersionEncounterDetail[]
}

export interface PokemonColor {
  /** The identifier for this resource */
  id: number
  /** The name for this resource */
  name: string
  /** The name of this resource listed in different languages */
  names: Name[]
  /** A list of the Pokémon species that have this color */
  pokemon_species: NamedAPIResource[]
}

export interface PokemonForm {
  /** The identifier for this resource */
  id: number
  /** The name for this resource */
  name: string
  /** The order in which forms should be sorted within all forms.
   * Multiple forms may have equal order, in which case they should fall back on sorting by name
   */
  order: number
  /** The order in which forms should be sorted within a species' forms */
  form_order: number
  /** True for exactly one form used as the default for each Pokémon */
  is_default: boolean
  /** Whether or not this form can only happen during battle */
  is_battle_only: boolean
  /** Whether or not this form requires mega evolution */
  is_mega: boolean
  /** The name of this form */
  form_name: string
  /** The Pokémon that can take on this form */
  pokemon: NamedAPIResource
  /** A set of sprites used to depict this Pokémon form in the game */
  sprites: PokemonFormSprites
  /** The version group this Pokémon form was introduced in */
  version_group: NamedAPIResource
  /** The form specific full name of this Pokémon form, or empty if the form does not have a specific name */
  names: Name[]
  /** The form specific form name of this Pokémon form, or empty if the form does not have a specific name */
  form_names: Name[]
}

export interface PokemonFormSprites {
  /** The default depiction of this Pokémon form from the front in battle */
  front_default: string
  /** The shiny depiction of this Pokémon form from the front in battle */
  front_shiny: string
  /** The default depiction of this Pokémon form from the back in battle */
  back_default: string
  /** The shiny depiction of this Pokémon form from the back in battle */
  back_shiny: string
}

export interface PokemonHabitat {
  /** The identifier for this resource */
  id: number
  /** The name for this resource */
  name: string
  /** The name of this resource listed in different languages */
  names: Name[]
  /** A list of the Pokémon species that can be found in this habitat */
  pokemon_species: NamedAPIResource[]
}

export interface PokemonShape {
  /** The identifier for this resource */
  id: number
  /** The name for this resource */
  name: string
  /** The "scientific" name of this Pokémon shape listed in different languages */
  awesome_names: AwesomeName[]
  /** The name of this resource listed in different languages */
  names: Name[]
  /** A list of the Pokémon species that have this shape */
  pokemon_species: NamedAPIResource[]
}

export interface AwesomeName {
  /** The localized "scientific" name for an API resource in a specific language */
  awesome_name: string
  /** The language this "scientific" name is in */
  language: NamedAPIResource
}

export interface VersionGameIndex {
  /** The internal id of an API resource within game data */
  game_index: number
  /** The version relevent to this game index */
  version: NamedAPIResource
}

export interface VersionEncounterDetail {
  /** The game version this encounter happens in */
  version: NamedAPIResource
  /** The total percentage of all encounter potential */
  max_chance: number
  /** A list of encounters and their specifics */
  encounter_details: Encounter[]
}

export interface Encounter {
  /** The lowest level the Pokémon could be encountered at */
  min_level: number
  /** The highest level the Pokémon could be encountered at */
  max_level: number
  /** A list of condition values that must be in effect for this encounter to occur */
  condition_values: NamedAPIResource
  /** Percent chance that this encounter will occur */
  chance: number
  /** The method by which this encounter happens */
  method: NamedAPIResource
}

export interface Name {
  /** The localized name for an API resource in a specific language */
  name: string
  /** The language this name is in */
  language: NamedAPIResource
}

export interface ErrorPageProps {
  error: Error
  reset: () => void
}

export interface LayoutPageProps {
  children: React.ReactNode
}

export interface WithPageProps<T, P = {}> {
  params: T
  subParams: P
}
