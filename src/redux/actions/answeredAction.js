export function answeredAction(answer) {
  return { type: "SAVE_ANSWERED", answer };
}

export function resetAnsweredAction() {
  return { type: "RESET_ANSWERED" };
}
