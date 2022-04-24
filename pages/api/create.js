//import { NextApiRequest, NextApiResponse } from 'next'
//import { PrismaClient } from '@prisma/client'
//const prisma = new PrismaClient()
import prisma from '../../lib/prisma.ts'
import NextCors from 'nextjs-cors'

export default async (req, res) => {
	const options = {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200,
	}
	await NextCors(req, res, options)
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed!' })
	}
	const videoData = req.body
	const newVideo = await prisma.videos.create({
		data: videoData
	})

	res.json(newVideo)
}
