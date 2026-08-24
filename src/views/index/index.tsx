import { computed, defineComponent, ref } from "vue";

type Food={id:number;name:string;category:string;tag:string;score:number;area:string;note:string;emoji:string;color:string;x:number;y:number};
const foods:Food[]=[
 {id:1,name:"菠萝油",category:"面包",tag:"广味",score:4.8,area:"老城区",note:"酥皮要脆，黄油要冰！",emoji:"🍞",color:"#f4b755",x:17,y:29},
 {id:2,name:"蜜汁叉烧",category:"肉肉",tag:"烧腊",score:4.9,area:"西关",note:"半肥瘦，边缘微焦最香",emoji:"🍖",color:"#ec7a69",x:46,y:17},
 {id:3,name:"手撕肉脯",category:"肉肉",tag:"零食",score:4.7,area:"江南西",note:"甜甜韧韧，追剧搭子",emoji:"🥓",color:"#df685a",x:75,y:30},
 {id:4,name:"杨枝甘露",category:"饮品",tag:"甜饮",score:4.8,area:"天河",note:"芒果多一点，冰少一点",emoji:"🥭",color:"#efc251",x:64,y:68},
 {id:5,name:"脆皮乳鸽",category:"肉肉",tag:"油炸",score:4.9,area:"北京路",note:"皮脆会爆汁，趁热吃",emoji:"🍗",color:"#d36b4e",x:29,y:70},
 {id:6,name:"海盐可颂",category:"面包",tag:"咸口",score:4.6,area:"东山口",note:"外壳咔嚓，里面软乎乎",emoji:"🥐",color:"#e8a85d",x:84,y:54}
];
const categories=[{n:"全部",i:"✦",c:18},{n:"面包",i:"🥐",c:6},{n:"肉肉",i:"🍖",c:8},{n:"饮品",i:"🧋",c:4}];
const tags=["全部肉肉","零食","菜","甜口肉","烧腊","广味","肉脯","油炸"];

export default defineComponent({setup(){
 const category=ref("全部"),tag=ref("全部肉肉"),query=ref(""),selected=ref(2),favorites=ref([2,5]);
 const visible=computed(()=>foods.filter(f=>{const q=query.value.trim();return(category.value==="全部"||f.category===category.value)&&(category.value!=="肉肉"||tag.value==="全部肉肉"||f.tag===tag.value||(tag.value==="菜"&&["烧腊","油炸","广味"].includes(f.tag)))&&(!q||`${f.name}${f.area}${f.tag}${f.note}`.includes(q))}));
 const chosen=computed(()=>foods.find(f=>f.id===selected.value));
 const chooseCategory=(n:string)=>{category.value=n;if(n!=="肉肉")tag.value="全部肉肉"};
 const heart=(id:number)=>favorites.value=favorites.value.includes(id)?favorites.value.filter(x=>x!==id):[...favorites.value,id];
 return()=> <main>
  <header class="topbar"><a class="brand" href="#"><i>♡</i><span><b>coco‘s food map</b><small>我们的好吃备忘录</small></span></a><label class="search">⌕<input v-model={query.value} placeholder="搜搜今天想吃什么..."/><kbd>⌘ K</kbd></label><div class="actions"><button>♡</button><button class="add">＋ 记一口好吃的</button><span>🐰</span></div></header>
  <section class="hero"><div><label>♡ FOR MY FAVORITE GIRL</label><h1>今天，要去吃点<br/><em>什么好呢？</em></h1><p>把每一次心动的味道，都偷偷藏进我们的地图里。</p></div><article class="surprise"><i>🍗</i><div><small>今日随机投喂</small><strong>脆皮乳鸽</strong><p>酥脆快乐，就在 2.3 km 外</p></div><button onClick={()=>selected.value=5}>去看看 →</button></article></section>
  <section class="content">
   <aside class="filters"><Title text="按什么找" tip="共 18 个宝藏"/><nav>{categories.map(c=><button class={{active:category.value===c.n}} onClick={()=>chooseCategory(c.n)}><i>{c.i}</i><b>{c.n}</b><small>{c.c}</small></button>)}</nav><hr/><Title text="肉肉小分队" tip="偏爱甜口 ♡"/><div class="tags">{tags.map(t=><button class={{active:tag.value===t}} onClick={()=>{category.value="肉肉";tag.value=t}}>{t}</button>)}</div><article class="note">💌 <span><b>她的口味暗号</b><small>爱甜口 · 不要太辣<br/>外脆里嫩会加分</small></span></article></aside>
   <section class="map"><header><span><b>好吃地图</b><small>{visible.value.length} 个地点正在召唤你</small></span><div><button class="active">⌖ 地图</button><button>☷ 列表</button></div></header><div class="mapbody"><i class="road r1"/><i class="road r2"/><i class="river"/><label class="a1">老 城 区</label><label class="a2">甜 蜜 湾</label>{visible.value.map(f=><button class={{pin:true,active:selected.value===f.id}} style={{left:`${f.x}%`,top:`${f.y}%`,background:f.color}} onClick={()=>selected.value=f.id}><span>{f.emoji}</span><b>{f.name}</b></button>)}{!visible.value.length&&<div class="empty">🍽️<b>这片区域还没藏宝</b><small>换个关键词试试吧</small></div>}{chosen.value&&visible.value.some(f=>f.id===chosen.value?.id)&&<article class="bubble" style={{left:`${Math.min(chosen.value.x+4,65)}%`,top:`${Math.min(chosen.value.y+7,72)}%`}}><i>{chosen.value.emoji}</i><span><small>★ {chosen.value.score}</small><b>{chosen.value.name}</b><p>{chosen.value.note}</p></span></article>}<div class="legend">🔴 已吃过　🟡 想去吃</div></div></section>
   <aside class="ranking"><Title text="高分必吃榜" tip="全部 →"/><p>大众点评高分灵感 · 示例数据</p><div>{[...foods].sort((a,b)=>b.score-a.score).slice(0,4).map((f,i)=><article class={{card:true,active:selected.value===f.id}} onClick={()=>selected.value=f.id}><label>0{i+1}</label><i style={{background:f.color}}>{f.emoji}<small>{f.tag}</small></i><span><b>{f.name}</b><small>★ {f.score}　· {f.area}</small><p>{f.note}</p></span><button class={{liked:favorites.value.includes(f.id)}} onClick={e=>{e.stopPropagation();heart(f.id)}}>{favorites.value.includes(f.id)?"♥":"♡"}</button></article>)}</div><button class="more">再看看更多好吃的 →</button></aside>
  </section><footer><b>Made with ♡ for 小馋猫</b><span>下一站，也要一起吃很多很多顿饭。 🍓</span></footer>
 </main>;
}});

const Title=defineComponent({props:{text:String,tip:String},setup(p){return()=> <div class="title"><b>{p.text}</b><small>{p.tip}</small></div>}});
