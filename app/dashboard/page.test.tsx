import React from "react";
import { render } from "@testing-library/react";
/**
 * front/app/dashboard/page.test.tsx
 */
import * as nextAuth from "next-auth/react";
import * as nextNavigation from "next/navigation";

// Mock Next.js page component
jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

// Mock authentication and navigation
jest.mock("next-auth/react", () => {
  return {
    useSession: jest.fn(),
  };
});
jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn(),
  };
});

// Import the page component wrapped with necessary providers
import Dashboard from "./page";

describe("Dashboard Page (Pattern A)", () => {
  beforeEach(() => {
    // 各テスト開始前にモックをクリア
    jest.clearAllMocks();
  });

  test("認証されていない場合、/login にリダイレクトされる", () => {
    // useSession の返り値を unauthenticated に設定
    (nextAuth.useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
    });

    // useRouter の push をモック
    const pushMock = jest.fn();
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    render(<Dashboard />);
    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  test("ロード中 (loading) のときは何も表示されない", () => {
    (nextAuth.useSession as jest.Mock).mockReturnValue({ status: "loading" });
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    const { container } = render(<Dashboard />);
    expect(container).toBeEmptyDOMElement();
  });

  test("認証済み (authenticated) の場合はダッシュボードが描画される", () => {
    (nextAuth.useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
    });
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    const { getByText } = render(<Dashboard />);
    expect(getByText("ダッシュボード")).toBeInTheDocument();
    expect(getByText("学習の進捗状況を確認しましょう")).toBeInTheDocument();
  });
});
