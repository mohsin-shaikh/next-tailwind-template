import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

/**
 * Get    - GET
 * Update - PATCH
 * Delete - DELETE
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query: { id }, method } = req;

    // Invalid ID
    if (!id) {
        return res.status(400).json({ error: `Invalid Request` });
    }

    // Get - GET
    if (method === 'GET') {
        try {
            const data = await prisma.post.findUnique({
                where: { id: Number(id) },
                // select: {
                //     id: true,
                //     title: true,
                //     published: true,
                //     authorId: true,
                //     createdAt: true,
                //     updatedAt: true,
                // },
            });
            return res.status(200).json(data ? data : {});
        } catch (error) {
            return res.status(500).json({ error, message: 'Failed' });
        }
    }

    // Update - PATCH
    if (method === 'PATCH') {
        try {
            await prisma.post.update({
                data: req.body,
                where: { id: Number(id) },
            });
            return res.status(200).json({ message: 'Updated' });
        } catch (error) {
            return res.status(500).json({ error, message: 'Failed' });
        }
    }

    // Delete - DELETE
    if (method === 'DELETE') {
        try {
            await prisma.post.delete({
                where: { id: Number(id) },
            });
            return res.status(200).json({ message: 'Deleted' });
        } catch (error) {
            return res.status(500).json({ error, message: 'Failed' });
        }
    }

    // Allowed Method's 
    res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
