/**
 * front/app/dashboard/page.test.tsx
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import * as nextAuth from "next-auth/react";
import * as nextNavigation from "next/navigation";

// 先にモジュールをモック化しておく
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// テスト対象のコンポーネントを最後に import
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

    render(<Dashboard />);
    expect(screen.getByText("ダッシュボード")).toBeInTheDocument();
    expect(
      screen.getByText("学習の進捗状況を確認しましょう")
    ).toBeInTheDocument();
  });
});
