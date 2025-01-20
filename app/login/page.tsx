"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
// --- NextAuthの signIn をインポート ---
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // GitHubログインボタンクリック時
  const handleGithubLogin = async () => {
    setIsLoading(true);
    // callbackUrl を指定すると、認証成功後にそこに遷移
    // 例: "/onboarding" や "/dashboard" など
    await signIn("github", {
      callbackUrl: "/onboarding",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-[1200px] md:px-8 lg:px-12">
        {/* ヘッダー */}
        <div className="flex flex-col items-center mb-8">
          <BookOpenCheck className="h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold">Learning Advisor</h1>
          <p className="mt-2 text-gray-600">あなたの学習をスマートに管理</p>
        </div>

        {/* カード + タブ切り替え */}
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">ログイン</TabsTrigger>
              <TabsTrigger value="register">新規登録</TabsTrigger>
            </TabsList>

            {/* ログインタブ */}
            <TabsContent value="login" className="bg-white rounded-xl">
              <Card>
                <CardHeader>
                  <CardTitle>ログイン</CardTitle>
                  <CardDescription>
                    GitHubアカウントでログインして学習を始めましょう
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Email/Password フォームは削除・コメントアウト */}
                  {/* 代わりにGitHubでログインするボタンを設置 */}
                  <p className="text-sm text-gray-500">
                    下記ボタンを押すと、GitHubのOAuth認証画面に移動します。
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleGithubLogin}
                    className="w-full bg-indigo-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "ログイン中..." : "GitHubでログイン"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* 新規登録タブ */}
            <TabsContent value="register" className="bg-white rounded-xl">
              <Card>
                <CardHeader>
                  <CardTitle>新規登録</CardTitle>
                  <CardDescription>
                    GitHubアカウントを利用して始めましょう
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 本来のEmail/パスワード入力は削除 or コメントアウト */}
                  {/* ここでもGitHub連携用の説明・ボタンのみ表示 */}
                  <p className="text-sm text-gray-500">
                    下記ボタンを押すと、GitHubのOAuth認証画面に移動します。
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleGithubLogin}
                    className="w-full bg-indigo-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "登録処理中..." : "GitHubで新規登録"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
