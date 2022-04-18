import React from 'react'
import styles from '../styles/Home.module.css'

const Title = ({ title }) => {
	return (
		<h2 key={title} className={styles['video-title']}>
			{title}
		</h2>
	)
}

export default Title
