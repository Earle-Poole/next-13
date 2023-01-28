import { decimetersToFeetAndInches, generateUUID, getRandomPokemon, hectogramsToPounds, isServer } from "@/utils/lib"
import { mockPokemonList } from "./mocks/lib"


describe('decimetersToFeetAndInches', () => {
  it('should convert decimeters to feet and inches', () => {
    // Assert that the function returns the expected value
    expect(decimetersToFeetAndInches(10)).toBe(`3'3"`)
    expect(decimetersToFeetAndInches(18)).toBe(`5'11"`)
  })
})

describe('hectogramsToPounds', () => {
  it('should convert hectograms to pounds', () => {
    // Assert that the function returns the expected value
    expect(hectogramsToPounds(100)).toBe(22)
    expect(hectogramsToPounds(200)).toBe(44)
  })
})

describe('isServer', () => {
  it('should return true if the code is running on the server', () => {
    // Assert that the function returns the expected value
    // It should return true during the jest test due to jest using
    // the window object for testing
    expect(isServer()).toBe(false)
  })
})

describe('getRandomPokemon', () => {
  it('should return a random Pokemon from the list', () => {
    expect(getRandomPokemon(mockPokemonList).name).toBe('bulbasaur')

    // test the handling of an empty list
    mockPokemonList.results = []
    expect(getRandomPokemon(mockPokemonList)).toBe(null)
  })
})

describe('generateUUID', () => {
  it('should generate a UUID', () => {
    const uuid = generateUUID()
    const uuidRegExp = /^3{1}\w{7}-\w{4}-\w{4}-\w{4}-\w{12}/g

    expect(uuid).toMatch(uuidRegExp)
  })
})