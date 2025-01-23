"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

export default function Onboarding() {
  const router = useRouter();
  const { status } = useSession();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [mainGoal, setMainGoal] = useState("");
  const [goalDetail, setGoalDetail] = useState("");
  const [weekdayHours, setWeekdayHours] = useState(0);
  const [weekendHours, setWeekendHours] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return null; // 認証状態が確認されるまで何も表示しない
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      const formData = {
        name,
        occupation,
        mainGoal,
        goalDetail,
        weekdayHours,
        weekendHours,
      };
      console.log("Onboarding form data:", formData);
      router.push("/goal-setting");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-[1200px] mx-auto space-y-8 pt-8 px-4 md:px-8 lg:px-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold">基本設定</h1>
          <p className="text-gray-600 mt-2">
            あなたの目標と学習時間を教えてください
          </p>
        </div>

        <Progress value={step * 33.33} className="max-w-md mx-auto" />

        {step === 1 && (
          <Card className="bg-white max-w-md mx-auto">
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
              <CardDescription>あなたについて教えてください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">お名前</Label>
                <Input
                  id="name"
                  placeholder="山田 太郎"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">職業</Label>
                <Input
                  id="occupation"
                  placeholder="会社員"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button variant="outline" onClick={handleBack} disabled>
                戻る
              </Button>
              <Button onClick={handleNext} className="bg-indigo-600 text-white">
                次へ
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-white max-w-md mx-auto">
            <CardHeader>
              <CardTitle>目標設定</CardTitle>
              <CardDescription>達成したい目標を教えてください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="main-goal">メイン目標</Label>
                <Input
                  id="main-goal"
                  placeholder="プログラミングスキルの向上"
                  value={mainGoal}
                  onChange={(e) => setMainGoal(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-detail">目標の詳細</Label>
                <Textarea
                  id="goal-detail"
                  placeholder="具体的にどのようなスキルを身につけたいですか？"
                  value={goalDetail}
                  onChange={(e) => setGoalDetail(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button variant="outline" onClick={handleBack}>
                戻る
              </Button>
              <Button onClick={handleNext} className="bg-indigo-600 text-white">
                次へ
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card className="bg-white max-w-md mx-auto">
            <CardHeader>
              <CardTitle>学習時間</CardTitle>
              <CardDescription>
                平日・休日の学習可能時間を教えてください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weekday-hours">平日（1日あたり）</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="weekday-hours"
                    type="number"
                    placeholder="2"
                    min="0"
                    max="24"
                    value={weekdayHours}
                    onChange={(e) => setWeekdayHours(Number(e.target.value))}
                  />
                  <span>時間</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weekend-hours">休日（1日あたり）</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="weekend-hours"
                    type="number"
                    placeholder="4"
                    min="0"
                    max="24"
                    value={weekendHours}
                    onChange={(e) => setWeekendHours(Number(e.target.value))}
                  />
                  <span>時間</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button variant="outline" onClick={handleBack}>
                戻る
              </Button>
              <Button onClick={handleNext} className="bg-indigo-600 text-white">
                設定完了
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
