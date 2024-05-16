document.addEventListener("DOMContentLoaded", function () {
    // Cache DOM element references
    const searchBookshelfInput = document.querySelector('.search-bookshelf-input');
    
    // Setup event listeners
    searchBookshelfInput.addEventListener('keyup', handleSearchBookshelfKeyUp);

    // Event handlers
    function handleSearchBookshelfKeyUp (event) {
        const searchBookshelfValue = event.target.value;
        const booksInBookshelf = event.target.closest('.bookshelf-wrapper').querySelector('.bookshelf-books').children;
        if (searchBookshelfValue === "") {
            Array.from(booksInBookshelf).forEach((book) => book.className = "");
        }
        Array.from(booksInBookshelf).forEach((book) => {
            const title = book.querySelector('.title-text').textContent.toLowerCase();
            const author = book.querySelector('.author-text').textContent.toLowerCase();
            
            if (title.search(searchBookshelfValue) < 0 && author.search(searchBookshelfValue) < 0) {
                book.className = "hidden";
            } else {
                book.className = "";
            }
        });
    };
});