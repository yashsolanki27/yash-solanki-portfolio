import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CopyEmailLink from "@/components/ui/CopyEmailLink";

describe("CopyEmailLink", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    navigator.clipboard.writeText.mockResolvedValue(undefined);
  });

  it("renders with default label", () => {
    render(<CopyEmailLink email="test@example.com" />);
    expect(screen.getByRole("button", { name: /email/i })).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<CopyEmailLink email="test@example.com" label="Copy Email" />);
    expect(screen.getByRole("button", { name: /copy email/i })).toBeInTheDocument();
  });

  it("copies email to clipboard on click", async () => {
    render(<CopyEmailLink email="test@example.com" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test@example.com");
    });
  });

  it("shows 'Copied' feedback after click", async () => {
    render(<CopyEmailLink email="test@example.com" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/copied/i)).toBeInTheDocument();
    });
  });

  it("reverts label after 2 seconds", async () => {
    render(<CopyEmailLink email="test@example.com" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Wait for "Copied" to appear
    await waitFor(() => {
      expect(screen.getByText(/copied/i)).toBeInTheDocument();
    });

    // Wait for it to revert back to "Email"
    await waitFor(
      () => {
        expect(screen.getByRole("button", { name: /email/i })).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
