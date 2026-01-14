const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function handleSearch() {
  const keyword = searchInput.value.trim();
  if (!keyword) {
    alert("Bạn chưa nhập từ khóa tìm kiếm!");
  } else {
    alert("Đang tìm: " + keyword);
  }
}

if (searchBtn) searchBtn.addEventListener("click", handleSearch);

if (searchInput) {
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });
}

// Animation reveal
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  reveals.forEach((el) => observer.observe(el));
});
