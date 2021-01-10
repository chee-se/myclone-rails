window.onload = function () {
  const postForm = document.querySelector("#post-form");
  const postImageInput = document.querySelector("#post_image");
  const body = document.querySelector("body");

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imageFiles = postImageInput.files;
    if (imageFiles.length == 0) {
      displayErrorMessage("画像ファイルを選択してください。");
      return;
    }
    if (!imageFiles[0].type.includes("image")) {
      displayErrorMessage("画像ファイルを選択してください。");
      return;
    }
    if (imageFiles[0].size > 3 * 1028 * 1000 * 1000) {
      displayErrorMessage("ファイルサイズが3MBを超えています。");
      return;
    }

    const formData = new FormData(e.target);
    const parameter = {
      method: "POST",
      body: formData,
    };

    fetch("/posts", parameter)
      .then((response) => {
        return res.json();
      })
      .then((json) => {
        displayMessage("アップロードが成功しました。");
      });
  });

  const displayErrorMessage = (message) => {
    displayMessage(message, "error");
  };

  const displayMessage = (message, className) => {
    const p = document.createElement("p");
    p.className = className;
    p.innerText = message;
    body.appendChild(p);
  };
};
