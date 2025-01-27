import React from "react";
import { render } from "@testing-library/react";
import * as nextAuth from "next-auth/react";
import * as nextNavigation from "next/navigation";
import Onboarding from "./page";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Onboarding Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("認証されていない場合、/login にリダイレクトされる", () => {
    (nextAuth.useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
    });

    const pushMock = jest.fn();
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    render(<Onboarding />);
    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  test("認証済みの場合、ページが正しくレンダリングされる", () => {
    (nextAuth.useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
    });
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    const { getByText } = render(<Onboarding />);
    // ページ内の特定のテキストを確認
    expect(getByText("基本設定")).toBeInTheDocument();
    expect(
      getByText("あなたの目標と学習時間を教えてください")
    ).toBeInTheDocument();
  });
});
