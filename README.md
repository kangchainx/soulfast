# SoulFast

> 16:8科学断食管理

## 🔧 技术栈

| 分类 | 技术 |
|------|------|
| 基础 | Expo SDK 54, React 19.1 |
| 路由 | Expo Router v4 |
| 样式 | NativeWind v5 (Tailwind CSS) |
| 状态 | Zustand |
| 动画 | React Native Reanimated |
| 图标 | Lucide React Native |
| 字体 | Noto Sans SC |

## 🎨 设计规范

| Token | 值 |
|-------|-----|
| 背景色 | `#FFF9F2` |
| 强调色 | `#FF8C69` |
| 文字色 | `#4A4238` |
| 辅助色 | `#D4A373` |

## 📁 项目结构

```
soulfast/
├── app/                    # Expo Router 页面
│   ├── _layout.tsx         # 全局布局
│   └── (tabs)/             # Tab 导航页面
│       ├── _layout.tsx     # Tab 布局
│       ├── index.tsx       # 断食计时器
│       ├── community.tsx   # 社区动态
│       └── profile.tsx     # 个人数据
├── components/             # 可复用组件
│   └── ConfirmModal.tsx    # 确认模态框
├── store/                  # Zustand 状态
│   └── useTimerStore.ts    # 计时器状态
└── assets/                 # 静态资源
    └── fonts/              # 字体文件
```

## 📄 License

MIT
