import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";

import App from "../components/App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App Component", () => {
  test("renders loading message initially", () => {
    render(<App />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  test("displays the dog image after successful fetch", async () => {
    render(<App />);
    const loadingMessage = screen.getByText(/Loading/);
    expect(loadingMessage).toBeInTheDocument();

    await waitFor(() => {
      const img = screen.getByAltText("A Random Dog");
      expect(img).toBeInTheDocument();
      expect(img.src).toBe("https://images.dog.ceo/breeds/bulldog-english/mami.jpg");
      expect(loadingMessage).not.toBeInTheDocument();
    });
  });

  test("displays error message if fetch fails", async () => {
    // Mock a server error response
    server.use(
      rest.get("https://dog.ceo/api/breeds/image/random", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<App />);
    const loadingMessage = screen.getByText(/Loading/);
    expect(loadingMessage).toBeInTheDocument();

    await waitFor(() => {
      const errorMessage = screen.getByText(/Error fetching data/);
      expect(errorMessage).toBeInTheDocument();
      expect(loadingMessage).not.toBeInTheDocument();
    });
  });
});
