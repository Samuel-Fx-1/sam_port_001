export default async function handler(req, res)
{
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS")
        return res.status(200).end();

    const q = req.query.q || "";
    if (!q)
        return res.status(400).json({ error: "Missing q" });

    // iTunes fallback (no credentials required)
    try
    {
        const ir = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=musicTrack&limit=5`);
        const id = await ir.json();
        return res.status(200).json(
            {
                source: "itunes",
                tracks: (id.results || []).map((t) => ({ name: t.trackName, artist: t.artistName, preview: t.previewUrl }))
            }
        );
    }
    catch (err)
    {
        return res.status(502).json({ error: "Music search failed" });
    }
}
