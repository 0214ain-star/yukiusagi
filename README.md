# Sheryl's Page

GitHub Pages で公開する個人サイトです。ビルド不要のシンプルな HTML/CSS/JS 構成です。

## ファイル構成

```
index.html      トップページ
profile.html    プロフィールページ（各セクションは空の状態です）
diary.html      合言葉で保護された限定ページ
css/style.css   スタイル
js/auth.js      合言葉ゲートの処理
```

## GitHub Pages での公開方法

1. GitHub で `username.github.io` という名前のリポジトリを作成する（`username` は自分の GitHub ユーザー名）。
2. このフォルダの中身をそのリポジトリに push する。
3. リポジトリの Settings → Pages で、Source を `main` ブランチ / `root` に設定する（`username.github.io` リポジトリの場合は通常これだけで自動的に公開されます）。
4. 数分後に `https://username.github.io/` でサイトが表示されます。

## 合言葉（パスワード）の仕組みと変更方法

`diary.html` は合言葉を入力しないと本文が見られないようになっています。ただし GitHub Pages は静的サイトのため、サーバー側での認証はできません。ページの JavaScript を見れば仕組みが分かるレベルの**簡易的なゲート**であり、本格的なセキュリティ対策ではない点にご注意ください（本当に見られたくない情報は載せないでください）。

現在の仮の合言葉は `sakura` です。変更する場合は次の手順で行います。

1. 新しい合言葉の SHA-256 ハッシュ値を作る。ブラウザの開発者ツールのコンソール（F12）で以下を実行し、表示された文字列をコピーする。

   ```js
   crypto.subtle.digest("SHA-256", new TextEncoder().encode("新しい合言葉"))
     .then(buf => console.log(Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("")));
   ```

2. `diary.html` の一番下にある `<script src="js/auth.js" data-hash="...">` の `data-hash` の値を、コピーした文字列に置き換える。

同じ仕組みを他のページにも追加したい場合は、`diary.html` の `#gate` と `#content` の構造をコピーし、`js/auth.js` を読み込んで `data-hash` に対応するハッシュ値を指定してください。
