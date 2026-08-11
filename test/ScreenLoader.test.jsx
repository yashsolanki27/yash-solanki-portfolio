import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ScreenLoader from "@/components/sections/ScreenLoader";

vi.mock("@/styles/sections/ScreenLoader.module.css", () => ({
  default: new Proxy(
    {},
    {
      get: (_, key) => key,
    }
  ),
}));

describe("ScreenLoader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the portfolio name", () => {
    render(<ScreenLoader />);
    expect(screen.getByText(/yash/i)).toBeInTheDocument();
    expect(screen.getByText(/solanki/i)).toBeInTheDocument();
  });

  it("renders the ENTER button", () => {
    render(<ScreenLoader />);
    expect(screen.getByRole("button", { name: /enter/i })).toBeInTheDocument();
  });

  it("renders the year eyebrow", () => {
    render(<ScreenLoader />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`Portfolio · ${year}`))).toBeInTheDocument();
  });

  it("calls onDismiss after clicking ENTER and waiting for animation", () => {
    const onDismiss = vi.fn();
    render(<ScreenLoader onDismiss={onDismiss} />);

    fireEvent.click(screen.getByRole("button", { name: /enter/i }));

    expect(onDismiss).not.toHaveBeenCalled();

    vi.advanceTimersByTime(700);

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("adds leaving class on click", () => {
    render(<ScreenLoader />);
    const overlay = screen.getByText(/yash/i).closest("div");
    fireEvent.click(screen.getByRole("button", { name: /enter/i }));
    expect(overlay).toHaveClass("leave");
  });
});
