# drama — 部署说明

## 文件结构
```
drama/
├── index.html     # 主应用
├── manifest.json  # PWA 配置
├── sw.js          # Service Worker（离线缓存）
├── icon-192.png   # 应用图标
└── icon-512.png   # 应用图标（大）
```

## 免费部署方式（二选一）

### 方式一：Cloudflare Pages（推荐）
1. 注册 https://pages.cloudflare.com
2. 创建项目 → 直接上传 → 把 `drama` 文件夹里的所有文件拖进去
3. 部署完成，得到一个 `*.pages.dev` 域名

### 方式二：GitHub Pages
1. 新建一个 GitHub 仓库（比如 `drama`）
2. 把所有文件上传进去
3. Settings → Pages → Branch: main → Save
4. 得到 `https://你的用户名.github.io/drama` 链接

## iPhone 安装为 App
1. Safari 打开你的链接
2. 点底部分享按钮 → **添加到主屏幕**
3. 主屏幕上出现 drama 图标，打开即全屏体验

## Mac 安装为 App
- Chrome：地址栏右侧点安装图标
- Safari：文件 → 添加到程序坞

## 注意事项
- 豆包 API Key 存在浏览器本地，不会上传到任何服务器
- iPhone PWA 模式下 IndexedDB 数据独立于 Safari，始终用图标打开保持数据一致
- 数据全部存在本地，建议定期在"历史记录"页面导出 JSON 备份
