import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-[1200px] mx-auto space-y-8 pt-8 px-4 md:px-8 lg:px-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold">ダッシュボード</h1>
          <p className="text-gray-600 mt-2">学習の進捗状況を確認しましょう</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>目標達成度</CardTitle>
              <CardDescription>現在の進捗状況</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>全体の進捗</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>今月の目標</span>
                    <span>70%</span>
                  </div>
                  <Progress value={70} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>学習時間</CardTitle>
              <CardDescription>今週の学習実績</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2">
                  {["月", "火", "水", "木", "金", "土", "日"].map((day, i) => (
                    <div key={i} className="text-center">
                      <div className="text-sm text-gray-500">{day}</div>
                      <div className="h-20 bg-secondary rounded-md flex items-end">
                        <div
                          className="w-full bg-indigo-600 rounded-md"
                          style={{ height: `${Math.random() * 100}%` }}
                        />
                      </div>
                      <div className="text-sm mt-1">2h</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
