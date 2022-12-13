import {
  getContent,
  getContentByID,
  getNowAsLocalTimeString,
} from '@/utils/cache'
import { BlockTypes } from '@/utils/constants'

function setupFetchStub(data: any) {
  return function fetchStub(_url: RequestInfo | URL) {
    return new Promise((resolve) => {
      resolve({
        status: 200,
        json: () => Promise.resolve(data),
      })
    }) as unknown as Promise<Response>
  }
}

function setupGlobalFetch(data: any) {
  global.fetch = jest.fn().mockImplementation(setupFetchStub(data))
}

afterAll(() => {
  // @ts-ignore
  global.fetch.mockClear()
  // @ts-ignore
  delete global.fetch
})

const getContentMockResponse = {
  results: [
    {
      id: '123',
      headline: 'Test Headline',
      blocks: {
        blocks: [
          {
            type: BlockTypes.H2,
            key: '456',
            text: 'Test H2',
          },
          {
            type: BlockTypes.LI,
            key: '789',
            text: 'Test LI',
          },
        ],
      },
    },
  ],
}

describe('getContent', () => {
  setupGlobalFetch(getContentMockResponse)

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

const getContentByIDMockResponse = {
  id: '12345',
  headline: 'This is an example headline',
  blocks: [
    {
      type: 'H2',
      key: '123456',
      text: 'This is an example H2 block',
    },
  ],
}

describe('getContentByID', () => {
  setupGlobalFetch(getContentByIDMockResponse)
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

    expect(typeof nowString).toBe('string')
    expect(nowString).toMatch(
      /^\w{3} \w{3} \d{2} \d{4} \d{1,2}:\d{2}:\d{2} \w{2} CST$/
    )
  })
})
