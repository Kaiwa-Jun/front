import { useEffect, useState } from "react";

const TestPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/test")
      .then((response) => {
        if (!response.ok) {
          throw new Error("ネットワークエラー");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>エラー: {error}</div>;
  }

  if (!data) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h1>テストデータ</h1>
      <p>メッセージ: {data.message}</p>
      <p>タイムスタンプ: {data.timestamp}</p>
    </div>
  );
};

export default TestPage;
