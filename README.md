# SoulFast

> 16:8 科学断食管理 App


## 🎯 核心理念

- **科学**: 基于循证医学的 16:8 间歇性断食方案
- **极简**: 充足留白、大圆角、高斯模糊的禅意设计
- **去抽象化**: 使用科学术语，拒绝玄学词汇

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

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npx expo start

# 在 iOS 模拟器运行
npx expo start --ios

# 在 Android 模拟器运行
npx expo start --android
```

## 📱 功能模块

### M02/M04 断食计时器
- 非计时态：展示 16:8 介绍，长按手势启动断食
- 计时态：大字号倒计时，阶段提示，脉冲动画

### M03 社区动态
- 极简用户列表，展示断食记录

### M06 健康数据
- 累计时长、目标达成率、连续天数统计

### M05 确认模态框
- 优雅的居中弹窗，科学引导文案

## 📄 License

MIT
