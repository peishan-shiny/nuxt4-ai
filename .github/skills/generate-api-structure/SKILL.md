---
name: generate-api-structure
description: "Read a Swagger/OpenAPI JSON file and generate API structure files under server and shared/types by using the third path segment as the filename."
---

# 產生 API 結構 Skill

## 目標

當提供 Swagger / OpenAPI 的 JSON 檔時，依照指定規則產生 API 結構檔案，讓專案中的 server 與 shared/types 目錄可以快速建立對應的檔案。

## 主要規則

### 1. 解析 Swagger 路徑

- 讀取 JSON 檔中的 `paths` 物件。
- 每一筆 API 路徑都要處理一次。
- 例如 `/api/admin/auth/login`：
  - 忽略前兩個區段，也就是 `/api` 與 `admin`。
  - 使用第三個區段 `auth` 當作檔名。

### 2. 建立檔案名稱

- 針對每支 API，使用第三個路徑區段作為檔名。
- 例如：
  - `/api/admin/auth/login` → `auth`
  - `/api/admin/user/list` → `user`

### 3. 建立檔案位置

- 在 `server` 資料夾中建立檔案：
  - `server/auth.ts`
  - `server/user.ts`
- 在 `shared/types` 資料夾中建立檔案：
  - `shared/types/auth.ts`
  - `shared/types/user.ts`

## 執行流程

1. 先確認使用者提供的是 Swagger JSON 檔案路徑。
2. 讀取 JSON 並找到 `paths` 物件。
3. 逐一遍歷每個 API 路徑。
4. 依照規則取出第三個路徑區段做為檔名。
5. 建立對應的檔案結構：
   - `server/{resourceName}.ts`
   - `shared/types/{resourceName}.ts`
6. 若檔案已存在，優先更新內容，而不是覆蓋整個檔案。

## 建議產出的檔案內容

### server/{resourceName}.ts

- 建立基本的 API 服務模板。
- 可依據 HTTP method（如 `get`、`post`、`put`、`delete`）建立對應函式骨架。
- 優先使用簡潔、可擴充的結構。

### shared/types/{resourceName}.ts

- 建立對應的 TypeScript interface 或 type 定義。
- 若 Swagger 有 `requestBody` 或 `responses` 內容，優先轉成基本型別定義。
- 若資訊不足，至少建立空型別或基本 placeholder。

## 互動規則

- 如果沒有提供 Swagger JSON 檔，先詢問使用者。
- 如果路徑區段不足以決定檔名，先詢問使用者，而不是自行猜測。
- 產生結果後，向使用者回報建立了哪些檔案。
- 不要額外安裝任何 UI framework 或額外依賴。

## 範例

對於以下路徑：

`/api/admin/auth/login`

應建立：

- `server/auth.ts`
- `shared/types/auth.ts`

## 注意事項

- 這個 Skill 的重點是依照 Swagger 路徑規則建立 API 結構，不是直接生成完整業務邏輯。
- 以簡潔且可維護的方式產生骨架檔案即可。
- 若遇到不確定的欄位結構，保留可擴充的型別定義，避免過度假設。
