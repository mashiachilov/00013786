const deleteBtn = document.querySelector(".delete");
const modalDelete = document.querySelector(".modal_delete");
const rejectDelete = document.querySelector(".reject_delete");

deleteBtn.addEventListener("click", () => {
  modalDelete.style.display = "flex";
});

rejectDelete.addEventListener("click", () => {
  modalDelete.style.display = "none";
});
