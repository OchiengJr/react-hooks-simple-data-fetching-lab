import { rest } from "msw";
import { dogImageData } from "./data";

// Define a Mock Service Worker (MSW) handler to intercept the GET request for dog images.
export const dogImageHandler = rest.get("https://dog.ceo/api/breeds/image/random", (req, res, ctx) => {
  try {
    // Return a successful response with the mock data.
    return res(ctx.json(dogImageData));
  } catch (error) {
    // Handle errors if the request fails.
    console.error("Error handling dog image request:", error);
    // Return an error response.
    return res(ctx.status(500), ctx.json({ error: "Failed to fetch dog image data" }));
  }
});
