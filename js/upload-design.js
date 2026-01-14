document.addEventListener("DOMContentLoaded", () => {
  const imageUpload = document.getElementById("imageUpload");
  const uploadArea = document.getElementById("uploadArea");
  const uploadPreview = document.getElementById("uploadPreview");
  const overlay = document.getElementById("userDesignOverlay");

  const textInput = document.getElementById("textInput");
  const fontSelect = document.getElementById("fontSelect");
  const textColor = document.getElementById("textColor");
  const textSize = document.getElementById("textSize");
  const sizeValue = document.getElementById("sizeValue");
  const addTextBtn = document.getElementById("addTextBtn");
  const resetBtn = document.getElementById("resetPreview");
  const backBtn = document.getElementById("backBtn");
  const saveBtn = document.getElementById("saveDesign");

  /* ================= UPLOAD IMAGE ================= */

  uploadArea.onclick = () => imageUpload.click();

  imageUpload.onchange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      overlay.innerHTML = "";

      const box = createBox(200, 200);
      const img = document.createElement("img");
      img.src = reader.result;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.style.pointerEvents = "none";

      box.appendChild(img);
      overlay.appendChild(box);

      uploadPreview.innerHTML = `<img src="${reader.result}" style="max-width:120px">`;
    };
    reader.readAsDataURL(file);
  };

  /* ================= ADD TEXT ================= */

  textSize.oninput = () => (sizeValue.innerText = textSize.value + "px");

  addTextBtn.onclick = () => {
    if (!textInput.value.trim()) return;

    const box = createBox(200, 60);

    const text = document.createElement("div");
    text.innerText = textInput.value;
    text.style.fontFamily = fontSelect.value;
    text.style.color = textColor.value;
    text.style.fontSize = textSize.value + "px";
    text.style.fontWeight = "bold";
    text.style.whiteSpace = "nowrap";
    text.style.pointerEvents = "none";

    box.appendChild(text);
    overlay.appendChild(box);
  };

  /* ================= BACK BUTTON ================= */

  backBtn.onclick = () => {
    window.history.back();
  };

  /* ================= SAVE DESIGN & GO TO PREVIEW ================= */

  saveBtn.onclick = () => {
    if (overlay.children.length === 0) {
      alert("Vui lòng thêm ít nhất một thiết kế trước khi lưu!");
      return;
    }

    // Thu thập tất cả thiết kế
    const design = {
      images: [],
      texts: [],
    };

    Array.from(overlay.children).forEach((element) => {
      const img = element.querySelector("img");
      const txt = element.querySelector("div");

      if (img) {
        design.images.push({
          src: img.src,
          left: element.style.left,
          top: element.style.top,
          width: element.style.width,
          height: element.style.height,
          transform: element.style.transform,
        });
      }

      if (txt && !img) {
        design.texts.push({
          content: txt.innerText,
          fontFamily: txt.style.fontFamily,
          color: txt.style.color,
          fontSize: txt.style.fontSize,
          fontWeight: txt.style.fontWeight,
          left: element.style.left,
          top: element.style.top,
          width: element.style.width,
          height: element.style.height,
          transform: element.style.transform,
        });
      }
    });

    // Lưu vào localStorage
    localStorage.setItem("currentDesign", JSON.stringify(design));

    // Chuyển sang trang preview
    window.location.href = "preview.html";
  };

  /* ================= RESET / DELETE DESIGN ================= */

  resetBtn.onclick = () => {
    if (overlay.children.length > 0) {
      if (confirm("Bạn có chắc muốn xóa tất cả thiết kế?")) {
        overlay.innerHTML = "";
        uploadPreview.innerHTML = "";
        imageUpload.value = "";
        textInput.value = "";
      }
    } else {
      alert("Chưa có thiết kế nào để xóa!");
    }
  };

  /* ================= CORE: DRAG + RESIZE ================= */

  function createBox(w, h) {
    const box = document.createElement("div");
    box.className = "draggable-element";
    box.style.position = "absolute";
    box.style.left = "50%";
    box.style.top = "50%";
    box.style.transform = "translate(-50%, -50%)";
    box.style.width = w + "px";
    box.style.height = h + "px";
    box.style.cursor = "move";
    box.style.border = "2px dashed rgba(250, 133, 1, 0.5)";
    box.style.transition = "border 0.2s ease";
    box.style.pointerEvents = "auto";
    box.style.zIndex = "10";

    // Highlight khi hover
    box.onmouseenter = () => {
      box.style.border = "2px dashed rgba(250, 133, 1, 1)";
      deleteBtn.style.opacity = "1";
    };
    box.onmouseleave = () => {
      box.style.border = "2px dashed rgba(250, 133, 1, 0.5)";
      deleteBtn.style.opacity = "0";
    };

    // Nút xóa (X)
    const deleteBtn = document.createElement("div");
    deleteBtn.innerHTML = "×";
    deleteBtn.style.position = "absolute";
    deleteBtn.style.top = "-12px";
    deleteBtn.style.right = "-12px";
    deleteBtn.style.width = "24px";
    deleteBtn.style.height = "24px";
    deleteBtn.style.backgroundColor = "#ff4444";
    deleteBtn.style.color = "white";
    deleteBtn.style.borderRadius = "50%";
    deleteBtn.style.display = "flex";
    deleteBtn.style.alignItems = "center";
    deleteBtn.style.justifyContent = "center";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.fontSize = "20px";
    deleteBtn.style.fontWeight = "bold";
    deleteBtn.style.pointerEvents = "auto";
    deleteBtn.style.zIndex = "1000";
    deleteBtn.style.opacity = "0";
    deleteBtn.style.transition = "all 0.2s ease";
    deleteBtn.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";

    deleteBtn.onmouseenter = () => {
      deleteBtn.style.backgroundColor = "#cc0000";
      deleteBtn.style.transform = "scale(1.1)";
    };
    deleteBtn.onmouseleave = () => {
      deleteBtn.style.backgroundColor = "#ff4444";
      deleteBtn.style.transform = "scale(1)";
    };

    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      box.remove();
    };

    // Resize handle
    const resize = document.createElement("div");
    resize.className = "resize-handle";
    resize.style.pointerEvents = "auto";
    resize.style.zIndex = "999";

    box.appendChild(deleteBtn);
    box.appendChild(resize);

    enableDrag(box);
    enableResize(box, resize);

    return box;
  }

  function enableDrag(el) {
    let isDown = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    el.addEventListener("mousedown", (e) => {
      // Bỏ qua nếu click vào resize handle hoặc delete button
      if (
        e.target.classList.contains("resize-handle") ||
        e.target.innerHTML === "×"
      )
        return;
      e.preventDefault();
      e.stopPropagation();

      isDown = true;
      startX = e.clientX;
      startY = e.clientY;

      // Lấy vị trí hiện tại
      const rect = el.getBoundingClientRect();
      const parentRect = overlay.getBoundingClientRect();
      initialLeft = rect.left - parentRect.left;
      initialTop = rect.top - parentRect.top;

      el.style.transform = "none";
      el.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const newLeft = initialLeft + deltaX;
      const newTop = initialTop + deltaY;

      // Giới hạn trong container
      const containerRect = overlay.getBoundingClientRect();
      const maxLeft = containerRect.width - el.offsetWidth;
      const maxTop = containerRect.height - el.offsetHeight;

      el.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + "px";
      el.style.top = Math.max(0, Math.min(newTop, maxTop)) + "px";
    });

    document.addEventListener("mouseup", () => {
      if (isDown) {
        isDown = false;
        el.style.cursor = "move";
      }
    });
  }

  function enableResize(el, handle) {
    let isResizing = false;

    handle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();

      isResizing = true;

      let startX = e.clientX;
      let startY = e.clientY;
      let startW = el.offsetWidth;
      let startH = el.offsetHeight;

      const onMouseMove = (ev) => {
        if (!isResizing) return;
        ev.preventDefault();

        const deltaX = ev.clientX - startX;
        const deltaY = ev.clientY - startY;

        // Tính toán kích thước mới
        const newWidth = Math.max(50, startW + deltaX);
        const newHeight = Math.max(30, startH + deltaY);

        el.style.width = newWidth + "px";
        el.style.height = newHeight + "px";
      };

      const onMouseUp = () => {
        isResizing = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        handle.style.transform = "scale(1)";
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      // Visual feedback
      handle.style.transform = "scale(1.3)";
    });
  }
});
