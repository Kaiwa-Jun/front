import React from "react";
import { render, screen } from "@testing-library/react";
// テスト対象のページ
import Dashboard from "./page";

// next-auth/react と next/navigation のフックをモックする
jest.mock("next-auth/react", () => ({
  // デフォルトエクスポートがある場合は {} で返すように
  // ただしこの例では useSession だけをモック
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Dashboard Page", () => {
  // モック用の変数を宣言
  const mockUseSession = require("next-auth/react").useSession;
  const mockUseRouter = require("next/navigation").useRouter;

  beforeEach(() => {
    // 各テスト前にモック関数をリセット
    jest.clearAllMocks();
  });

  test("認証されていない場合、/login にリダイレクトされる", () => {
    // useSession の戻り値を unauthenticated に設定
    mockUseSession.mockReturnValue({
      status: "unauthenticated",
    });

    const pushMock = jest.fn();
    mockUseRouter.mockReturnValue({
      push: pushMock,
    });

    render(<Dashboard />);
    // unauthenticated なら useEffect 内で router.push("/login") が呼ばれるはず
    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  test("ロード中 (loading) のときは何も表示されない", () => {
    mockUseSession.mockReturnValue({ status: "loading" });
    mockUseRouter.mockReturnValue({ push: jest.fn() });

    const { container } = render(<Dashboard />);
    // DOM を何も描画しないので、container が空の状態かどうかを確認
    expect(container).toBeEmptyDOMElement();
  });

  test("認証済み (authenticated) の場合はダッシュボードが描画される", () => {
    mockUseSession.mockReturnValue({ status: "authenticated" });
    mockUseRouter.mockReturnValue({ push: jest.fn() });

    render(<Dashboard />);
    // ダッシュボードの文言が表示されているかどうか
    expect(screen.getByText("ダッシュボード")).toBeInTheDocument();
    expect(
      screen.getByText("学習の進捗状況を確認しましょう")
    ).toBeInTheDocument();
  });
});
