/* Gallery のシリーズ名と「動き」の説明。色や duration のトークン値は書かない。 */
(function (root) {
  root.ANDM_SERIES_COPY = {
    order: [
      "baseline",
      "soft",
      "dense",
      "technical",
      "editorial",
      "playful",
      "expressive",
      "dads",
      "apple",
      "spectrum",
      "fluent",
      "carbon",
    ],
    labels: {
      baseline: "Baseline",
      soft: "Soft",
      dense: "Dense",
      technical: "Technical",
      editorial: "Editorial",
      playful: "Playful",
      expressive: "M3 Expressive",
      dads: "DADS",
      apple: "Apple",
      spectrum: "Spectrum",
      fluent: "Fluent 2",
      carbon: "Carbon",
    },
    briefs: {
      baseline: {
        trait: "角も余白も中くらいで、色は強く出しません。",
        use: "どの画面にも置きやすい、中立な出発点です。",
        motion: "ホバーは色（100ms）。押すと縮みます（50ms）。角は変えません。",
      },
      soft: {
        trait: "角は大きめ、余白はゆったり、影は薄いです。",
        use: "設定や案内など、落ち着いた画面に向きます。",
        motion: "ホバーは色（100ms）。押すと少し縮みます。専用の速度はありません。",
      },
      dense: {
        trait: "高さを抑え、余白と文字を詰めます。",
        use: "表やツールバーなど、情報の多い画面に向きます。",
        motion: "ホバーは色（100ms）。押すと少し縮みます。専用の速度はありません。",
      },
      technical: {
        trait: "角はほぼ直角で、等幅、影はありません。",
        use: "開発ツールやログなど、境界をはっきりさせたい画面に向きます。",
        motion: "ホバーは色（100ms）。押しても縮みません。専用の速度はありません。",
      },
      editorial: {
        trait: "角はなく、セリフ体で、字間を少し開けます。",
        use: "記事や読み物の末尾に向きます。",
        motion: "ホバーは色（100ms）。押しても縮みません。専用の速度はありません。",
      },
      playful: {
        trait: "丸く、ティールで、押したときの縮みが少し大きいです。",
        use: "はじめての操作や、気軽な招待に向きます。",
        motion: "速度は共有のままです。ホバーは色、押すと Baseline より大きく縮みます。角は変えません。",
      },
      expressive: {
        trait: "ラベル付きは横長の pill です。押すと角が立ち、大きさでも強調します。",
        use: "印象を残したい、利用者向けの画面に向きます。",
        motion: "ホバーは色だけです（150ms）。横長の pill のまま、押すと角が変わります（350ms）。縮みません。",
      },
      dads: {
        trait: "濃い青、控えめな角、太めの字です。",
        use: "行政や公共の手続きで、迷わず押してほしい画面に向きます。",
        motion: "出典に duration がないので、速度は差し替えません。ホバーは色、押しても縮みません。",
      },
      apple: {
        trait: "システムフォントだけです。色や寸法は公式の値を入れていません。",
        use: "案内や設定など、Apple の画面に近づけたいときに向きます。",
        motion: "公式の duration は指定されていません。ホバーは色、押すと縮みます。速度は共有トークンのままです。",
      },
      spectrum: {
        trait: "青の塗り、角は高さの半分、境界は 2px です。",
        use: "業務画面に向きます。境界ははっきりさせ、余白は詰めすぎません。",
        motion: "ホバーと押下は色です（130ms、ease-out）。縮みと角の変化はありません。",
      },
      fluent: {
        trait: "ボタンの角は 4px、大きいボタンは 8px です。",
        use: "いつもの操作で、作業に集中する画面に向きます。",
        motion: "出典に duration がないので、速度は差し替えません。ホバーは色、押すと共有の縮みです。角は変えません。",
      },
      carbon: {
        trait: "角は直角で、主操作は青です。高さは 32、40、48px です。",
        use: "製品の画面で、主操作を青で示したいときに向きます。",
        motion: "ホバーと押下は色です（70ms、entrance の easing）。縮みと角の変化はありません。",
      },
    },
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
