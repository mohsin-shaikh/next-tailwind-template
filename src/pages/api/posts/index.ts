import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

/**
 * Search - GET
 * Create - POST
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;

    // Search - GET
    if (method === 'GET') {
        try {
            /**
             * Query Parameters
             * @page        Number
             * @perPage     Number
             * @sort        String
             * @filter      String
             */
            const data = await prisma.post.findMany({
                // where: { user_id: user.id, OR: categoriesList.map((category) => ({ category: { contains: category } })) },
                select: {
                    id: true,
                    title: true,
                    published: true,
                    authorId: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: {
                    updatedAt: 'desc',
                },
            });
            return res.status(200).json({
                page: 1, // offset
                perPage: 100,
                totalItems: 3,
                items: data
            });
        } catch (error) {
            return res.status(500).json({ error, message: 'Failed' });
        }
    }

    // Create - POST
    if (method === 'POST') {
        try {
            await prisma.post.create({
                data: req.body,
            });
            return res.status(201).json({ message: 'Added' });
        } catch (error) {
            return res.status(500).json({ error, message: 'Failed' });
        }
    }

    // Allowed Method's 
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
