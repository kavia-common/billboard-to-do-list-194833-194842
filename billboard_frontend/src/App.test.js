import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Billboard header", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { name: /billboard/i });
  expect(heading).toBeInTheDocument();
});
