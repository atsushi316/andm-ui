/* Human-facing usage notes. They never remap product tokens. */
(function(){
 const sources={
   structure:['W3C · 情報と関係性','https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html'],
   labels:['W3C · ラベルと説明','https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html'],
   button:['USWDS · Button','https://designsystem.digital.gov/components/button/'],
   input:['USWDS · Text input','https://designsystem.digital.gov/components/text-input/'],
   checkbox:['USWDS · Checkbox','https://designsystem.digital.gov/components/checkbox/'],
   radio:['USWDS · Radio buttons','https://designsystem.digital.gov/components/radio-buttons/'],
   select:['USWDS · Select','https://designsystem.digital.gov/components/select/'],
   switch:['W3C APG · Switch','https://www.w3.org/WAI/ARIA/apg/patterns/switch/'],
   slider:['W3C APG · Slider','https://www.w3.org/WAI/ARIA/apg/patterns/slider/'],
   card:['USWDS · Card','https://designsystem.digital.gov/components/card/'],
   notification:['Carbon · Notification','https://www.carbondesignsystem.com/building-blocks/core/components/notification/guidelines'],
   dialog:['W3C APG · Modal dialog','https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/'],
   tabs:['W3C APG · Tabs','https://www.w3.org/WAI/ARIA/apg/patterns/tabs/'],
   tooltip:['W3C APG · Tooltip（検討中のパターン）','https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/'],
   breadcrumb:['USWDS · Breadcrumb','https://designsystem.digital.gov/components/breadcrumb/'],
   pagination:['USWDS · Pagination','https://designsystem.digital.gov/components/pagination/'],
   navigation:['W3C APG · Disclosure navigation','https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/'],
   table:['USWDS · Table','https://designsystem.digital.gov/components/table/'],
   accordion:['USWDS · Accordion','https://designsystem.digital.gov/components/accordion/'],
   search:['USWDS · Search','https://designsystem.digital.gov/components/search/'],
   header:['USWDS · Header','https://designsystem.digital.gov/components/header/'],
   side:['USWDS · Side navigation','https://designsystem.digital.gov/components/side-navigation/'],
   bottom:['Android Developers · Navigation bar','https://developer.android.com/develop/ui/compose/components/navigation-bar'],
   toolbar:['W3C APG · Toolbar','https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/'],
   combo:['W3C APG · Combobox','https://www.w3.org/WAI/ARIA/apg/patterns/combobox/'],
   listbox:['W3C APG · Listbox','https://www.w3.org/WAI/ARIA/apg/patterns/listbox/'],
   date:['USWDS · Date picker','https://designsystem.digital.gov/components/date-picker/'],
   range:['USWDS · Date range picker','https://designsystem.digital.gov/components/date-range-picker/'],
   file:['USWDS · File input','https://designsystem.digital.gov/components/file-input/'],
   step:['USWDS · Step indicator','https://designsystem.digital.gov/components/step-indicator/'],
   validation:['USWDS · Validation','https://designsystem.digital.gov/components/validation/'],
   tree:['W3C APG · Tree view','https://www.w3.org/WAI/ARIA/apg/patterns/treeview/'],
   carousel:['W3C APG · Carousel','https://www.w3.org/WAI/ARIA/apg/patterns/carousel/'],
   meter:['W3C APG · Meter','https://www.w3.org/WAI/ARIA/apg/patterns/meter/'],
   count:['USWDS · Character count','https://designsystem.digital.gov/components/character-count/'],
   affix:['USWDS · Input prefix/suffix','https://designsystem.digital.gov/components/input-prefix-suffix/'],
   mask:['USWDS · Input mask','https://designsystem.digital.gov/components/input-mask/']
 };
 // Purpose and alternatives are andm's application of the cited guidance,
 // not a statement that every Series officially supplies this component.
 const rows=`
text|説明や読み物に、見出しと本文の役割を与えたいとき。|見た目の大きさだけで見出しの意味を決めず、文章の構造を先に整理する。|structure
icon|操作や状態を短い記号で補助したいとき。|意味が曖昧な記号は文字ラベルを添え、記号だけで重要情報を伝えない。|labels
icon-button|閉じる・検索など、馴染みのある操作を小さく置くとき。|初めての利用者に意味が伝わらない操作には文字付きButtonを使う。|button,labels
link|別のページや資料へ移動するとき。|保存・削除など現在の画面で処理する操作にはButtonを使う。|button
label|入力欄や選択肢が何を求めているか、常に示したいとき。|入力すると消えるプレースホルダーだけで項目名を伝えない。|labels
helper-text|入力の形式や条件を、操作前に補足したいとき。|長い説明は関連資料へ分け、必要な条件は欄の近くに残す。|labels
error-text|不正な入力の場所と、修正方法を伝えるとき。|入力前からエラーにせず、色だけに頼らず具体的な内容を示す。|validation,input
required-marker|必須と任意の項目を区別するとき。|記号だけで必須を伝えず、記号の意味や「必須」を明記する。|labels
status|進行中・完了など、現在の状態を文字で示したいとき。|即座に対処が必要な問題はAlertなどで場所と対応を明確にする。|notification
code|再利用するコードや技術的な文字列を示すとき。|長い説明文をコード表示へ入れず、本文と分ける。|structure
kbd|キーボード操作やショートカットを案内するとき。|キー操作だけを唯一の操作経路にしない。|structure
image|内容の理解や対象の識別に画像が役立つとき。|重要な意味を画像だけにせず、役割に応じて代替テキストを付ける。|structure
file-input|端末内のファイルを選んでもらうとき。|ドラッグ操作だけにせず、選択ボタンと形式・容量の説明を用意する。|file
native-input|日付・数値などブラウザ標準の入力を活用するとき。|対象端末での入力方法を確認し、独自入力へ置き換える必要があるか検討する。|input
button|保存・送信など、処理を実行したいとき。|移動にはLinkを使い、主操作を増やしすぎない。|button
text-field|名前や文章など、決まった候補から選べない内容を入力するとき。|決まった選択肢には選択UIを使い、長文には複数行の欄を用意する。|input
checkbox|複数項目の選択や、独立した同意を求めるとき。|一つだけ選ぶ項目にはRadio、即時反映のオン・オフにはSwitchを検討する。|checkbox,radio,switch
radio|複数の候補から、一つだけ選んでもらうとき。|複数選択にはCheckbox、多い候補にはSelectやComboboxを検討する。|radio,select
switch|設定のオン・オフを切り替えるとき。|複数の選択肢の比較にはRadio、同意の確認にはCheckboxを使う。|switch
select|候補の一覧から一つを、省スペースで選ぶとき。|少数候補を比較してほしいならRadio、検索が必要ならComboboxを検討する。|select,combo
slider|音量など、連続した値を直感的に調整するとき。|正確な数値が重要なら数値入力も用意する。|slider
segmented|同じ領域の表示や、一つの選択を少数候補で切り替えるとき。|別々の内容パネルならTabs、多い候補ならSelectを検討する。|radio,tabs
chip|絞り込み条件や、小さな選択状態を並べるとき。|主操作を任せず、選択・解除の意味をラベルと状態で伝える。|checkbox,button
fab|画面の中心的な作成操作を強調するandmの構成例。|操作が複数あるときや、内容を覆うときは通常のButtonを検討する。|button
divider|情報群の境界を補助したいとき。|線を増やす前に、見出し・余白・意味の構造で分けられるか確認する。|structure
badge|件数や短い状態を、対象の近くに添えるとき。|文章での説明が必要な重要通知はAlertを使う。|notification
card|一つの対象の概要と、詳細への入口をまとめるとき。|多くの属性を横並びで比較するならTable、簡潔な項目はListを検討する。|card,table
alert|エラーや完了など、作業に関わる重要な状態を伝えるとき。|すべての変更を通知せず、必要な場所と強さで伝える。|notification
toast|操作結果など、短い補助的な通知を一時表示するとき。|読み逃しが問題になる情報や、必須の対応を一時表示だけにしない。|notification
progress|処理がどこまで進んだかを示すとき。|残量が不明なら正確な進捗率を装わず、進行中の説明を用意する。|notification
spinner|短い待ち時間に、処理中であることを示すとき。|長い待ち時間には状況や中断・再試行の手段も示す。|notification
skeleton|読み込み中の領域の位置や構造を予告するandmの見本。|完了や失敗を表すUIと混同せず、処理状況も文字で伝える。|notification
avatar|投稿者や担当者など、人物を識別する補助が必要なとき。|画像だけで人物を特定させず、必要に応じて名前を添える。|structure
list|同じ種類の項目を、順序やまとまりで読み進めるとき。|複数の属性の比較にはTable、概要と画像をまとめるならCardを検討する。|structure,table,card
table|行と列の関係から、複数対象の値を比較するとき。|文章の配置のために表を使わず、スマホでは局所スクロールを検討する。|table
accordion|必要な説明だけ開いて読みたいとき。|ほぼ全員が読む短い情報や、同時比較が必要な情報を隠さない。|accordion
tabs|同じ画面の関連する内容を、一つずつ表示するとき。|手続きの順序にはStepper、別ページの移動にはNavigationを使う。|tabs
breadcrumb|階層のあるサイトで、現在地と上位の位置を示すとき。|操作履歴や手続きの進捗とは区別する。|breadcrumb
pagination|多い検索結果や一覧を、ページに分けて移動するとき。|少数の項目まで分割せず、件数や現在の位置を示す。|pagination
menu|限られた補助的な移動先を、必要なときに開くとき。|主要な行き先をすべて隠さず、サイトの移動とアプリのコマンドを区別する。|navigation
header-nav|サイトの識別と主要な行き先を、画面上部でまとめるとき。|横に収まらない項目を無理に詰めず、狭幅のメニューを検討する。|header,navigation
side-nav|セクション内の階層や、下位のページへ繰り返し移動するとき。|少数ページに深い階層を作らず、上部ナビとの重複を減らす。|side
mobile-nav|狭い画面で、主要な移動先を開閉して見せるとき。|必要な行き先と現在地を分かりやすくし、開閉操作にも名前を付ける。|header,navigation
bottom-nav|スマホなど狭い画面で、同じ重要度の主要な行き先を切り替えるとき。|深い階層や一時的な操作を混ぜない。Materialでは3〜5の行き先を想定。DADSの注意は見本に別記。|bottom
footer|本文を読み終えたあと、補助的なページや情報を探すとき。|重要な操作をフッターだけに置かず、本文の近くにも示す。|header,structure
in-page-nav|長いページ内の見出しへ、直接移動したいとき。|別ページへの移動と混同しないラベルや現在地を用意する。|structure,navigation
mega-menu|多数の行き先を、カテゴリごとにまとめて見せるとき。|少数候補なら単純なNavigationにし、開閉とフォーカスの経路を明確にする。|header,navigation
language-selector|同じ内容を別言語でも提供し、利用者に選んでもらうとき。|国旗だけで言語を表さず、言語名で選べるようにする。|labels,navigation
form-field|ラベル・入力・補足・エラーを一つの項目として組むとき。|補足やエラーを別の項目の近くへ置かず、入力との関係を保つ。|labels,input,validation
search-form|目的の項目を、検索語から探したいとき。|少量の内容ならNavigationでも足りるか確認し、検索後も検索語を残す。|search
filter-bar|一覧の対象を、条件で絞り込みたいとき。|条件が不要な短い一覧に複雑なフィルターを増やさない。|checkbox,select,search
results-header|検索結果の件数と並び方を、一覧の前で示すとき。|検索条件の操作と混ぜすぎず、結果が変わったことを知らせる。|search,structure
form-actions|入力後の保存・取消を、まとまりとして配置するとき。|主操作を複数強調せず、取消と破壊的操作を区別する。|button
resource-item|対象の概要を、一覧の一行と関連操作で示すとき。|多くの属性の比較はTable、独立した概要ならCardを検討する。|card,table
empty-state|結果がない理由と、次にできることを案内するandmの構成例。|初回・条件不一致・障害を同じ空表示にせず、状況を文字で伝える。|notification,search
loading-state|読み込み中の領域と状況をまとめて示すとき。|空状態や失敗状態と分け、必要なら中断や再試行を用意する。|notification
combobox|多い候補を入力で探し、一つを選ぶとき。|少数候補ならRadioやSelectを使い、候補と自由入力の契約を明確にする。|combo
multi-select|検索しながら複数の候補を選ぶとき。|少数の候補ならCheckboxで一覧を見せ、解除の方法も用意する。|combo,listbox,checkbox
removable-tag|選んだ条件や項目を、個別に解除したいとき。|表示だけのラベルと区別し、何を解除するか操作名で伝える。|button,checkbox
calendar|予定の日付を、曜日や周辺の日付と比べて選ぶとき。|誕生日など覚えている日付には直接入力を検討する。|date
 date-range|開始日と終了日を、期間として選ぶとき。|範囲の制約や順序を明示し、単一の日付選択と区別する。|range
 date-entry|誕生日など、知っている年月日を直接入力するとき。|カレンダーの前後関係が役立つ予定日にはDate pickerを検討する。|date,input
range-slider|下限と上限を、連続する範囲として調整するとき。|正確な境界値が重要なら数値入力も併用する。|slider
input-affix|金額の通貨や単位など、入力内容の意味を添えるとき。|装飾だけの記号を増やさず、ラベルでも項目の意味を伝える。|affix,labels
character-count|入力文字数に上限があり、残量を知りたいとき。|制限のない欄に不要なカウンターを置かない。|count
input-mask|入力の形式を補助し、整った表示にする必要があるとき。|貼り付けや自由な入力を妨げないか確認し、形式を説明する。|mask,labels
error-summary|複数の入力エラーを、送信後にまとめて示すとき。|各入力欄のエラーも残し、一覧から該当項目へ移れるようにする。|validation
 tree|フォルダーなどの階層を、展開しながら選ぶとき。|単純なサイト移動ならSide navigationを使い、Tree固有のキー操作を用意する。|tree,side
 table-tree|階層のある対象を、複数の列と一緒に比較するとき。|階層だけならTree、階層のない値の比較ならTableにする。|tree,table
 upload|複数ファイルの選択と、転送の状況・失敗を管理するとき。|ドロップだけにせず、選択ボタンと対象ごとの状態を用意する。|file,notification
 stepper|複数画面の手続きで、現在の段階を知らせるとき。|単なる選択肢の切替に使わず、内容の説明を進捗表示だけへ依存させない。|step
 description-list|名前と値、用語と説明を対応させたいとき。|複数対象の列比較ならTable、順序のある項目ならListを使う。|structure,table
 quote|他者の発言や引用を、本文と区別して示すとき。|装飾だけで出典や引用の範囲を曖昧にしない。|structure
 annotation|本文に関連する補足を、近くで示したいとき。|必須の情報を見落としやすい補足へ移さない。|structure,labels
 banner|ページやサービス全体に関係する重要情報を示すとき。|通常の操作結果は局所の通知にし、常設の強い表示を増やさない。|notification
 carousel|関連する複数の内容を、限られた領域で切り替えて見せるとき。|重要な内容を自動で流すだけにせず、停止と移動の操作を用意する。|carousel
 avatar-group|複数の担当者や参加者を、まとまりとして示すandmの構成例。|個人の識別が重要なら名前の一覧も用意する。|structure
 info-label|短いラベルの補足を、必要なときに開いて見せるとき。|入力に必須の条件や、重要な注意を補足だけに隠さない。|labels,dialog
 rating|段階のある評価を選んでもらうandmの構成例。|尺度の意味を説明し、精密な数値入力や単なるオン・オフと区別する。|radio,labels
 inline-edit|表示中の値を、同じ位置で編集・保存するとき。|大きな入力や複雑な検証には専用フォームを検討し、取消を用意する。|input,button
 comment|対象に対する発言と返信を、流れとして読むとき。|投稿者・本文・操作を分け、公開範囲や実際の送信を明確にする。|structure,input
 spotlight|初回などに、特定の操作や場所を案内するandmの構成例。|通常の操作を妨げず、閉じる・後で見る経路を用意する。|dialog,labels
 layout|複数の領域の役割を、配置で分けたいとき。|見た目の配置だけで意味を作らず、読む順序と狭幅の流れも保つ。|structure
 meter|容量など、既知の範囲に対する現在値を示すとき。|処理の完了割合にはProgressを使い、値の意味も文字で示す。|meter
 color-picker|色を選択し、値や見た目を調整するとき。|色だけを情報の唯一の区別にせず、文字の値も確認できるようにする。|slider,input
 toolbar|同じ対象に対する関連操作を、まとまりで提示するとき。|通常のボタン群とARIA toolbarを区別し、採用するキー操作を合わせる。|toolbar
 action-menu|複製や削除など、対象の補助操作を必要なときに開くとき。|主操作は見える位置に残し、移動用のNavigationと区別する。|button,navigation
 dialog|背景の作業を一時止め、確認や短い作業へ集中してもらうとき。|通常の説明にはページ内表示を使い、閉じたら元の操作へ戻す。|dialog
 drawer|補助の作業面を、画面端から一時的に開くandmの構成例。|常に必要な移動先は通常のNavigationにし、モーダル時のフォーカスを管理する。|dialog,navigation
 tooltip|操作に付随する短い説明を、ホバーやフォーカスで見せるとき。|必須情報や操作ボタンを入れず、タッチでも説明に届く方法を用意する。APGは検討中。|tooltip,labels
 popover|対象の近くで、補足や短い操作を開きたいとき。|複雑な作業はDialogや別ページを検討し、閉じる方法を明確にする。|dialog,navigation
 tabs-contract|Tabsの見た目とキーボード・選択状態を合わせて確認するとき。|見た目だけをタブにせず、パネルと選択状態の関係を保つ。|tabs
 overlay-contract|Dialog・Drawer・Popoverの開閉と復帰を検証するとき。|重ねて表示する必要がなければ通常のページ内UIにする。|dialog
 menu-contract|アプリのコマンド一覧と、Toolbarの操作契約を検証するとき。|サイト移動のリンクにARIA menuの操作を不用意に強制しない。|toolbar,navigation
 notification-contract|処理の進行・完了・失敗・中断を一連の体験で確認するとき。|成功表示だけを用意せず、失敗からの復帰も設計する。|notification
 data-table|検索・並べ替え・選択などを伴う、多いデータを比較するとき。|簡潔な情報だけなら通常のTableやListで足りるか検討する。|table,search
 `;
 const entries={};rows.trim().split('\n').forEach(row=>{const [id,when,alternative,keys]=row.trim().split('|');entries[id.trim()]={when,alternative,sources:keys.split(','),basis:'andm-original',checkedAt:'2026-10-13'};});
 window.ANDM_USAGE={sources,entries};
})();
