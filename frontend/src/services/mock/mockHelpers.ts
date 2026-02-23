export const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

export const createMockError = (status: number, message: string) => {
  const error: any = new Error(message);
  error.response = { status, data: { error: message } };
  return error;
};

export const getCurrentUserId = (): string | null => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr).id ?? null;
  } catch {
    return null;
  }
};
