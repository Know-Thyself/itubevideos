import React from 'react'
// import CopyrightIcon from '@material-ui/icons/Copyright'
// import MailOutlineIcon from '@material-ui/icons/MailOutline'
// import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk'
// import FacebookIcon from '@material-ui/icons/Facebook'
// import LinkedInIcon from '@material-ui/icons/LinkedIn'
// import TwitterIcon from '@material-ui/icons/Twitter'
// import YouTubeIcon from '@material-ui/icons/YouTube'
// import RedditIcon from '@material-ui/icons/Reddit'
// import InstagramIcon from '@material-ui/icons/Instagram'
// import PinterestIcon from '@material-ui/icons/Pinterest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Home.module.css'

const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className={styles['footer-inner-div']}>
				<p>
					<FontAwesomeIcon icon={faCopyright} className={styles.copyright} />
					<span>Biruk Kebede 2023</span>
				</p>
				{/* <CopyrightIcon />
				<MailOutlineIcon />
				<PhoneInTalkIcon />
				<FacebookIcon />
				<LinkedInIcon />
				<TwitterIcon />
				<YouTubeIcon />
				<RedditIcon />
				<InstagramIcon />
				<PinterestIcon /> */}
			</div>
		</div>
	)
}

export default Footer
