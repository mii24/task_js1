
//使用する変数を宣言
let startButton;    // startボタン
let stopButton;     // stopボタン
let resetButton;    // resetボタン
let showTime;       // 表示時間

let timer;              // setinterval, clearTimeoutで使用
let startTime;          // 開始時間
let elapsedTime = 0;    // 経過時間
let holdTime = 0;       // 一時停止用に時間を保持


//ページ読み込み後、変数にHTML要素を設定。ボタンや計測時間の表示のidを指定して各変数にHTML要素を設定
window.onload = function () {
    startButton = document.getElementById("start");
    stopButton = document.getElementById("stop");
    resetButton = document.getElementById("reset");
    showTime = document.getElementById("time");
}

// スタートボタン押下時
function start() {
    // 開始時間を現在の時刻に設定
    startTime = Date.now();

    // 時間計測
    measureTime();

    //最後にスタートボタンを無効、ストップ、リセットボタンを有効にする
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
}

// ストップボタン押下時
function stop() {
    // タイマー停止
    clearInterval(timer);

    // 停止時間を保持。（一度ストップを押下して再度スタートボタンを押下した際、続きから時間を計測するため）
    holdTime += Date.now() - startTime;

    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
}

// リセットボタン押下時
function reset() {
    // タイマー停止
    clearInterval(timer);

    // 変数、表示を初期化    
    elapsedTime = 0;
    holdTime = 0;
    showTime.textContent = "0:0:0:0";


    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
}

// 1時間 = 3600秒 = 3600 * 1000ミリ秒
const ONE_HOUR_IN_MS = 3600000;
const ONE_MINUTE_IN_MS = 60000;
const ONE_SECOND_IN_MS = 1000;

function measureTime() {
  // タイマーを設定
  timer = setTimeout(function () {
    // 経過時間を設定し、画面へ表示（[現在の時刻] – [開始時間] + [保持している時間]）
    elapsedTime = Date.now() - startTime + holdTime;

    let hours = Math.floor(elapsedTime / ONE_HOUR_IN_MS);

    let minutes = Math.floor((elapsedTime % ONE_HOUR_IN_MS) / ONE_MINUTE_IN_MS);

    let seconds = Math.floor((elapsedTime % ONE_MINUTE_IN_MS) / ONE_SECOND_IN_MS);

    let milliseconds = Math.floor((elapsedTime % ONE_SECOND_IN_MS) / 100); // ミリ秒を1桁にする
    showTime.textContent = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;

    // 関数を呼び出し、時間計測を継続する
    measureTime();
  }, 10);
}
