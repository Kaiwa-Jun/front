import React from "react";
import { render, fireEvent } from "@testing-library/react";
import * as nextAuth from "next-auth/react";
import * as nextNavigation from "next/navigation";
import GoalSetting from "./page";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("GoalSetting Page", () => {
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

    render(<GoalSetting />);
    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  test("ロード中 (loading) のときは何も表示されない", () => {
    (nextAuth.useSession as jest.Mock).mockReturnValue({ status: "loading" });
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    const { container } = render(<GoalSetting />);
    expect(container).toBeEmptyDOMElement();
  });

  test("認証済み (authenticated) の場合、入力フィールドが正しくレンダリングされる", () => {
    (nextAuth.useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
    });
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    const { getByPlaceholderText } = render(<GoalSetting />);
    expect(
      getByPlaceholderText("具体的に何を達成したいですか？")
    ).toBeInTheDocument();
    expect(
      getByPlaceholderText("どのように進捗を測定しますか？")
    ).toBeInTheDocument();
    expect(
      getByPlaceholderText("現実的に達成可能ですか？")
    ).toBeInTheDocument();
    expect(
      getByPlaceholderText("なぜこの目標が重要ですか？")
    ).toBeInTheDocument();
    expect(
      getByPlaceholderText("達成したい大きな目標は何ですか？")
    ).toBeInTheDocument();
  });
});
