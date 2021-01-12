export default function (url, options) {
  // XmlHttpRequest化
  const xmlHttpRequestHeaders = {
    "X-Requested-With": "XMLHttpRequest",
  };
  Object.assign((options["headers"] ||= {}), xmlHttpRequestHeaders);

  // CSRFトークン付与
  const method = options["method"] || "get";
  if (method.toLowerCase() != "get") {
    const csrfToken = document.querySelector("[name='csrf-token']").content;
    const csrfHeaders = {
      "X-CSRF-Token": csrfToken,
    };
    Object.assign(options["headers"], csrfHeaders);
  }
  return fetch(url, options);
}
