export function setupFetchStub(data: any): jest.Mock {
  return jest.fn(async (_url: RequestInfo | URL) => {
    return await Promise.resolve({
      status: 200,
      json: async () => await Promise.resolve(data),
    })
  })
}
