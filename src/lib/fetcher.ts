const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const appID = process.env.NEXT_PUBLIC_APP_ID;

export const fetcher = (url: string) =>
  fetch(baseURL + url, {
    cache: "no-store",
    headers: {
      "app-id": appID!,
    },
  }).then((res) => res.json());
