"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Roadmap() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return null; // 認証状態が確認されるまで何も表示しない
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8 pt-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">ロードマップ</h1>
          <p className="text-gray-600 mt-2">
            目標達成までの道のりを可視化します
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["1ヶ月目", "2ヶ月目", "3ヶ月目", "4ヶ月目"].map((month) => (
            <Card key={month} className="bg-white">
              <CardHeader>
                <CardTitle>{month}</CardTitle>
                <CardDescription>主要なマイルストーン</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-2 bg-slate-200 rounded-md">基礎学習</div>
                  <div className="p-2 bg-slate-200 rounded-md">演習問題</div>
                  <div className="p-2 bg-slate-200 rounded-md">
                    プロジェクト
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => router.push("/tasks")}
            className="bg-indigo-600 text-white"
          >
            次へ：タスク管理
          </Button>
        </div>
      </div>
    </div>
  );
}
