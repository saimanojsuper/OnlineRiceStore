import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

test("Example 1 renders successfully", () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  const element = screen.getByText(/About us/i);

  expect(element).toBeInTheDocument();
});
