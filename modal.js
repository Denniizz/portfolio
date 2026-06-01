export function setupModal(cardId, modalId, closeBtnId) {

    const card = document.getElementById(cardId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeBtnId);

    if (!card || !modal || !closeBtn) 
    {
        console.warn("Missing element in setupModal:", {
            cardId,
            modalId,
            closeBtnId
        });
        return;
    }

    // Open modal
    card.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Close button
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Click outside modal content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}