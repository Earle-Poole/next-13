export function setupFetchStub(data: any) {
    return jest.fn((_url: RequestInfo | URL) => {
        return new Promise((resolve) => {
            resolve({
                status: 200,
                json: () => Promise.resolve(data),
            })
        }) as unknown as Promise<Response>
    })
}
