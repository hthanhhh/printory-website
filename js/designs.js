document.addEventListener("DOMContentLoaded", function () {
  // ================= ZOOM FUNCTIONALITY =================
  const tshirtImage = document.querySelector(".design-box img");
  const zoomOutBtn = document.getElementById("zoom-out");
  const zoomInBtn = document.getElementById("zoom-in");
  const zoomLevelSpan = document.getElementById("zoom-level");
  const stickerContainer = document.getElementById("sticker-container");

  // Zoom settings
  let currentZoom = 100;
  const minZoom = 10;
  const maxZoom = 200;
  const zoomStep = 10;

  function updateZoom() {
    tshirtImage.style.transform = `scale(${currentZoom / 100})`;
    zoomLevelSpan.textContent = `${currentZoom}%`;

    zoomOutBtn.disabled = currentZoom <= minZoom;
    zoomInBtn.disabled = currentZoom >= maxZoom;

    zoomOutBtn.style.opacity = zoomOutBtn.disabled ? "0.5" : "1";
    zoomOutBtn.style.cursor = zoomOutBtn.disabled ? "not-allowed" : "pointer";

    zoomInBtn.style.opacity = zoomInBtn.disabled ? "0.5" : "1";
    zoomInBtn.style.cursor = zoomInBtn.disabled ? "not-allowed" : "pointer";
  }

  zoomOutBtn.addEventListener("click", function () {
    if (currentZoom > minZoom) {
      currentZoom -= zoomStep;
      updateZoom();
    }
  });

  zoomInBtn.addEventListener("click", function () {
    if (currentZoom < maxZoom) {
      currentZoom += zoomStep;
      updateZoom();
    }
  });

  // ================= STICKER FUNCTIONALITY =================
  let selectedStickers = [];

  // Lấy tất cả các card sticker
  const stickerCards = document.querySelectorAll(".card");

  // Thêm sự kiện click cho mỗi sticker card
  stickerCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      e.stopPropagation();

      // Lấy thông tin từ sticker
      const imgElement = this.querySelector("img");
      const textElement = this.closest(".item").querySelector(".outside-text");

      if (imgElement && textElement) {
        // Lấy đường dẫn gốc (bỏ phần scale)
        const originalSrc = imgElement.src;
        const stickerAlt = textElement.textContent;

        // Tạo sticker mới trên áo với ảnh gốc
        createStickerOnShirt(originalSrc, stickerAlt);
      }
    });
  });

  // Hàm tạo sticker trên áo với ảnh gốc
  function createStickerOnShirt(src, alt) {
    const stickerId = "sticker-" + Date.now();
    const stickerDiv = document.createElement("div");
    stickerDiv.className = "sticker-on-shirt";
    stickerDiv.id = stickerId;
    stickerDiv.setAttribute("data-alt", alt);

    // Vị trí ngẫu nhiên trên áo (tránh viền)
    const posX = 10 + Math.random() * 70;
    const posY = 10 + Math.random() * 70;

    stickerDiv.style.left = posX + "%";
    stickerDiv.style.top = posY + "%";

    // Tạo hình ảnh sticker với kích thước gốc
    const stickerImg = document.createElement("img");
    stickerImg.src = src;
    stickerImg.alt = alt;

    // Thêm scale và rotation mặc định
    stickerDiv.dataset.scale = "1";
    stickerDiv.dataset.rotation = "0";

    // Tải ảnh để lấy kích thước gốc
    const tempImg = new Image();
    tempImg.onload = function () {
      stickerImg.style.width = Math.min(tempImg.width, 100) + "px";
      stickerImg.style.height = "auto";
    };
    tempImg.src = src;

    // Tạo nút xóa
    const deleteBtn = document.createElement("div");
    deleteBtn.className = "delete-sticker";
    deleteBtn.innerHTML = "×";
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      stickerDiv.remove();
      selectedStickers = selectedStickers.filter((s) => s.id !== stickerId);
    });

    // Thêm drag functionality
    addDragFunctionality(stickerDiv);

    // Thêm scale functionality
    addScaleFunctionality(stickerDiv);

    // Thêm rotate functionality
    addRotateFunctionality(stickerDiv);

    // Thêm vào DOM
    stickerDiv.appendChild(stickerImg);
    stickerDiv.appendChild(deleteBtn);
    stickerContainer.appendChild(stickerDiv);

    // Lưu vào danh sách
    selectedStickers.push({
      id: stickerId,
      src: src,
      alt: alt,
      x: posX,
      y: posY,
    });

    // Thêm hiệu ứng xuất hiện
    stickerDiv.style.opacity = "0";
    stickerDiv.style.transform = "scale(0.8)";
    setTimeout(() => {
      stickerDiv.style.transition = "opacity 0.3s, transform 0.3s";
      stickerDiv.style.opacity = "1";
      stickerDiv.style.transform = "scale(1)";
    }, 10);
  }

  // Hàm thêm chức năng kéo thả cho sticker
  function addDragFunctionality(stickerElement) {
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    stickerElement.addEventListener("mousedown", startDrag);

    function startDrag(e) {
      if (
        e.target.classList.contains("delete-sticker") ||
        e.target.classList.contains("scale-handle") ||
        e.target.classList.contains("rotate-handle")
      ) {
        return;
      }

      e.preventDefault();
      isDragging = true;
      stickerElement.classList.add("dragging");

      const rect = stickerElement.getBoundingClientRect();

      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;

      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", stopDrag);
    }

    function onDrag(e) {
      if (!isDragging) return;

      const containerRect = stickerContainer.getBoundingClientRect();
      const x = e.clientX - containerRect.left - dragOffsetX;
      const y = e.clientY - containerRect.top - dragOffsetY;

      // Giới hạn trong container
      const maxX = containerRect.width - stickerElement.offsetWidth;
      const maxY = containerRect.height - stickerElement.offsetHeight;

      const clampedX = Math.max(0, Math.min(x, maxX));
      const clampedY = Math.max(0, Math.min(y, maxY));

      stickerElement.style.left = (clampedX / containerRect.width) * 100 + "%";
      stickerElement.style.top = (clampedY / containerRect.height) * 100 + "%";
    }

    function stopDrag() {
      isDragging = false;
      stickerElement.classList.remove("dragging");
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
    }
  }

  // ================= STICKER SCALE FUNCTIONALITY =================
  function addScaleFunctionality(stickerElement) {
    let isScaling = false;
    let startDistance = 0;
    let startScale = 1;
    let scaleHandle = null;

    // Tạo nút scale
    function createScaleHandle() {
      scaleHandle = document.createElement("div");
      scaleHandle.className = "scale-handle";
      scaleHandle.innerHTML = "↔";
      scaleHandle.style.display = "none";

      stickerElement.appendChild(scaleHandle);

      // Hiện/ẩn nút scale
      stickerElement.addEventListener("mouseenter", () => {
        scaleHandle.style.display = "flex";
      });

      stickerElement.addEventListener("mouseleave", () => {
        if (!isScaling) scaleHandle.style.display = "none";
      });
    }

    // Khởi tạo nút scale
    createScaleHandle();

    // Bắt đầu scale bằng chuột
    if (scaleHandle) {
      scaleHandle.addEventListener("mousedown", startScaleMouse);
    }

    function startScaleMouse(e) {
      e.preventDefault();
      e.stopPropagation();
      isScaling = true;

      const currentScale = parseFloat(stickerElement.dataset.scale || 1);
      startScale = currentScale;

      document.addEventListener("mousemove", scaleMouse);
      document.addEventListener("mouseup", stopScaleMouse);
    }

    function scaleMouse(e) {
      if (!isScaling) return;

      const rect = stickerElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Tính khoảng cách từ tâm đến chuột
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Tính scale mới (từ 0.3 đến 3)
      const baseDistance = 50;
      const newScale = Math.max(
        0.3,
        Math.min(3, startScale * (distance / baseDistance))
      );

      // Áp dụng scale
      stickerElement.dataset.scale = newScale;
      const img = stickerElement.querySelector("img");
      if (img) {
        const rotation = stickerElement.dataset.rotation || 0;
        img.style.transform = `rotate(${rotation}deg) scale(${newScale})`;
      }
    }

    function stopScaleMouse() {
      isScaling = false;
      document.removeEventListener("mousemove", scaleMouse);
      document.removeEventListener("mouseup", stopScaleMouse);
    }
  }

  // ================= STICKER ROTATE FUNCTIONALITY =================
  function addRotateFunctionality(stickerElement) {
    let isRotating = false;
    let startAngle = 0;
    let currentRotation = 0;
    let rotateHandle = null;

    // Tạo nút xoay
    function createRotateHandle() {
      rotateHandle = document.createElement("div");
      rotateHandle.className = "rotate-handle";
      rotateHandle.innerHTML = "↻";
      rotateHandle.style.display = "none";

      stickerElement.appendChild(rotateHandle);

      // Hiện/ẩn nút xoay
      stickerElement.addEventListener("mouseenter", () => {
        rotateHandle.style.display = "flex";
      });

      stickerElement.addEventListener("mouseleave", () => {
        if (!isRotating) rotateHandle.style.display = "none";
      });
    }

    // Khởi tạo nút xoay
    createRotateHandle();

    // Bắt đầu xoay bằng chuột
    if (rotateHandle) {
      rotateHandle.addEventListener("mousedown", startRotateMouse);
    }

    function startRotateMouse(e) {
      e.preventDefault();
      e.stopPropagation();
      isRotating = true;

      // Lấy góc xoay hiện tại
      currentRotation = parseFloat(stickerElement.dataset.rotation || 0);

      // Tính góc ban đầu
      const rect = stickerElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      startAngle =
        Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

      document.addEventListener("mousemove", rotateMouse);
      document.addEventListener("mouseup", stopRotateMouse);
    }

    function rotateMouse(e) {
      if (!isRotating) return;

      const rect = stickerElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Tính góc mới
      const newAngle =
        Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      const angleDiff = newAngle - startAngle;

      // Cập nhật góc xoay
      currentRotation += angleDiff;
      currentRotation = currentRotation % 360;
      if (currentRotation < 0) currentRotation += 360;

      // Áp dụng xoay
      stickerElement.dataset.rotation = currentRotation;
      const img = stickerElement.querySelector("img");
      if (img) {
        const scale = stickerElement.dataset.scale || 1;
        img.style.transform = `rotate(${currentRotation}deg) scale(${scale})`;
      }

      // Cập nhật góc bắt đầu
      startAngle = newAngle;
    }

    function stopRotateMouse() {
      isRotating = false;
      document.removeEventListener("mousemove", rotateMouse);
      document.removeEventListener("mouseup", stopRotateMouse);
    }
  }

  // Khởi tạo zoom
  updateZoom();

  // Thêm sự kiện cho nút search
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", function () {
      searchInput.focus();
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        alert("Tìm kiếm: " + this.value);
        this.value = "";
      }
    });
  }
});
