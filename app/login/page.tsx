"use client";

import { useState } from "react";
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
import { signIn } from "next-auth/react";

export default function Login() {
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const handleGithubLogin = async () => {
    setIsLoadingGithub(true);
    await signIn("github", {
      callbackUrl: "/onboarding",
    });
    setIsLoadingGithub(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true);
    await signIn("google", {
      callbackUrl: "/onboarding",
    });
    setIsLoadingGoogle(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-[1200px] md:px-8 lg:px-12">
        <div className="flex flex-col items-center mb-8">
          <BookOpenCheck className="h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold">Learning Advisor</h1>
          <p className="mt-2 text-gray-600">あなたの学習をスマートに管理</p>
        </div>

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
                    OAuthアカウントでログインして学習を始めましょう
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-500">
                    下記ボタンを押すと、各プロバイダのOAuth認証画面に移動します。
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  {/* GitHubボタン */}
                  <Button
                    onClick={handleGithubLogin}
                    disabled={isLoadingGithub}
                    className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
                  >
                    {isLoadingGithub ? (
                      "ログイン中..."
                    ) : (
                      <>
                        {/* GitHubアイコン（白背景にアイコンを載せる） */}
                        <span className="inline-block w-5 h-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-full h-full fill-current"
                          >
                            <path d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z" />
                          </svg>
                        </span>
                        <span>GitHubでログイン</span>
                      </>
                    )}
                  </Button>

                  {/* Googleボタン */}
                  <Button
                    onClick={handleGoogleLogin}
                    disabled={isLoadingGoogle}
                    className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
                  >
                    {isLoadingGoogle ? (
                      "ログイン中..."
                    ) : (
                      <>
                        {/* Googleアイコン（マルチカラー） */}
                        <span className="inline-block w-5 h-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            className="w-full h-full"
                          >
                            <path
                              fill="#FFC107"
                              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                            />
                            <path
                              fill="#FF3D00"
                              d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                            />
                            <path
                              fill="#4CAF50"
                              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                            />
                            <path
                              fill="#1976D2"
                              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                            />
                          </svg>
                        </span>
                        <span>Googleでログイン</span>
                      </>
                    )}
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
                    GitHub / Google アカウントを利用して始めましょう
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-500">
                    下記ボタンを押すと、各プロバイダのOAuth認証画面に移動します。
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  {/* GitHub 新規登録 */}
                  <Button
                    onClick={handleGithubLogin}
                    disabled={isLoadingGithub}
                    className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
                  >
                    {isLoadingGithub ? (
                      "登録処理中..."
                    ) : (
                      <>
                        <span className="inline-block w-5 h-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-full h-full fill-current"
                          >
                            <path d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z" />
                          </svg>
                        </span>
                        <span>GitHubで新規登録</span>
                      </>
                    )}
                  </Button>

                  {/* Google 新規登録 */}
                  <Button
                    onClick={handleGoogleLogin}
                    disabled={isLoadingGoogle}
                    className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
                  >
                    {isLoadingGoogle ? (
                      "登録処理中..."
                    ) : (
                      <>
                        <span className="inline-block w-5 h-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            className="w-full h-full"
                          >
                            <path
                              fill="#FFC107"
                              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                            />
                            <path
                              fill="#FF3D00"
                              d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                            />
                            <path
                              fill="#4CAF50"
                              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                            />
                            <path
                              fill="#1976D2"
                              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                            />
                          </svg>
                        </span>
                        <span>Googleで新規登録</span>
                      </>
                    )}
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
