/**
 * NextHead (head.tsx) is the new implementation of the `next/head` component.
 * It must be wrapped in a React.Fragment to work properly with other NextHead components.
 */
const NextHead = () => {
  return (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='description' content='Nested layouts in Next 13' />
      <title>Events - Next 13</title>
    </>
  )
}

export default NextHead
