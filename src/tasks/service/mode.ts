export const getMessage = (mode: string) => {
  switch (mode) {
    case 'create':
      return 'タスクを追加しました';
    case 'update':
      return 'タスクを更新しました';
    case 'delete':
      return 'タスクを削除しました';
    default:
      return '';
  }
};
