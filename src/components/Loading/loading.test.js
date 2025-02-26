import { render, screen, fireEvent } from "@testing-library/react";
import { Loading } from "./loading"; // Adjust the import according to your file structure

// A simple component to wrap
const TestComponent = ({ setLoading }) => (
  <div>
    <button onClick={() => setLoading(true)}>Load</button>
    <p>Test Component</p>
  </div>
);

// Wrap TestComponent with the Loading HOC
const WrappedComponent = Loading(TestComponent);

describe("Loading HOC", () => {
  test("should display loading spinner when isloading is true", () => {
    render(<WrappedComponent />);

    // Initially, the loading state is false, so Backdrop and CircularProgress shouldn't be visible
    expect(screen.queryByTestId("loading")).toBeNull();
    expect(screen.getByText("Test Component")).toBeInTheDocument();

    // Now, simulate clicking the button to setLoading to true
    fireEvent.click(screen.getByText("Load"));

    // When the loading state is true, the Backdrop and CircularProgress should appear

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.getByText("Test Component")).toBeInTheDocument();
  });

  test("should render wrapped component when isloading is false", () => {
    render(<WrappedComponent />);

    // Check if the wrapped component is rendered
    expect(screen.getByText("Test Component")).toBeInTheDocument();

    // Initially, loading is false, so the backdrop and progress spinner should not be visible
    expect(screen.queryByRole("progressbar")).toBeNull();
  });

  test("should toggle loading state on button click", () => {
    render(<WrappedComponent />);

    // Initially, the wrapped component is rendered
    expect(screen.getByText("Test Component")).toBeInTheDocument();

    // Button should change the loading state to true when clicked
    fireEvent.click(screen.getByText("Load"));

    // After clicking the button, the CircularProgress spinner should be shown
    expect(screen.queryByTestId("loading")).toBeInTheDocument();

    // Simulate clicking it again to toggle the loading state
    fireEvent.click(screen.getByText("Load"));

    // After clicking the button again, the spinner should be hidden
    expect(screen.queryByTestId("loaded")).toBeNull();
  });
});
