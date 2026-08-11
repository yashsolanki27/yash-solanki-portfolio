import "@testing-library/jest-dom";

// Mock navigator.clipboard for CopyEmailLink tests
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
  writable: true,
});

// Mock window.matchMedia for ScrollAnimations
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock framer-motion / GSAP (stub out for unit tests)
vi.mock("gsap", () => ({
  gsap: {
    context: vi.fn((fn) => {
      fn();
      return { revert: vi.fn() };
    }),
    fromTo: vi.fn(),
    to: vi.fn(),
    utils: { toArray: vi.fn(() => []) },
  },
  ScrollTrigger: {},
}));

vi.mock("@/lib/gsap", () => ({
  gsap: {
    context: vi.fn((fn) => {
      fn();
      return { revert: vi.fn() };
    }),
    fromTo: vi.fn(),
    to: vi.fn(),
    utils: { toArray: vi.fn(() => []) },
  },
  ScrollTrigger: {},
}));

// Mock next/dynamic
vi.mock("next/dynamic", () => {
  return function mockDynamic(factory, opts) {
    const MockComponent = (props) => {
      return null;
    };
    MockComponent.displayName = "DynamicComponent";
    return MockComponent;
  };
});

// Mock next/image
vi.mock("next/image", () => {
  return function MockImage({ alt, ...props }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  };
});

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Fraunces: () => ({
    variable: "--font-display",
    className: "fraunces",
  }),
  Inter: () => ({
    variable: "--font-body",
    className: "inter",
  }),
}));
