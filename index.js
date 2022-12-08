const handle = async (request) => {
  const opts = {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Content-Security-Policy" : "upgrade-insecure-requests",
        "Strict-Transport-Security" : "max-age=1000",
        "X-Xss-Protection" : "1; mode=block",
        "X-Frame-Options" : "DENY",
        "X-Content-Type-Options" : "nosniff",
        "Referrer-Policy" : "strict-origin-when-cross-origin",
      "X-Did-You-Know": "You can use \"curl -4\" or \"curl -6\" to get either IP address!",
      "X-View-Source": "https://github.com/davelevine/checkip",
    },
  };

  if (new URL(request.url).pathname === "/") {
    const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for");

    return new Response(ip + "\n", {
      status: 200,
      statusText: "OK",
      ...opts,
    });
  }

  return new Response("404 Not Found\n", {
    status: 404,
    statusText: "Not Found",
    ...opts,
  });
};

addEventListener("fetch", (event) => {
  event.respondWith(handle(event.request));
});
