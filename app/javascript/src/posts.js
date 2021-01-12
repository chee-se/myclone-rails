import xfetch from "./xfetch";

window.onload = function () {
  const uploadZone = document.querySelector("#upload-zone");
  const uploadInput = document.querySelector("#upload-input");
  const body = document.querySelector("body");

  // ボタンを押下された場合の処理
  uploadInput.addEventListener("change", (e) => {
    const imageFiles = uploadInput.files;
    if (!validateImageFiles(imageFiles)) {
      e.preventDefault();
      return;
    }

    uploadImage(imageFiles[0]).then((json) => {
      displayMessage("アップロードが成功しました。");
    });
  });

  // 画像がドロップされた時の処理
  uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const imageFiles = e.dataTransfer.files;
    if (!validateImageFiles(imageFiles)) {
      return;
    }

    uploadImage(imageFiles[0], displayMessage).then((json) => {
      displayMessage("アップロードが成功しました。");
    });
  });

  //dragoverイベントでを中止してドロップイベントを取得
  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  uploadZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
  });

  // 関数
  const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append("post[image]", imageFile);
    const parameter = {
      method: "POST",
      body: formData,
    };
    return xfetch("/posts.json", parameter).then((response) => {
      return response.json();
    });
  };

  const validateImageFiles = (files) => {
    if (files.length == 0) {
      displayErrorMessage("画像ファイルを選択してください。");
      return false;
    }
    if (files.length > 1) {
      displayErrorMessage("ファイルは一つだけ選択してください。");
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
