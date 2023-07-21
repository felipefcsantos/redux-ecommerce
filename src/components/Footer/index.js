import styles from './Footer.module.scss'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Footer() {

    const iconeProps = {
        color: 'white',
        size: 24
    }
  return (
    <footer className={styles.footer}>
        <div>
            <FaFacebook {...iconeProps}/>
            <FaTwitter {...iconeProps}/>
            <FaInstagram {...iconeProps}/>
        </div>
        <span>Desenvolvido por Felipe Santos.</span>
    </footer>
  )
}
