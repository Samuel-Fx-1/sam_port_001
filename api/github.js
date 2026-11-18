export default async function handler(req, res)
{
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS")
        return res.status(200).end();

    try
    {
        const user = process.env.GITHUB_USER || "Samuel-Fx-1";
        const headers = {};
        if (process.env.GITHUB_TOKEN)
            headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
        const profileRes = await fetch(`https://api.github.com/users/${user}`, { headers });
        const profile = await profileRes.json();
        const reposRes = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=6`, { headers });
        const repos = await reposRes.json();
        return res.status(200).json({ profile, repos });
    }
    catch (err)
    {
        return res.status(500).json({ error: "GitHub lookup failed" });
    }
}
