import xfetch from "./xfetch";
import poptip from "./poptip";

document.addEventListener("turbolinks:load", function () {
  const uploadZone = document.querySelector("#upload-zone");
  const uploadInput = document.querySelector("#upload-input");
  const imageUrlInput = document.querySelector("#image-url");
  const copyLinkButton = document.querySelector(".copy-link");
  const postImageWrapper = document.querySelector("#post-image-wrapper");

  const uploadImageCard = document.querySelector("#upload-image");
  const uploadImageProcessingCard = document.querySelector(
    "#upload-image-processing"
  );
  const uploadImageCompleteCard = document.querySelector(
    "#upload-image-complete"
  );

  // ボタンを押下された場合の処理
  uploadInput.addEventListener("change", (e) => {
    const imageFiles = uploadInput.files;
    if (!validateImageFiles(imageFiles)) {
      e.preventDefault();
      return;
    }
    uploadAndProcess(imageFiles[0]);
  });

  // 画像がドロップされた時の処理
  uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const imageFiles = e.dataTransfer.files;
    if (!validateImageFiles(imageFiles)) {
      return;
    }
    uploadAndProcess(imageFiles[0]);
  });

  //dragoverイベントでを中止してドロップイベントを取得
  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  uploadZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
  });

  // ツールチップを設定
  poptip(copyLinkButton, (e, tip) => {
    const input = e.target.previousElementSibling;
    navigator.clipboard
      .writeText(input.value)
      .then(() => (tip.innerHTML = "Copied!"));
  });

  function uploadAndProcess(imageFile) {
    toggleCard(uploadImageCard, uploadImageProcessingCard);
    uploadImage(imageFile).then((json) => {
      imageUrlInput.value = json.image_url;
      postImageWrapper.firstChild.src = json.image_url;
      toggleCard(uploadImageProcessingCard, uploadImageCompleteCard);
    });
  }

  // 関数
  const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append("post[image]", imageFile);
    const parameter = {
      method: "POST",
      body: formData,
    };
    return xfetch("/posts", parameter).then((response) => {
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
    document.body.appendChild(p);
  };

  const toggleCard = (element1, element2) => {
    element1.style.display = "none";
    element2.style.display = "block";
  };
});
