import styles from '../styles/Home.module.scss'

const Footer = () => {
  const myDate = new Date()
  const myYear = myDate.getFullYear()

  return (
    <footer className={styles.footer}>
    <ul>
      <li>
          <span>© { myYear } andmorefine Inc. All Rights Reserved.</span>
      </li>
    </ul>
    </footer>
  )
}

export default Footer
