export const RequireRule = {
  rule: /.+/,
  match: true,
  message: '필수 입력 항목입니다.',
}
export const EmailRule = {
  rule: /\@/,
  match: true,
  message: '@를 추가해야 합니다.',
}
export const MinimumLengthLimit = (limit) => ({
  rule: new RegExp(`(.){${limit}}`),
  match: true,
  message: `최소한 ${limit}글자 이상 이어야 합니다.`,
});

