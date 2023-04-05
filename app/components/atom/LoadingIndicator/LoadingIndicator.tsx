import styles from "./LoadingIndicator.module.css"
const LoadingIndicator = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <circle
        stroke="#fff"
        fill="#fff"
        className={styles.spinner_first}
        cx="4"
        cy="12"
        r="3"
      />
      <circle
        stroke="#fff"
        fill="#fff"
        className={`${styles.spinner_first} ${styles.spinner_second}`}
        cx="12"
        cy="12"
        r="3"
      />
      <circle
        stroke="#fff"
        fill="#fff"
        className={`${styles.spinner_first} ${styles.spinner_third}`}
        cx="20"
        cy="12"
        r="3"
      />
    </svg>
  )
}

export default LoadingIndicator
