//import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed!' })
	}
	const videoData = req.body
	const newVideo = await prisma.videos.create({
		data: videoData
	})
  res.json(newVideo)
}