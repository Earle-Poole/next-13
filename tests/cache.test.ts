import { getPokemonList } from './../utils/cache';
import {
  getContent,
  getContentByID,
  getNowAsLocalTimeString,
} from '@/utils/cache'
import { getContentByIDMockResponse, getContentMockResponse, getPokemonListResponse } from './mocks/cache'
import { setupFetchStub } from './utils'

beforeAll(() => {
  global.fetch = () => new Promise(() => { })
})

describe('getContent', () => {
  it('should return the content from the API', async () => {
    // Set up a mock for the fetch function
    // that returns a successful response with the
    // expected data
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(setupFetchStub(getContentMockResponse))

    // Call the getContent function and assert that
    // it returns the expected data
    const content = await getContent()
    expect(content).toEqual(getContentMockResponse)
  })

  it('should throw an error if the API request fails', async () => {
    // Set up a mock for the fetch function
    // that returns a failed response
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() =>
        Promise.reject(new Error('Failed to fetch'))
      )

    // Call the getContent function and assert that
    // it throws an error
    await expect(getContent()).rejects.toThrow('Failed to fetch')
  })
})


describe('getContentByID', () => {
  it('fetches content by ID from the API and returns the expected data', async () => {
    const contentID = '12345'

    // Mock the fetch API call to return the expected data
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(setupFetchStub(getContentByIDMockResponse))

    // Call the getContentByID function and assert that it returns the expected data
    const content = await getContentByID(contentID)
    expect(content).toEqual(getContentByIDMockResponse)
  })
})

describe('getNowAsLocalTimeString', () => {
  it('returns a string with the current date and time in the America/Chicago time zone', () => {
    const nowString = getNowAsLocalTimeString()
    const dateISORegExp = /^\w{3} \w{3} \d{2} \d{4} \d{1,2}:\d{2}:\d{2}\u202f{1}\w{2} CST$/

    expect(typeof nowString).toBe('string')
    expect(nowString).toMatch(dateISORegExp)
  })
})


describe('getPokemonList', () => {
  it('fetches a list of pokemone from the API', async () => {

    jest.spyOn(global, 'fetch').mockImplementationOnce(setupFetchStub(getPokemonListResponse))

    const content = await getPokemonList()
    expect(content).toEqual(getPokemonListResponse)
  })
})