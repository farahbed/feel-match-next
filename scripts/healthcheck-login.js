// scripts/healthcheck-login.js

const API_URL = "http://localhost:3000/api/login";

async function run() {
  try {
    const res = await fetch(API_URL, {
      method: "OPTIONS",
    });

    if (!res.ok) {
      throw new Error(`Status ${res.status}`);
    }

    console.log("✅ /api/login is reachable");
  } catch (err) {
    console.error("❌ /api/login healthcheck failed");
    console.error(err);
    process.exit(1);
  }
}

run();