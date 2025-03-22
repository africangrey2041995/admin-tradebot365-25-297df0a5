
# Error Signals Component

## Cấu trúc và nguyên tắc hoạt động

Component này được tái cấu trúc để giải quyết các vấn đề về định tuyến và chuẩn hóa ID.

### Các file chính:

1. **ErrorSignals.tsx**: Component gốc để hiển thị lỗi
2. **ErrorSignalsTable.tsx**: Bảng hiển thị các lỗi với hỗ trợ cho trạng thái loading/error
3. **ErrorSignalRow.tsx**: Từng dòng trong bảng lỗi, đã được cải tiến để sử dụng custom navigation hook
4. **types.ts**: TypeScript interfaces và types
5. **mockData.ts**: Dữ liệu mẫu với các ID đã được chuẩn hóa

### Các Utils và Hooks:

1. **useNavigation.tsx**: Hook xử lý điều hướng thông minh
2. **botUtils.ts**: Các hàm tiện ích để xử lý ID bot
3. **routes.ts**: Constants cho đường dẫn
4. **botTypes.ts**: Định nghĩa các loại bot và định dạng ID

## Cách sử dụng

```tsx
// Import component ErrorSignals
import ErrorSignals from "@/components/bots/error-signals/ErrorSignals";

// Sử dụng trong component khác
<ErrorSignals botId="PRE-001" />
```

## Quy ước đặt tên ID

- Bot người dùng: `MY-xxx`
- Premium bots: `PRE-xxx`
- Prop trading bots: `PROP-xxx`

## Xử lý nâng cao

Component đã được cải tiến để xử lý:
- Fallback UI cho các trạng thái loading/error
- Điều hướng thông minh tùy theo context admin/user
- Debug logging rõ ràng
- TypeScript type checking mạnh mẽ hơn
