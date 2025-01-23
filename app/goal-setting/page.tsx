"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function GoalSetting() {
  const router = useRouter();
  const { status } = useSession();

  // SMART目標のstate
  const [specific, setSpecific] = useState("");
  const [measurable, setMeasurable] = useState("");
  const [achievable, setAchievable] = useState("");
  const [relevant, setRelevant] = useState("");
  const [timeBound, setTimeBound] = useState("");

  // OKRのstate
  const [objective, setObjective] = useState("");
  const [keyResults, setKeyResults] = useState("");

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
          <h1 className="text-3xl font-bold">目標詳細設定</h1>
          <p className="text-gray-600 mt-2">
            SMARTとOKRを活用して目標を具体化しましょう
          </p>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>SMART目標設定</CardTitle>
            <CardDescription>
              具体的で測定可能な目標を設定します
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Specific（具体的）</Label>
              <Input
                placeholder="具体的に何を達成したいですか？"
                value={specific}
                onChange={(e) => setSpecific(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Measurable（測定可能）</Label>
              <Input
                placeholder="どのように進捗を測定しますか？"
                value={measurable}
                onChange={(e) => setMeasurable(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Achievable（達成可能）</Label>
              <Input
                placeholder="現実的に達成可能ですか？"
                value={achievable}
                onChange={(e) => setAchievable(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Relevant（関連性）</Label>
              <Input
                placeholder="なぜこの目標が重要ですか？"
                value={relevant}
                onChange={(e) => setRelevant(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Time-bound（期限）</Label>
              <Input
                type="date"
                value={timeBound}
                onChange={(e) => setTimeBound(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>OKR設定</CardTitle>
            <CardDescription>目標と主要な結果を設定します</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Objective（目標）</Label>
              <Textarea
                placeholder="達成したい大きな目標は何ですか？"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Key Results（主要な結果）</Label>
              <Textarea
                placeholder="目標達成の指標となる具体的な結果を3つ記入してください"
                value={keyResults}
                onChange={(e) => setKeyResults(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={() => {
              console.log("SMART目標:", {
                specific,
                measurable,
                achievable,
                relevant,
                timeBound,
              });
              console.log("OKR:", {
                objective,
                keyResults,
              });
              router.push("/roadmap");
            }}
            className="bg-indigo-600 text-white"
          >
            次へ：ロードマップ作成
          </Button>
        </div>
      </div>
    </div>
  );
}
