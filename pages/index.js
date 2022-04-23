import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { PrismaClient } from '@prisma/client'
import AllVideos from '../components/AllVideos'
const prisma = new PrismaClient()

export async function getServerSideProps() {
	const videos = await prisma.videos.findMany()
	return { props: { videos } }
}

const Home = ({ videos }) => {
	async function addVideo(data) {
		  const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			}
		const response = await fetch(
			'./api/create',
			requestOptions
		)
		if (!response.ok) {
			throw new Error(response.statusText)
		}
		return await response.json()
	}

	const deleteVideo = async (id) => {
		try {
			await fetch(`./api/video/${id}`, {
				method: 'DELETE',
			})
		} catch (error) {
			console.error(error)
		}
	}

	const updateVideo = async (videoId, updatedVote) => {
		const data = { rating: updatedVote }
		console.log(data)
		try {
			await fetch(`./api/video/${videoId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'Field-Name': 'Accept-Patch',
				},
				body: JSON.stringify(data),
			})
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div className={styles.container}>
			<Head>
				<title>Video Recommendation</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<AllVideos
				videosData={videos}
				addVideo={addVideo}
				deleteVideo={deleteVideo}
				updateVideo={updateVideo}
			/>
		</div>
	)
}

export default Home
