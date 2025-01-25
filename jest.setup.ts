import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import { configure } from "@testing-library/react";

// Configure React Testing Library
configure({
  testIdAttribute: "data-testid",
});

// Polyfills for Next.js with proper typing
Object.assign(global, {
  TextEncoder: TextEncoder,
  TextDecoder: TextDecoder as {
    new (label?: string, options?: TextDecoderOptions): TextDecoder;
    prototype: TextDecoder;
  },
});

// Mock Next.js router
jest.mock("next/router", () => require("next-router-mock"));

// Add window.matchMedia mock
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
