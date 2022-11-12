/**
 * NextHead (head.tsx) is the new implementation of the `next/head` component.
 * It must be wrapped in a React.Fragment to work properly with other NextHead components.
 */
const NextHead = () => {
  return (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='description' content='A test of new Next 13 paradigms.' />
      <title>Next 13 Playground</title>
    </>
  )
}

export default NextHead
