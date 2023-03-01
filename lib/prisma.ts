// import { PrismaClient } from '@prisma/client'

// let prisma
// if (process.env.NODE_ENV === 'Production') {
// 	prisma = new PrismaClient()
// } else {
// 	if (!global.prisma) {
// 		global.prisma = new PrismaClient()
// 	}
// 	prisma = global.prisma
// }

// export default prisma

import { Prisma, PrismaClient } from '@prisma/client'

declare global {
	namespace NodeJS {
		interface Global {
			prisma: PrismaClient
		}
	}
}

let prisma: PrismaClient

if (typeof window === 'undefined') {
	if (process.env.NODE_ENV === 'production') {
		prisma = new PrismaClient()
	} else {
		if (!global.prisma) {
			global.prisma = new PrismaClient()
		}

		prisma = global.prisma
	}
}

export default prisma
