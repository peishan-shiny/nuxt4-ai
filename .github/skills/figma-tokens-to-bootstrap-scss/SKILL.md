---
name: figma-tokens-to-bootstrap-scss
description: 'Use this skill when you need to convert Figma design tokens or exported token JSON into SCSS variables for a Nuxt 4 + Bootstrap 5 project, preserving Bootstrap 5 variable names and overriding defaults before import.'
---

# Figma Tokens 轉 Bootstrap SCSS Skill

## 目標

當使用者提供 Figma 的 token 匯出內容、JSON、CSS、SCSS 或設計規範時，將其整理為可直接套用到 Nuxt 4 + Bootstrap 5 專案的 SCSS 設計系統。

## 主要規則

### 1. 先確認 token 類型

先判斷提供的內容屬於哪一類：

- spacing
- color
- typography
- radius
- shadow
- component tokens

若內容不足，先詢問使用者補充，避免自行猜測。

### 2. 讀取 token 時先判斷目標檔案

在讀取 Figma token 後，先判斷每一個 token 是否對應到 Bootstrap 5 原生變數。

- 若 token 名稱與 Bootstrap 5 原生變數一致，例如 `$primary`、`$secondary`、`$success`、`$border-radius`、`$font-family-sans-serif` 等，請直接修改 [app/assets/scss/variables/\_bootstrap.scss](app/assets/scss/variables/_bootstrap.scss) 裡面的變數值。
- 若 token 是自訂設計 token，例如 `$min-widths`、`$opacity`、`$color-brand`、`$radius-sm` 等，請直接新增到 [app/assets/scss/variables/\_custom.scss](app/assets/scss/variables/_custom.scss)。
- 若不確定是否為 Bootstrap 變數，請先以 Bootstrap 5 變數名稱表為準；若沒有對應，則視為自訂變數。

### 3. 優先覆寫 Bootstrap 5 原生變數

如果是 Bootstrap 5 原本就有的變數，請依照 Bootstrap 5 原本的變數名稱來覆蓋，而不是自行新增不相容的命名。

例如：

- `$primary`
- `$secondary`
- `$success`
- `$danger`
- `$body-color`
- `$spacer`
- `$border-radius`
- `$font-family-sans-serif`

### 3. 覆寫順序必須正確

SCSS 的覆寫順序要遵守：

1. 先定義 Figma token 變數
2. 再覆寫 Bootstrap 5 變數
3. 最後匯入 Bootstrap

這樣才能確保 Bootstrap 的內建元件會套用到新的設計系統。

### 4. 對應方式優先使用語義化命名

除了直接覆寫 Bootstrap 變數外，也可以補上一層語義化 token：

- `$color-primary`
- `$color-text-muted`
- `$surface-card`
- `$radius-sm`
- `$radius-md`

這些 token 可作為中間層，方便後續維護。

### 5. spacing 建議對應到 Bootstrap spacing system

若 token 內容是 spacing，建議整理為：

```scss
$spacer: 16px;

$spacers: (
  0: 0,
  1: 4px,
  2: 8px,
  3: 12px,
  4: 16px,
  5: 20px,
  6: 24px,
  7: 28px,
  8: 32px,
  9: 40px,
  10: 48px,
  11: 56px,
  12: 64px,
) !default;
```

這樣能與 Bootstrap 的 spacing utility 一致。

### 6. 顏色建議映射到 Bootstrap theme colors

若提供顏色 token，建議建立：

```scss
$primary: #4f46e5;
$secondary: #6b7280;
$success: #16a34a;
$danger: #dc2626;
$light: #f8f9fa;
$dark: #111827;

$theme-colors: (
  'primary': $primary,
  'secondary': $secondary,
  'success': $success,
  'danger': $danger,
  'light': $light,
  'dark': $dark,
);
```

若是灰藍色系等中性色階層，請不要直接寫固定色碼，而是使用 Bootstrap 5 的 `tint-color()` 與 `shade-color()` 由基底色推導各階層，例如：

```scss
$color-gray-blue: #939ca7;

$color-gray-blue-750: shade-color($color-gray-blue, 50%);
$color-gray-blue-700: shade-color($color-gray-blue, 40%);
$color-gray-blue-650: shade-color($color-gray-blue, 30%);
$color-gray-blue-600: shade-color($color-gray-blue, 20%);
$color-gray-blue-550: shade-color($color-gray-blue, 10%);
$color-gray-blue-500: $color-gray-blue;
$color-gray-blue-400: tint-color($color-gray-blue, 20%);
$color-gray-blue-350: tint-color($color-gray-blue, 30%);
$color-gray-blue-300: tint-color($color-gray-blue, 40%);
$color-gray-blue-200: tint-color($color-gray-blue, 60%);
$color-gray-blue-100: tint-color($color-gray-blue, 80%);
$color-gray-blue-50: tint-color($color-gray-blue, 90%);
```

### 7. 字體與圓角也要整理為 Bootstrap 可覆寫變數

例如：

```scss
$font-family-sans-serif: 'Inter', sans-serif;
$border-radius: 12px;
$border-radius-sm: 8px;
$border-radius-lg: 16px;
```

## 執行流程

1. 讀取使用者提供的 Figma token 或樣式內容。
2. 判斷哪些是 Bootstrap 5 原生變數，哪些是額外設計 token。
3. 先建立原始 token 變數。
4. 再將其對應到 Bootstrap 5 的變數名稱。
5. 生成可直接使用的 SCSS 檔案內容。
6. 若有必要，補充一個主樣式入口，讓專案可直接載入。

## 輸出要求

產出的內容應該符合以下格式：

- 使用 SCSS 語法
- 可直接貼入 Nuxt 專案樣式檔
- 保留 Bootstrap 5 相容性
- 優先使用可維護的語義化命名
- 若內容不足，先詢問使用者再進行補完

## 注意事項

- 不要直接把 Figma token 變成與 Bootstrap 無關的亂命名
- 不要在 Bootstrap import 之後再覆寫，會導致樣式無法正確生效
- 若使用者提供的是 JSON token，應先整理成對應的 SCSS 變數結構
- 若使用者提供的是 Figma URL 而沒有 token 匯出內容，先請其提供 token JSON 或樣式清單

## 範例輸出方向

- 將 spacing token 轉成 `$spacers`
- 將 color token 轉成 `$primary`、`$secondary` 等
- 將 typography token 轉成 `$font-family-sans-serif` 等
- 將 radius token 轉成 `$border-radius` 等
