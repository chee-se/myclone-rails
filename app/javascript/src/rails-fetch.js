export default function (url, options) {
  const method = options["method"] || "get";
  if (method.toLowerCase() != "get") {
    const csrfToken = document.querySelector("[name='csrf-token']").content;
    const csrfHeaders = {
      "X-CSRF-Token": csrfToken,
    };
    Object.assign((options["headers"] ||= {}), csrfHeaders);
  }
  return fetch(url, options);
}
