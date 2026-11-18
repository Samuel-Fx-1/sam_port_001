let guestbook = [];

export default async function handler(req, res)
{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS")
        return res.status(200).end();

    if (req.method === "GET")
    {
        if (!process.env.MONGODB_URI)
            return res.status(503).json([]);
        return res.status(200).json(guestbook);
    }

    if (req.method === "POST")
    {
        if (!process.env.MONGODB_URI)
            return res.status(503).json({ error: "Guestbook not configured" });
        const entry = { id: Date.now(), message: req.body.message, flag: req.body.flag, createdAt: new Date().toISOString(), approved: false };
        guestbook.push(entry);
        return res.status(200).json(entry);
    }

    return res.status(405).json({ error: "Method not allowed" });
}
