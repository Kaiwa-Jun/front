"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Tasks() {
  const router = useRouter();
  const { data: session, status } = useSession();

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
      <div className="max-w-[1200px] mx-auto space-y-8 pt-8 px-4 md:px-8 lg:px-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold">タスク管理</h1>
          <p className="text-gray-600 mt-2">今日の学習タスクを確認しましょう</p>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>本日のタスク</CardTitle>
            <CardDescription>2024年3月20日</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "プログラミング基礎の復習",
                "演習問題を3問解く",
                "プロジェクトの計画立案",
                "オンライン講座の受講",
              ].map((task, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`task-${index}`} />
                  <label
                    htmlFor={`task-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {task}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-indigo-600 text-white"
          >
            次へ：ダッシュボード
          </Button>
        </div>
      </div>
    </div>
  );
}
