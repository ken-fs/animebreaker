# 部署说明

站点：`animebreaker`（Cloudflare Worker，静态资源）
域名：`animebreaker.site`（待注册）

---

## 当前状态

| 项 | 状态 |
|---|---|
| 代码 | ✅ 本地构建通过（26 页） |
| 仓库 | ✅ https://github.com/ken-fs/animebreaker（main 已推） |
| Worker | ⬜ 待建 |
| 域名 | ⬜ 待注册（RDAP 2026-09-23 验证可用） |

## 上线步骤（顺序敏感）

1. 注册域名 → Cloudflare 加 zone → 改 NS → **dashboard 点「立即检查名称服务器」**
2. **等 zone active**（animedice 教训：pending 时绑域名 = 证书签发失败且不重试）
3. Worker → Settings → Builds → Connect Git（wrangler 无此 scope，必须 dashboard）
5. 构建命令：`NEXT_PUBLIC_SITE_URL=https://animebreaker.site pnpm run build`
   部署命令：`npx wrangler deploy`
6. 绑自定义域（含 www）
7. 验证：`curl https://animebreaker.site/sitemap.xml` 域名指向正确 + 首页 200

## 之后

- GA4：建属性 → 填 `src/components/analytics-consent.tsx` 的 `GA_ID`
- GSC：加属性 → 服务账号 Owner → `node ../scripts/gsc.mjs sitemaps`
- IndexNow：生成 key → `public/<key>.txt` → `node scripts/submit-indexnow.mjs`
- 验收基线：加进 `../scripts/verify-baseline.json`
