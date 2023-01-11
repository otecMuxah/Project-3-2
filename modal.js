"use strict";
import { emptyCart } from "./cart.js";

export function handleCliks() {
  const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
  const modals = document.querySelectorAll(".modal");
  const modalCloseButtons = document.querySelectorAll(".modal__close");

  modalTriggerButtons.forEach((elem) => {
    elem.addEventListener("click", (event) =>
      toggleModal(event.currentTarget.getAttribute("data-modal-target"))
    );
  });
  modalCloseButtons.forEach((elem) => {
    elem.addEventListener("click", (event) =>
      toggleModal(event.currentTarget.closest(".modal").id)
    );
  });
  modals.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      if (event.currentTarget === event.target)
        toggleModal(event.currentTarget.id);
    });
  });

  document.getElementById("emptycart").addEventListener("click", emptyCart);  
}

export function toggleModal(modalId) {
  const modal = document.getElementById(modalId);

  if (getComputedStyle(modal).display === "flex") {
    modal.classList.add("modal__hide");
    setTimeout(() => {
      document.body.style.overflow = "initial";
      modal.classList.remove("modal__show", "modal__hide");
      modal.style.display = "none";
    }, 200);
  } else {
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal__show");
  }
}
