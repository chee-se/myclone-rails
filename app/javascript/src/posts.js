import railsFetch from "./rails-fetch";

window.onload = function () {
  const postForm = document.querySelector("#post-form");
  const postImageInput = document.querySelector("#post_image");
  const body = document.querySelector("body");

  // 画像フォームが変更された場合の処理
  postImageInput.addEventListener("change", (e) => {
    const imageFiles = postImageInput.files;
    if (!validateImageFiles(imageFiles)) {
      e.preventDefault();
      return;
    }
    const formData = new FormData();
    formData.append("post[image]", imageFiles[0]);
    const parameter = {
      method: "POST",
      body: formData,
    };
    railsFetch("/posts", parameter)
      .then((response) => {
        return res.json();
      })
      .then((json) => {
        displayMessage("アップロードが成功しました。");
      });
  });

  // サブミットボタンが押された場合の処理
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imageFiles = postImageInput.files;
    if (!validateImageFiles(imageFiles)) {
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

  // 関数
  const validateImageFiles = (files) => {
    if (files.length == 0) {
      displayErrorMessage("画像ファイルを選択してください。");
      return false;
    }
    if (!files[0].type.includes("image")) {
      displayErrorMessage("画像ファイルを選択してください。");
      return false;
    }
    if (files[0].size > 3 * 1028 * 1000 * 1000) {
      displayErrorMessage("ファイルサイズが3MBを超えています。");
      return false;
    }
    return true;
  };

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