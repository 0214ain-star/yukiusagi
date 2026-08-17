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

## GitHub Pages での公開方法（GitHub Actions）

このサイトは https://github.com/0214ain-star/yukiusagi にあります。`main` に push すると `.github/workflows/deploy.yml` の GitHub Actions が自動的にビルド・デプロイします。

初回のみ、リポジトリの Settings → Pages を開き、Source を **「GitHub Actions」** に変更してください（これは GitHub の画面上でしか設定できません）。設定後、Actions タブでワークフローが実行され、完了すると `https://0214ain-star.github.io/yukiusagi/` でサイトが表示されます。

以降は `git add` → `git commit` → `git push` するたびに Actions が走り、自動的にサイトへ反映されます。進行状況はリポジトリの Actions タブで確認できます。

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
