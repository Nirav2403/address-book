export const loadState = () => {
  try {
    const productState = JSON.parse(localStorage.getItem("ADDRESS_BOOK"));
    if (productState === null) return undefined;
    return productState;
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem("ADDRESS_BOOK", JSON.stringify(state));
  } catch (error) {
    console.log(error);
  }
};
