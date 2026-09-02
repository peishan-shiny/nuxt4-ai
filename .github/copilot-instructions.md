# Nuxt 4 專案開發規則

這個專案使用 Nuxt 4 + TypeScript + Bootstrap 5，所有 AI 回覆與程式碼生成都必須遵守以下規則。

## 1. 專案技術基準

- 主要框架：Nuxt 4
- 語言：TypeScript
- UI 樣式：Bootstrap 5
- 版本與設定以現有專案為準，不得引入與專案不相容的技術或架構

## 2. 程式碼風格與慣例

### 組件模式

- 所有 Vue 組件一律使用 `<script setup lang="ts">`
- 優先使用 Nuxt 的 Auto-imports，例如 `ref`、`computed`、`useFetch`，避免手動 import
- 組件名稱使用 PascalCase，例如 `TheHeader.vue`、`BaseButton.vue`

### 函式與變數命名

- 函式一律使用箭頭函式
- 命名需具有明確語意，避免使用無意義縮寫或代號
- 優先使用可讀性高的名稱，例如 `currentAt` 優於 `ymdStr`
- 避免使用 JavaScript / TypeScript / HTML / CSS 的保留字與框架內建關鍵字作為變數或函式名稱
- 命名慣例：
  - Boolean：使用 `is`、`has`、`can` 前綴，例如 `isEnabled`、`hasPermission`
  - Array：使用 `List` 或 `Array` 結尾，例如 `userList`、`sortArray`
  - Number：使用 `count`、`total` 相關命名，例如 `downloadCount`、`totalAmount`
  - Time：使用 `At` 結尾，例如 `createdAt`、`deletedAt`
- 功能型函式以動詞開頭，例如 `getUserName`、`setUserName`、`handleSubmit`
- 命名盡量控制在五個單詞以內，避免過長且難以理解的名稱
- 函式參數避免過多；若超過五個，應改為使用物件方式傳遞

### 目錄結構

- 業務邏輯與 API 請求應抽離至 `app/composables/`
- 共用型別定義於 `shared/types/`
- 頁面元件放在 `app/pages/`
- 共用組件放在 `app/components/`
- 工具函式放在 `app/utils/`

### CSS 處理

- 優先使用 Bootstrap 5 的 Utility Classes，避免自行撰寫大量 CSS
- 若有特殊邏輯需求，才允許撰寫自訂樣式
- 若需要自訂樣式，使用 SCSS 並遵循 BEM 命名法

## 3. 開發與回覆要求

- 每次提供程式碼時，必須符合目前專案結構與命名規則
- 產出的內容應優先考慮可維護性、可讀性與 Nuxt 的最佳實踐
- 若新增檔案，應放在對應目錄中，避免散落於不相關位置
- 修改既有程式碼時，應盡量保持最小變更，避免不必要的重構
- 若需要新增依賴，應優先使用現有套件與配置，不要無故引入新框架

## 4. 驗證要求

- 在完成功能修改後，應至少執行一次建置或相關驗證步驟
- 若無法驗證，回覆中必須明確說明目前狀態與未驗證項目
- 任何聲稱「已完成」或「可運行」的內容，都必須基於實際驗證結果

## 5. 輸出格式要求

- 回覆請使用簡潔、結構化的中文說明
- 若提供程式碼，請確保可直接套用於目前專案
- 若有多種實作方式，優先選擇最符合 Nuxt 4 / TypeScript / Bootstrap 5 的方式
