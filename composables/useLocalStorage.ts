export function useLocalStorage() {
  function setItem(key: string, value: any) {
    if (process.client) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  function getItem(key: string) {
    if (process.client) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  function removeItem(key: string) {
    if (process.client) {
      localStorage.removeItem(key);
    }
  }

  function clearLocalStorage() {
    if (process.client) {
      localStorage.clear();
    }
  }

  return {
    setItem,
    getItem,
    removeItem,
    clearLocalStorage,
  };
}
