import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { signIn } from "next-auth/react";
import Login from "./page";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("Login Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GitHub ログインボタンがクリックされたときに signIn が呼び出される", async () => {
    const { getByText } = render(<Login />);
    const githubButton = getByText("GitHubでログイン");
    fireEvent.click(githubButton);
    expect(signIn).toHaveBeenCalledWith("github", {
      callbackUrl: "/onboarding",
    });
  });

  test("Google ログインボタンがクリックされたときに signIn が呼び出される", async () => {
    const { getByText } = render(<Login />);
    const googleButton = getByText("Googleでログイン");
    fireEvent.click(googleButton);
    expect(signIn).toHaveBeenCalledWith("google", {
      callbackUrl: "/onboarding",
    });
  });
});
