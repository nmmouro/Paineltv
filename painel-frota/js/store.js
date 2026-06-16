export const store = {
  data: {},
  lastHash: "",
  firstLoad: true
};

export function setData(key, value){
  store.data[key] = value;
}

export function getData(key){
  return store.data[key];
}
