document.addEventListener("DOMContentLoaded", function () {
    // Cache DOM element references
    const allVocabWrapper = document.querySelector('.all-vocab-wrapper');

    // Setup event listeners
    allVocabWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains('vocab-info-btn')) {
            handleVocabInfoBtnClick(event);
        }
    });

    // Event handlers
    function handleVocabInfoBtnClick (event) {
        const vocabBlockWrapper = event.target.closest('.vocab-block-wrapper');
        const vocabInfo = vocabBlockWrapper.querySelector('.vocab-info');
        vocabInfo.classList.toggle('hidden');
    };
});