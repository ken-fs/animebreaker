# Anime Breaker Reference · 运营档案

> 舰队第二个路径 B 站（Next.js 自建），从 `animedice` 复制改造。
> 建档 2026-09-23（构建当天）。

---

## 一、站点档案

| 项 | 值 |
|---|---|
| 域名 | `animebreaker.site`（RDAP 已验证可注册，**待注册**） |
| 仓库 | https://github.com/ken-fs/animebreaker（✅ 已建已推，用钥匙串里 ken-fs 的 gho_ token 走 REST API 创建） |
| Worker | `animebreaker`（待建） |
| 游戏 | Anime Breaker（Roblox） |
| placeId / universeId | `109928390521457` / `10675117523` |
| 页面数 | 26（10 顶层 + 7 伙伴 + 4 boss + 404 + robots + sitemap） |
| 技术栈 | 同 animedice：Next.js 16 · Tailwind v4 · shadcn/ui · Geist · Phosphor · `output: export` |
| GA4 | **未创建**（`analytics-consent.tsx` 的 `GA_ID = ""`，空 = 横幅不显示、完全不加载） |
| 主题色 | 浅底 + 深紫罗兰 accent（5 个竞品全暗色 → 反向走；与 animedice 的琥珀色区分） |

### 页面结构

```
/                  首页：hero（官方 Shadows 美术）+ top3 码 + 5 世界 + 6 系统 + 诚实声明
/codes/            22 码 = 15 verified（wikirealm 09-19 多源交叉）+ 7 creator-reported
/bosses/           4 秘密 boss 总览（100% 掉落机制 + 稀有度 roll）
/bosses/[slug]/    vegeta / levi / kakashi / meliodas（位置 + 掉落 + 打法）
/companions/       按世界分组的伙伴池（空缺世界诚实标注）
/companions/[slug]/ 7 页：W1 五伙伴 + sung-jin-woo + sanjiro
/pets/             宠物机制 + 3 个已确认名（Dragon Sin / Lion Sin / Sage Mode）
/races/            种族系统（Namekian / Majin / Frieza 已确认）
/shadows/          Shadows 系统（Update 1：portal C/B/A/S + merge + pity + passive）
/classes/          Class Tree（Update 1.5）+ Commandment Totem
/guide/            新手路线
/about/            两级数据标签 + 8 条已知缺口 + 来源
```

---

## 二、数据基线（构建时）

### 游戏侧（Roblox API 实测 2026-09-23）

| 指标 | 值 |
|---|---|
| CCU | 10,181 |
| 总访问 | 3,418,558 |
| 收藏 | 45,614（访问/收藏 = 75，留存好） |
| 上线 | 2026-08-10（43 天） |
| 最近更新 | 2026-09-22（Update 1.5，Class Tree） |
| 增长比 | 7.7x（成长期） |

### 竞争格局（2026-09-23 实测）

5 个专用站全部零实体页：animebreakerwiki.wiki（AI 假数据）/ animebreaker-wiki.wiki（AI 占位）/
animebreaker.wiki（主题页）/ animebreaker.wikirealm.com（唯一真数据，~10 页）/ anime-breaker.wiki（主题页）。
详见 `../GAME-SCAN-2026-09-23.md`。

---

## 三、内容来源与待补

### 来源分级

| 级 | 来源 | 用于 |
|---|---|---|
| verified | wikirealm（截图佐证）+ 创作者视频交叉 | W1 伙伴池 / boss 掉落 / 15 码 |
| creator-reported | DomiBlox / SMG Infinity / EpicBloxBacon 字幕 | W5 伙伴 / 宠物 / 新码 / 系统机制 |

### 待补（建站后滚动）

- [ ] W2/W3/W4 伙伴全名单（字幕未覆盖，需游戏内或更多视频）
- [ ] 宠物全名单 + 概率
- [ ] 种族全名单
- [ ] Shadow 全名单（已知 2 个）
- [ ] Class Tree 职业名
- [ ] Hunter City 秘密 boss
- [ ] 新码二次验证（CLASSTREE / SORRYFORSHUTDOWN / 3MVISITS / 30KFAVORITES）

### 字幕存档

`/tmp/ab-subs/`（临时）：Zom3cc1Ezak（1.5 更新）/ q2UQ8dm8a1o + SEH4LQ04mJA（DomiBlox noob-to-pro 两部）/
p-iSZGoDE2I（SMG 0.5 更新）/ MMyrLgRTN1w（boss 位置）/ R8nbVEbXejc（shadows+amulet）/ uQ9uo7GfmI8（FAQ）

---

## 四、上线待办（人工）

1. **注册 `animebreaker.site`**（RDAP 已验证可用）
3. Cloudflare：建 Worker → Git 集成 → **等 zone active 再绑域名**（animedice 踩过证书坑）
4. 构建命令：`NEXT_PUBLIC_SITE_URL=https://animebreaker.site pnpm run build`，部署 `npx wrangler deploy`
5. 建 GA4 属性 → 填入 `analytics-consent.tsx` 的 `GA_ID`
6. GSC 加属性 → 服务账号 Owner → `scripts/gsc.mjs sitemaps` 提交
7. 生成 IndexNow key → `public/<key>.txt` + `scripts/submit-indexnow.mjs`
8. 加进 `scripts/verify-baseline.json` 的 browserPages
9. Clash `Merge.yaml` 加 `DOMAIN-SUFFIX,animebreaker.site,DIRECT` + fake-ip-filter
