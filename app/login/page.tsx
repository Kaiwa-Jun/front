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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding");
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
            <TabsContent value="login" className="bg-white rounded-xl">
              <Card>
                <CardHeader>
                  <CardTitle>ログイン</CardTitle>
                  <CardDescription>
                    アカウントにログインして学習を始めましょう
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">パスワード</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 text-white"
                    >
                      ログイン
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="register" className="bg-white rounded-xl">
              <Card>
                <CardHeader>
                  <CardTitle>新規登録</CardTitle>
                  <CardDescription>
                    新しいアカウントを作成して始めましょう
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">メールアドレス</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">パスワード</Label>
                      <Input id="register-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        パスワード（確認）
                      </Label>
                      <Input id="confirm-password" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 text-white"
                    >
                      アカウント作成
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
