import 'element-plus/es/components/message/style/css';

import { ElMessage, MessageParams } from 'element-plus';

export function toast(options: MessageParams) {
    ElMessage(options);
}
