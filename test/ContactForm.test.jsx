import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "@/components/sections/ContactForm";

// Mock the CSS module
vi.mock("@/styles/sections/ContactForm.module.css", () => ({
  default: new Proxy(
    {},
    {
      get: (_, key) => key,
    }
  ),
}));

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("shows validation error for empty name on blur", async () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "invalid" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
    });
  });

  it("shows validation error for short message", async () => {
    render(<ContactForm />);
    const messageInput = screen.getByLabelText(/message/i);
    fireEvent.change(messageInput, { target: { value: "short" } });
    fireEvent.blur(messageInput);

    await waitFor(() => {
      expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it("shows character count for message", () => {
    render(<ContactForm />);
    expect(screen.getByText("0 / 2000")).toBeInTheDocument();
  });

  it("updates character count when typing", () => {
    render(<ContactForm />);
    const messageInput = screen.getByLabelText(/message/i);
    fireEvent.change(messageInput, { target: { value: "Hello World" } });
    expect(screen.getByText("11 / 2000")).toBeInTheDocument();
  });

  it("has honeypot field for spam protection", () => {
    render(<ContactForm />);
    const honeypot = screen.getByLabelText(/leave this field empty/i);
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
  });

  it("disables submit when form is invalid", () => {
    render(<ContactForm />);
    const submitBtn = screen.getByRole("button", { name: /send message/i });
    expect(submitBtn).toBeDisabled();
  });
});
