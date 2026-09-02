---
name: create-nuxt4-project
description: "Use this skill when you need to create a brand-new Nuxt 4 project in Chinese, ask for the project name first, scaffold the app with Nuxt 4 + TypeScript, install Bootstrap 5, finish the basic setup, and report each major step clearly."
---

# 建立 Nuxt 4 專案 Skill

## 目標

協助建立一個全新的 Nuxt 4 專案，並完成以下要求：

- 先詢問使用者「專案名稱要設定什麼」
- 使用最新穩定版 Nuxt 4
- 使用 TypeScript
- 使用 Bootstrap 5
- 不安裝其他 UI framework
- 每完成一個主要步驟都要回報結果
- 如果遇到需要使用者決定的情況，先詢問，不要自行決定
- 如果發生錯誤，請用中文說明原因

## 執行流程

### 1. 先詢問專案名稱

- 在開始建立前，先向使用者詢問：「請問專案名稱要設定成什麼？」
- 若使用者沒有提供名稱，請不要進行任何建立動作，先等待回覆
- 若目標資料夾已存在，請先停下並詢問使用者是否要覆蓋、改名，或選擇其他路徑

### 2. 建立 Nuxt 4 專案

- 使用最新穩定版 Nuxt 4 建立新專案
- 依照使用者提供的專案名稱建立專案資料夾
- 啟用 TypeScript
- 盡量使用官方建議的最新指令，避免使用過時方式

### 3. 安裝 Bootstrap 5

- 專案建立完成後，再安裝 Bootstrap 5
- 只安裝 Bootstrap 5，不安裝 Tailwind、Vuetify、Element Plus、Ant Design、PrimeVue 或其他 UI framework
- 完成基本設定，讓專案可以順利使用 Bootstrap 5 的 CSS

### 4. 完成基本設定

- 確認 Nuxt 4 專案可正常啟動
- 加入 Bootstrap 5 的基本設定
- 若有必要，將 Bootstrap 的樣式載入到專案中
- 若有需要，更新基本範例頁面，讓使用者能立即看到 Bootstrap 5 可用

## 互動規則

### 進度回報

每完成一個主要步驟後，請用中文向使用者報告結果，例如：

- 「✅ 已建立 Nuxt 4 專案」
- 「✅ 已安裝 Bootstrap 5」
- 「✅ 已完成基本設定」
- 「⏳ 接下來將確認專案是否可正常啟動」

### 需要使用者決定時

若遇到以下情況，請先詢問使用者，而不是自行決定：

- 專案名稱是否要變更
- 是否要覆蓋已存在的資料夾
- 是否要將專案建立在目前工作區的子資料夾中
- 是否要使用不同的安裝位置

### 錯誤處理

如果執行期間發生錯誤，請：

- 用中文說明錯誤原因
- 清楚說明是哪一步發生問題
- 若可行，提供下一步建議
- 不要只說「失敗」而不說原因

## 建議的執行順序

1. 先詢問專案名稱
2. 建立 Nuxt 4 專案
3. 安裝 Bootstrap 5
4. 完成基本設定
5. 確認專案可啟動
6. 向使用者回報最終結果

## 注意事項

- 這個 Skill 的目標是建立新的 Nuxt 4 專案，不是修改現有專案
- 不要額外安裝其他 UI framework
- 遇到不確定的地方，優先詢問使用者，而不是自行假設
