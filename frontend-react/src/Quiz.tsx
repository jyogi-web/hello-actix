import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ScoreBoardItem from './ScoreBoardItem'
interface Props {}

interface ScoreData {
  username: string;
  score: number;
}

const Quiz: React.FC<Props> = (props) => {
  const [scoreData, setScoreData] = useState<ScoreData[]>([]);

  useEffect(() => {
    const sampleData: ScoreData[] = [
      {
        "username": "nissie",
        "score": 20
      },
      {
        "username": "nissie",
        "score": 20
      },
      {
        "username": "nissie",
        "score": 20
      },
    ]
    setScoreData(sampleData);
  }, []);

  return (
    <div className="quiz">
      {/* メインコンテンツ */}
      <div className="main grid grid-cols-3 pt-20 h-full">
        {/* スコアボード */}
        <div className="scoreboard grid grid-rows">
          <div className="scoreboard-title flex justify-center items-center border-4 border-sky-200 p-1 mx-20 rounded-t-lg">スコアボード</div>
          <div className="scoreboard-content">
            <div  className="scoreboard-list">
              { scoreData && scoreData.map((item: ScoreData) => <ScoreBoardItem username={item.username} score={item.score} />)}
            </div>
          </div>
          <div className="scoreboard-title flex justify-center items-center border-4 border-sky-200 p-1 mx-20 rounded-b-lg">　</div>
        </div>
        {/* モニター */}
        <div className="monitor border-2 border-black flex justify-center items-center text-center rounded-lg">
          <div className="monitor-start">
            <div className="monitor-text">メンバーは揃いましたか？</div>
            <button className="start-button border-2 border-black rounded mt-10 px-10 py-2">開始する</button>
          </div>
        </div>
        {/* 進行状況 */}
        <div className="proggress">
          {/* 解答 */}
          <div className="user-answer grid grid-rows-1 flex justify-center items-center text-center border-4 border-sky-200 p-1 mx-20 rounded-t-lg">
            <div className="user-answer-key">解答</div>
            <div className="user-answer-value">ー</div>
          </div>
          {/* 答え */}
          <div className="currect-answer user-answer grid grid-rows-1 flex justify-center items-center text-center border-4 border-sky-200 p-1 my-1 mx-20">
            <div className="currect-answer-key">答え</div>
            <div className="currect-answer-value">ー</div>
          </div>
          {/* 結果 */}
          <div className="result user-answer grid grid-rows-1 flex justify-center items-center text-center border-4 border-sky-200 p-1 mx-20 rounded-b-lg">
            <div className="result-key">結果</div>
            <div className="result-value">ー</div>
          </div>
        </div>
      </div>
      {/* 早押しボタン */}
      <div className="fast-press flex items-center justify-center">
        {/* ボタン */}
        <button className="fast-press-button border-2 border-rose-700 py-5 px-10 rounded-lg bg-red-600 text-white font-bold text-lg mt-20">早押しボタン</button>
      </div>
      {/* 解答フォーム */}
      <form className="answer-form flex items-center justify-center mt-20">
        {/* 入力フォーム */}
        <label htmlFor="answer" className="sr-only">解答</label>
        <input type="text" name="answer" id="answer" className="" />
        {/* 送信ボタン */}
        <button className="answer-submit-button rounded-lg border-2 border-sky-700 p-2 bg-sky-500 text-white">送信</button>
      </form>
    </div>
  );
};

export default Quiz;
