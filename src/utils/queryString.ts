export const toQueryString = (obj: any) => "".concat(Object.keys(obj).map(e => `${encodeURIComponent(e)}=${encodeURIComponent(obj[e])}`).join("&"));
