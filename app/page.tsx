"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpenCheck,
  Target,
  Clock,
  Calendar,
  ChartLine as ChartLineUp,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoadmapPage from "./roadmap/page";
import DashboardPage from "./dashboard/page";
import TasksPage from "./tasks/page";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {!session ? (
          <>
            {/* Landing Content */}
            <div className="flex flex-col items-center justify-center h-[400px] pt-16 space-y-4">
              <BookOpenCheck className="h-16 w-16 text-indigo-600 mx-auto" />
              <h1 className="text-5xl font-bold text-gray-900">
                Learning Advisor
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center">
                あなたの学習をスマートに管理し、目標達成をサポートする
                最先端のAIアドバイザー
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Link href="/login">無料で始める</Link>
                </Button>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                  主な機能
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center space-y-4">
                    <Target className="h-12 w-12 text-indigo-600 mx-auto" />
                    <h3 className="text-xl font-semibold">目標設定</h3>
                    <p className="text-gray-600">
                      SMARTとOKRを活用した効果的な目標設定
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <Clock className="h-12 w-12 text-indigo-600 mx-auto" />
                    <h3 className="text-xl font-semibold">時間管理</h3>
                    <p className="text-gray-600">
                      平日・休日別の最適な学習時間配分
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <Calendar className="h-12 w-12 text-indigo-600 mx-auto" />
                    <h3 className="text-xl font-semibold">タスク管理</h3>
                    <p className="text-gray-600">
                      日々の進捗を可視化し、モチベーションを維持
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <ChartLineUp className="h-12 w-12 text-indigo-600 mx-auto" />
                    <h3 className="text-xl font-semibold">進捗分析</h3>
                    <p className="text-gray-600">
                      AIによる定期的な振り返りと改善提案
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-16">
              <div className="bg-indigo-600 rounded-2xl p-8 md:p-16 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  今すぐ学習を始めましょう
                </h2>
                <p className="text-xl mb-8">
                  無料で始められる、あなただけの学習マネージャー
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-black"
                >
                  <Link href="/login">アカウント作成</Link>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">ダッシュボード</TabsTrigger>
              <TabsTrigger value="tasks">タスク</TabsTrigger>
              <TabsTrigger value="roadmap">ロードマップ</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <DashboardPage />
            </TabsContent>
            <TabsContent value="tasks">
              <TasksPage />
            </TabsContent>
            <TabsContent value="roadmap">
              <RoadmapPage />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
