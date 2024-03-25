export async function storeKey(key: string, value: string) {
  try {
    if (!value || typeof value != "string")
      return null;
    await chrome.storage.local.set({ [key]: value })
    console.log(`Data stored ${key} successfully`);
    return true
  } catch (err) {
    console.error("While setting key", key, err)
    return undefined
  }
};

export async function getKey(key: string) {
  try {
    const value = await chrome.storage.local.get(key)
    if (value[key]) {
      return value[key] as string
    } else {
      return null
    }
  } catch (err) {
    console.error("While getting key", key, err)
    return undefined
  }
}