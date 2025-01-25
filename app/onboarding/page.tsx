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
import { Progress } from "@/components/ui/progress";

export default function Onboarding() {
  const router = useRouter();
  const { status } = useSession();
  const [step, setStep] = useState(1);
  const [mainGoal, setMainGoal] = useState("");
  const [goalReason, setGoalReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [deadline, setDeadline] = useState("");
  const [keyResults, setKeyResults] = useState<
    { text: string; measurement: string }[]
  >([]);
  const [weekdayTimeSlots, setWeekdayTimeSlots] = useState([
    { start: "07:00", end: "08:00" },
  ]);
  const [weekendStyle, setWeekendStyle] = useState("午前のみ");
  const [maxTasks, setMaxTasks] = useState(3);
  const [skillLevel, setSkillLevel] = useState("初心者");

  const addKeyResult = () => {
    setKeyResults([...keyResults, { text: "", measurement: "" }]);
  };

  const updateKeyResult = (
    index: number,
    field: keyof (typeof keyResults)[number],
    value: string
  ) => {
    const newKeyResults = [...keyResults];
    newKeyResults[index][field] = value;
    setKeyResults(newKeyResults);
  };

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
        mainGoal,
        goalReason: goalReason === "その他" ? customReason : goalReason,
        deadline,
        keyResults,
        weekdayTimeSlots,
        weekendStyle,
        maxTasks,
        skillLevel,
      };
      console.log("Onboarding form data:", formData);
      router.push("/dashboard");
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

        <Progress value={(step / 3) * 100} className="max-w-md mx-auto" />

        {step === 1 && (
          <Card className="bg-white max-w-md mx-auto">
            <CardHeader>
              <CardTitle>目標設定 & Key Results</CardTitle>
              <CardDescription>
                あなたの目標と測定指標を設定してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="main-goal">あなたの大きな目標</Label>
                <Input
                  id="main-goal"
                  placeholder="例：プロジェクトマネジメントスキルの習得"
                  value={mainGoal}
                  onChange={(e) => setMainGoal(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>その目標を達成したい理由</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="promotion"
                      name="reason"
                      value="昇進のため"
                      onChange={(e) => setGoalReason(e.target.value)}
                    />
                    <Label htmlFor="promotion">昇進のため</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="skill-up"
                      name="reason"
                      value="スキルアップ"
                      onChange={(e) => setGoalReason(e.target.value)}
                    />
                    <Label htmlFor="skill-up">スキルアップ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="self-realization"
                      name="reason"
                      value="自己実現"
                      onChange={(e) => setGoalReason(e.target.value)}
                    />
                    <Label htmlFor="self-realization">自己実現</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="other"
                      name="reason"
                      value="その他"
                      onChange={(e) => setGoalReason(e.target.value)}
                    />
                    <Label htmlFor="other">その他</Label>
                    {goalReason === "その他" && (
                      <Input
                        className="ml-2"
                        placeholder="具体的な理由"
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">目標の達成期限</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <Label>目標達成のための具体的な指標</Label>
                <div className="space-y-4">
                  {/* レコメンド表示エリア */}
                  {mainGoal && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        以下の指標があなたの目標に適しているかもしれません
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {/* ダミーのレコメンドデータ */}
                        {[
                          {
                            text: "TOEICスコア800点以上",
                            measurement: "数値",
                          },
                          {
                            text: "プロジェクト完了率90%以上",
                            measurement: "パーセンテージ",
                          },
                          {
                            text: "PMP資格取得",
                            measurement: "達成/未達成",
                          },
                        ].map((recommendation, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setKeyResults([
                                ...keyResults,
                                {
                                  text: recommendation.text,
                                  measurement: recommendation.measurement,
                                },
                              ]);
                            }}
                          >
                            <div>
                              <p className="font-medium">
                                {recommendation.text}
                              </p>
                              <p className="text-sm text-gray-500">
                                {recommendation.measurement === "数値"
                                  ? "数値で測定"
                                  : recommendation.measurement ===
                                    "パーセンテージ"
                                  ? "達成率で測定"
                                  : "達成/未達成で判定"}
                              </p>
                            </div>
                            <span className="text-gray-400">+ 追加</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 既存の指標表示エリア */}
                  {keyResults.map((kr, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <span>指標 {index + 1}:</span>
                          <Input
                            placeholder="例：TOEICスコア800点以上"
                            value={kr.text}
                            onChange={(e) =>
                              updateKeyResult(index, "text", e.target.value)
                            }
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-10">測定:</span>
                          <select
                            className="p-2 border rounded flex-1"
                            value={kr.measurement}
                            onChange={(e) =>
                              updateKeyResult(
                                index,
                                "measurement",
                                e.target.value
                              )
                            }
                          >
                            <option value="">どのように測りますか？</option>
                            <option value="数値">
                              数値（例：スコア、金額）
                            </option>
                            <option value="パーセンテージ">達成率（%）</option>
                            <option value="達成/未達成">達成/未達成</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addKeyResult}
                  className="w-full mt-4"
                >
                  指標を追加する
                </Button>
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
              <CardTitle>学習時間</CardTitle>
              <CardDescription>
                平日・休日の学習可能時間を教えてください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-4">
                  <Label>平日の学習/作業可能時間</Label>
                  {weekdayTimeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1">
                        <Label>開始時間</Label>
                        <select
                          className="w-full p-2 border rounded"
                          value={slot.start}
                          onChange={(e) => {
                            const newSlots = [...weekdayTimeSlots];
                            newSlots[index].start = e.target.value;
                            setWeekdayTimeSlots(newSlots);
                          }}
                        >
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = (i + 7).toString().padStart(2, "0");
                            return ["00", "30"].map((minute) => (
                              <option
                                key={`${hour}:${minute}`}
                                value={`${hour}:${minute}`}
                              >
                                {hour}:{minute}
                              </option>
                            ));
                          }).flat()}
                        </select>
                      </div>
                      <div className="flex-1">
                        <Label>終了時間</Label>
                        <select
                          className="w-full p-2 border rounded"
                          value={slot.end}
                          onChange={(e) => {
                            const newSlots = [...weekdayTimeSlots];
                            newSlots[index].end = e.target.value;
                            setWeekdayTimeSlots(newSlots);
                          }}
                        >
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = (i + 7).toString().padStart(2, "0");
                            return ["00", "30"].map((minute) => (
                              <option
                                key={`${hour}:${minute}`}
                                value={`${hour}:${minute}`}
                              >
                                {hour}:{minute}
                              </option>
                            ));
                          }).flat()}
                        </select>
                      </div>
                      {index === weekdayTimeSlots.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setWeekdayTimeSlots([
                              ...weekdayTimeSlots,
                              { start: "07:00", end: "08:00" },
                            ])
                          }
                          className="self-end"
                        >
                          追加
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>休日の学習/作業スタイル</Label>
                  <div className="space-y-2">
                    {["午前のみ", "午後のみ", "終日OK", "その他"].map(
                      (style) => (
                        <div
                          key={style}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            id={style}
                            name="weekend-style"
                            value={style}
                            checked={weekendStyle === style}
                            onChange={(e) => setWeekendStyle(e.target.value)}
                          />
                          <Label htmlFor={style}>{style}</Label>
                          {style === "その他" && weekendStyle === "その他" && (
                            <Input
                              className="ml-2"
                              placeholder="具体的なスタイル"
                              value={weekendStyle}
                              onChange={(e) => setWeekendStyle(e.target.value)}
                            />
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>1日あたりの最大タスク数</Label>
                  <select
                    className="w-full p-2 border rounded"
                    value={maxTasks}
                    onChange={(e) => setMaxTasks(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} タスク
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>現在のスキルレベル</Label>
                  <div className="space-y-2">
                    {["初心者", "中級者", "上級者", "その他"].map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={level}
                          name="skill-level"
                          value={level}
                          checked={skillLevel === level}
                          onChange={(e) => setSkillLevel(e.target.value)}
                        />
                        <Label htmlFor={level}>{level}</Label>
                        {level === "その他" && skillLevel === "その他" && (
                          <Input
                            className="ml-2"
                            placeholder="具体的なレベル"
                            value={skillLevel}
                            onChange={(e) => setSkillLevel(e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
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
              <CardTitle>成功/失敗パターン & 最終確認</CardTitle>
              <CardDescription>
                過去の経験から学び、最適な計画を立てましょう
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>【過去にうまくいった成功パターン】</Label>
                <div className="space-y-2">
                  {["朝活", "週1回の振り返り", "目標を可視化"].map(
                    (pattern) => (
                      <div
                        key={pattern}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`success-${pattern}`}
                          className="w-4 h-4"
                        />
                        <Label htmlFor={`success-${pattern}`}>{pattern}</Label>
                      </div>
                    )
                  )}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="success-other"
                      className="w-4 h-4"
                    />
                    <Label htmlFor="success-other">その他：</Label>
                    <Input placeholder="具体的なパターン" className="flex-1" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>【よくある失敗パターン】</Label>
                <div className="space-y-2">
                  {[
                    "忙しくてやらなくなる",
                    "1日に詰め込みすぎる",
                    "タスクが多すぎて混乱",
                  ].map((pattern) => (
                    <div key={pattern} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`failure-${pattern}`}
                        className="w-4 h-4"
                      />
                      <Label htmlFor={`failure-${pattern}`}>{pattern}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="failure-other"
                      className="w-4 h-4"
                    />
                    <Label htmlFor="failure-other">その他：</Label>
                    <Input placeholder="具体的なパターン" className="flex-1" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>【タスクの優先度の付け方】</Label>
                <div className="space-y-2">
                  {[
                    "効果が大きいタスク優先",
                    "納期が近いタスク優先",
                    "短時間で終わるタスク優先",
                  ].map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`priority-${priority}`}
                        name="priority"
                        value={priority}
                        className="w-4 h-4"
                      />
                      <Label htmlFor={`priority-${priority}`}>{priority}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="priority-other"
                      name="priority"
                      className="w-4 h-4"
                    />
                    <Label htmlFor="priority-other">その他：</Label>
                    <Input
                      placeholder="具体的な優先度の付け方"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>【その他の制約・メモ】</Label>
                <textarea
                  className="w-full p-2 border rounded min-h-[100px]"
                  placeholder="自由に記入してください"
                />
              </div>

              <div className="space-y-2">
                <Label>【入力内容のプレビュー】</Label>
                <div className="p-4 border rounded bg-gray-50">
                  <p className="text-sm text-gray-600">
                    (ここにStep1 & Step2の内容が表示される)
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button variant="outline" onClick={handleBack}>
                戻る
              </Button>
              <Button onClick={handleNext} className="bg-indigo-600 text-white">
                登録 / 確定
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
