import * as http from "http"

const COUCHDB_URL = process.env.COUCHDB_URL;
const COUCHDB_USER = process.env.COUCHDB_USER;
const COUCHDB_PASSWORD = process.env.COUCHDB_PASSWORD;
const ALLOWED_ORIGIN = process.env.BACKEND_ALLOWED_ORIGINS || "*";
const AUTH = "Basic " + Buffer.from(`${COUCHDB_USER}:${COUCHDB_PASSWORD}`).toString("base64");

const corsHeaders = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

const server = http.createServer(async (req, res) => {
    if (req.method === "OPTIONS") {
        res.writeHead(204, corsHeaders).end();
        return;
    }

    if (req.method !== "POST" || req.url !== "/") {
        res.writeHead(404).end("Not found");
        return;
    }

    let body;
    try {
        body = await new Promise((resolve, reject) => {
            let data = "";
            req.on("data", (chunk) => data += chunk);
            req.on("end", () => resolve(JSON.parse(data)));
            req.on("error", reject);
        });
    } catch {
        res.writeHead(400, { ...corsHeaders, "Content-Type": "application/json" })
            .end(JSON.stringify({ error: "Invalid JSON" }));
        return;
    }

    const { name, password } = body;

    if (!name || !password) {
        res.writeHead(400, { ...corsHeaders, "Content-Type": "application/json" })
            .end(JSON.stringify({ error: "name and password are required" }));
        return;
    }

    const id = `org.couchdb.user:${name}`;
    const response = await fetch(
        `${COUCHDB_URL}/_users/${encodeURIComponent(id)}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": AUTH,
            },
            body: JSON.stringify({ _id: id, name, password, roles: [], type: "user" }),
        }
    );

    res
        .writeHead(response.status, { ...corsHeaders, "Content-Type": "application/json" })
        .end(JSON.stringify(await response.json()));
});

server.listen(3000, () => console.log("Proxy running on port 3000"));
