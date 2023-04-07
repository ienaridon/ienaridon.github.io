// =================================================================
// 関数定義
// =================================================================

// -----------------------------------------------------------------
// 与えられた行と行番号に基づいて、状態を切り替えるためのdiv要素を作成する
// -----------------------------------------------------------------
function createLineDiv(line, index) {
  // div要素を作成し、lineクラスを付与する
  let div = document.createElement("div");
  div.classList.add("line");

  // ステータスラベルを作成し、status-labelクラスを付与し、初期値を"作業前"に設定する
  let statusLabel = document.createElement("div");
  statusLabel.classList.add("status-label");
  statusLabel.textContent = "作業前";
  div.appendChild(statusLabel);

  // 行番号を表すline-numberクラスのdiv要素を作成し、index+1をテキストとして設定する
  let lineNumber = document.createElement("div");
  lineNumber.classList.add("line-number");
  lineNumber.textContent = index + 1;
  div.appendChild(lineNumber);

  // ボーダーラインを表すborder-lineクラスのdiv要素を作成し、追加する
  let borderLine = document.createElement("div");
  borderLine.classList.add("border-line");
  div.appendChild(borderLine);

  // テキストコンテンツを表すline-textクラスのdiv要素を作成し、lineをテキストとして設定する
  let textContent = document.createElement("div");
  textContent.classList.add("line-text");
  textContent.textContent = line;
  div.appendChild(textContent);

  // data-index属性にindexを設定することで、その要素が何行目なのかを識別できるようにする
  div.setAttribute("data-index", index);

  // 行をクリックしたときに状態を切り替えるためのイベントリスナーを追加する
  div.addEventListener("click", function() {
    toggleStatus(textContent, statusLabel, index);
  });

  return div;
}

// -----------------------------------------------------------------
// 行の状態を切り替えるための関数
// -----------------------------------------------------------------
function toggleStatus(textContent, statusLabel, currentIndex) {
  // 前の行が確認済みかどうかをチェックする（ただし最初の行は除く）
  if (currentIndex > 0 && !lineContainer.children[currentIndex - 1].querySelector(".line-text").classList.contains("checked")) {
    // 前の行が確認済みでない場合は、アラートを表示して関数を終了する
    alert("前の手順が確認済になっていません。");
    return;
  }

  // 行の状態に応じて、ステータスラベルのテキストとテキストコンテンツのスタイルを変更する
  if (textContent.classList.contains("working")) {
    textContent.classList.remove("working");
    textContent.classList.add("checked");
    statusLabel.textContent = "確認済";
  } else if (textContent.classList.contains("checked")) {
    textContent.classList.remove("checked");
    statusLabel.textContent = "作業前";
  } else {
    textContent.classList.add("working");
    statusLabel.textContent = "作業中";
  }
}

// -----------------------------------------------------------------
// ファイルを読み込んで、行ごとにdiv要素を作成し、それらを表示するための関数
// -----------------------------------------------------------------
function loadFile(file) {
  // FileReaderオブジェクトを作成する
  let reader = new FileReader();

  // ファイルが読み込まれたときの処理を定義する
  reader.onload = function() {
    // 読み込んだファイルの内容を改行で分割する
    let lines = reader.result.split("\n");
    lineContainer.innerHTML = "";

    // 各行について、div要素を作成し、lineContainerに追加する
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      // 行が空行だった場合は、全角スペースを表示する
      if (line === "") {
        line = "　";
      }

      let div = createLineDiv(line, i);
      lineContainer.appendChild(div);
    }
  }

  // ファイルをテキスト形式で読み込む
  reader.readAsText(file);
}

// =================================================================
// ここからスタート
// =================================================================

// HTMLからfile-input要素を取得する
let fileInput = document.getElementById("file-input");

// HTMLからline-containerクラスを持つ要素を取得する
let lineContainer = document.querySelector(".line-container");

// file-input要素のchangeイベントリスナーを追加する
fileInput.addEventListener("change", function(e) {
  // 選択されたファイルを取得する
  let file = e.target.files[0];

  // 選択されたファイルをloadFile関数で読み込む
  loadFile(file);
});

/*
関数の相関図は以下のようになります。
loadFile()
↑
createLineDiv()
↑
toggleStatus()
*/