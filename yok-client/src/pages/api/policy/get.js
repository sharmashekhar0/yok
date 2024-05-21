// pages/api/privacy-policy.js
import connectToDatabase from '../../../lib/mongodb';
import PrivacyPolicy from '../../../models/PrivacyPolicy';
import corsMiddleware from '../../../lib/cors';


connectToDatabase();

export default async function handler(req, res) {
    await corsMiddleware(req, res, async () => {
        if (req.method === 'GET') {
            try {
                // Retrieve the latest privacy policy content
                const latestPolicy = await PrivacyPolicy.findOne().sort({ createdAt: -1 });

                res.status(200).json({ privacyPolicy: latestPolicy ? latestPolicy : null });
            } catch (error) {
                console.error('Error retrieving privacy policy:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    });
}
