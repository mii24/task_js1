
//使用する変数を宣言
var startButton;    // startボタン
var stopButton;     // stopボタン
var resetButton;    // resetボタン
var showTime;       // 表示時間

var timer;              // setinterval, clearTimeoutで使用
var startTime;          // 開始時間
var elapsedTime = 0;    // 経過時間
var holdTime = 0;       // 一時停止用に時間を保持


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

// 時間を計測（再帰関数）
function measureTime() {
  // タイマーを設定
    timer = setTimeout(function () {
        // 経過時間を設定し、画面へ表示（[現在の時刻] – [開始時間] + [保持している時間]）
        elapsedTime = Date.now() - startTime + holdTime;

        //1時間 = 3600秒 = 3600 * 1000ミリ秒
        var hours = Math.floor(elapsedTime / 3600000);

        //経過時間を3600000で割った余りを計算。これにより、1時間未満の経過時間が得られる
        //その結果を60000（1分 = 60秒 = 60 * 1000ミリ秒）で割ることで、経過時間を分単位に変換
        //Math.floorを使って小数点以下を切り捨て、整数部分だけを取得
        var minutes = Math.floor((elapsedTime % 3600000) / 60000);

        //経過時間を60000で割った余りを計算。これにより、1分未満の経過時間が得られる
        // その結果を1000（1秒 = 1000ミリ秒）で割ることで、経過時間をる秒単位に変換
        // Math.floorを使って小数点以下を切り捨て、整数部分だけを取得
        var seconds = Math.floor((elapsedTime % 60000) / 1000);

        //経過時間を1000で割った余りを計算します。これにより、1秒未満の経過時間が得られる
        // その結果を100で割ることで、ミリ秒を1桁に変換
        // （例えば、123ミリ秒なら1.23となり、Math.floorで1）
        // Math.floorを使って小数点以下を切り捨て、整数部分だけを取得
        var milliseconds = Math.floor((elapsedTime % 1000) / 100); // ミリ秒を1桁にする
        showTime.textContent = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;

      // 関数を呼び出し、時間計測を継続する
        measureTime();
    }, 10);
}