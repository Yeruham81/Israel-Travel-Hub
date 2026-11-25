/** Keep directories, services and retired navigation aliases out of the panel. */
const retiredGuides = new Set([
  "/travel-blog/haifa/",
  "/travel-blog/sea-of-galilee/",
  "/travel-blog/the-dead-sea/",
]);

export function normalizedSharePath(pathname: string) {
  return `${(pathname.split(/[?#]/, 1)[0] ?? "").replace(/\/+$/, "")}/`;
}

export function isShareableContentPath(pathname: string) {
  const path = normalizedSharePath(pathname);
  if (retiredGuides.has(path)) return false;
  return (
    /^\/(travel-blog|attractions)\/[^/]+\/$/.test(path) ||
    /^\/accommodation\/[^/]+(?:\/[^/]+)?\/$/.test(path) ||
    path === "/car-rental/"
  );
}

export type ShareNetwork =
  "whatsapp" | "facebook" | "x" | "telegram" | "pinterest" | "linkedin" | "email";
export type PageShareDetails = { url: string; title: string; image?: string };

/** Only the public page path is shared; campaign, form and hash values stay local. */
export function contentShareUrl(pathname: string, origin: string) {
  return new URL(normalizedSharePath(pathname), origin).href;
}

export function networkShareUrl(network: ShareNetwork, page: PageShareDetails) {
  const { url, title, image } = page;
  const query = (values: Record<string, string>) => new URLSearchParams(values).toString();
  switch (network) {
    case "whatsapp":
      return `https://api.whatsapp.com/send?${query({ text: `${title}\n${url}` })}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?${query({ u: url })}`;
    case "x":
      return `https://x.com/intent/tweet?${query({ url, text: title })}`;
    case "telegram":
      return `https://t.me/share/url?${query({ url, text: title })}`;
    case "pinterest":
      return `https://www.pinterest.com/pin/create/button/?${query({ url, description: title, ...(image ? { media: image } : {}) })}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?${query({ url })}`;
    case "email":
      return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\r\n\r\n${url}`)}`;
  }
}
