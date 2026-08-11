import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/ui/Navbar";

vi.mock("@/styles/ui/Navbar.module.css", () => ({
  default: new Proxy(
    {},
    {
      get: (_, key) => key,
    }
  ),
}));

vi.mock("react-icons/fi", () => ({
  FiMenu: (props) => <span data-testid="fi-menu" {...props} />,
  FiX: (props) => <span data-testid="fi-x" {...props} />,
}));

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the brand name", () => {
    render(<Navbar />);
    expect(screen.getByText(/yash solanki/i)).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /work/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /dev tools/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /case studies/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /education/i })).toBeInTheDocument();
  });

  it("renders the Contact CTA button", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /contact/i })).toBeInTheDocument();
  });

  it("renders the mobile menu toggle", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("toggles mobile menu on click", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
  });

  it("closes mobile menu when item is clicked", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(toggle);

    // When mobile menu is open, there are two "About" buttons (desktop + mobile)
    // Click the mobile one (inside mobilePanel)
    const aboutBtns = screen.getAllByRole("button", { name: /^about$/i });
    const mobileAboutBtn = aboutBtns.find((btn) => btn.className.includes("mobileItem"));
    fireEvent.click(mobileAboutBtn);

    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("has proper aria-label for nav", () => {
    render(<Navbar />);
    expect(screen.getByLabelText("Primary")).toBeInTheDocument();
  });
});
