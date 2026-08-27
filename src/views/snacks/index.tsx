import { computed, defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";

type Snack = {
  id: number;
  joined: string;
  type: string;
  brand: string;
  name: string;
  flavor: string[];
  rating: number | null;
  note: string;
  emoji: string;
};

const snacks: Snack[] = [
  { id: 1, joined: "2026.08.27", type: "方便速食", brand: "空刻", name: "意大利面", flavor: [], rating: null, note: "口味与评价待记录", emoji: "🍝" },
];

const snackTypes = ["全部", "薯片膨化", "饼干糕点", "糖果巧克力", "坚果炒货", "果干蜜饯", "肉类零食", "方便速食", "饮料冲饮"];
const snackTypeIcons: Record<string, string> = { 全部: "✦", 薯片膨化: "🍿", 饼干糕点: "🍪", 糖果巧克力: "🍫", 坚果炒货: "🥜", 果干蜜饯: "🍓", 肉类零食: "🥓", 方便速食: "🍜", 饮料冲饮: "🥤" };

export default defineComponent({
  name: "SnackList",
  setup() {
    const query = ref("");
    const activeType = ref("全部");
    const sort = ref<"new" | "rating">("new");
    const types = snackTypes;
    const visible = computed(() => {
      const keyword = query.value.trim().toLowerCase();
      return snacks
        .filter((item) => activeType.value === "全部" || item.type === activeType.value)
        .filter((item) => !keyword || [item.brand, item.name, item.type, item.note, ...item.flavor].join(" ").toLowerCase().includes(keyword))
        .sort((a, b) => sort.value === "rating" ? (b.rating ?? -1) - (a.rating ?? -1) : b.joined.localeCompare(a.joined));
    });

    return () => <main class="snack-page">
      <header class="topbar snack-topbar">
        <RouterLink class="brand" to="/"><i>♡</i><span><b>coco’s food map</b><small>我们的好吃备忘录</small></span></RouterLink>
        <nav class="crumb"><RouterLink to="/">首页</RouterLink><span>／</span><b>零食 List</b></nav>
        <RouterLink class="back-home" to="/">← 回到好吃地图</RouterLink>
      </header>

      <section class="snack-hero">
        <div class="snack-copy">
          <span class="eyebrow">COCO'S SNACK SHELF · 01</span>
          <h1><em>COCO</em> 精选</h1>
          <p>认真吃零食，也认真记下每一种让人开心的味道。</p>
          <div class="mini-stats"><span><b>01</b> 零食收藏</span><span><b>—</b> 平均评分</span><span><b>01</b> 已用分类</span></div>
        </div>
        <div class="mascot-card">
          <span class="mascot-note">TODAY'S HAPPY BITE</span>
          <img src={`${import.meta.env.BASE_URL}snack-mascots.png`} alt="挥手的菠萝油和面包卡通形象" />
          <i>好吃的要一起分享呀！</i>
        </div>
      </section>

      <section class="snack-shell">
        <aside class="snack-sidebar">
          <span class="side-label">SNACK TYPE</span>
          <h2>零食分类</h2>
          <nav>{types.map((type) => <button class={{ active: activeType.value === type }} onClick={() => activeType.value = type}><i>{snackTypeIcons[type]}</i><span>{type}</span><small>{type === "全部" ? snacks.length : snacks.filter((item) => item.type === type).length}</small></button>)}</nav>
          <div class="snack-tip"><span>💡</span><b>COCO 的挑选标准</b><p>口味有记忆点，吃完会想念，才值得留在这张清单里。</p></div>
        </aside>

        <section class="snack-list-panel">
          <header class="list-toolbar">
            <div><span class="side-label">MY FAVORITES</span><h2>零食 List</h2></div>
            <div class="list-controls"><label>⌕<input value={query.value} onInput={(event) => query.value = (event.target as HTMLInputElement).value} placeholder="搜索品牌、名称或口味" /></label><button onClick={() => sort.value = sort.value === "new" ? "rating" : "new"}>{sort.value === "new" ? "最新加入" : "评分优先"} ↕</button></div>
          </header>

          <div class="snack-table">
            <div class="snack-row snack-head"><span>加入时间</span><span>零食类型</span><span>零食品牌</span><span>零食名称</span><span>口味</span><span>评价</span></div>
            {visible.value.map((item) => <article class="snack-row" key={item.id}>
              <time>{item.joined}</time>
              <span><b class="type-pill">{item.type}</b></span>
              <span class="snack-brand">{item.brand}</span>
              <span class="snack-name"><i>{item.emoji}</i><b>{item.name}</b></span>
              <span class="flavor-tags">{item.flavor.length ? item.flavor.map((flavor) => <em>{flavor}</em>) : <em>待记录</em>}</span>
              <span class="snack-rating"><b>{item.rating === null ? "☆ 待评价" : `★ ${item.rating.toFixed(1)}`}</b><small>{item.note}</small></span>
            </article>)}
            {!visible.value.length && <div class="snack-empty">🍪<b>没有找到这包零食</b><span>换个关键词再试试吧</span></div>}
          </div>
          <footer class="list-footer"><span>共 {visible.value.length} 条零食记录</span><b>每一口，都是今日份的小确幸 ♡</b></footer>
        </section>
      </section>
    </main>;
  },
});
