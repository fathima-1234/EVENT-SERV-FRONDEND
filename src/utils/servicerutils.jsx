// utils.js
export function getServicerDataFromLocalStorage() {
  const userJSON = localStorage.getItem("user");
  if (userJSON) {
    const user = JSON.parse(userJSON);
    const servicer_id = user?.servicer_id;

    const servicer_is_active = user?.is_active;
    return { servicer_id, servicer_is_active };
  }
  return { servicer_id: null, servicer_is_active: false };
}
