addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  const url = new URL(request.url);
  let customHeaders = {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate",
    "Expires": "Thu, 01 Jan 1970 00:00:01 GMT",
    "Content-Security-Policy": "default-src 'none';",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-Did-You-Know": "You can use \"curl -4 simpip.com\" or \"curl -6 simpip.com\" to get either address!",
    "X-Source-Code": "https://github.com/jakejarvis/simpip"
  }
  if (url.pathname === '/') {
    return new Response(request.headers.get("cf-connecting-ip") + "\n", {
      status: 200,
      statusText: "OK",
      headers: customHeaders
    })
  } else {
    return new Response("404 Not Found\n", {
      status: 404,
      statusText: "Not Found",
      headers: customHeaders
    })
  }
}
