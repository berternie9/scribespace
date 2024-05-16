document.addEventListener("DOMContentLoaded", function () {
    // Cache DOM element references
    const searchLibraryInput = document.querySelector('.search-library-input');
    
    // Setup event listeners
    searchLibraryInput.addEventListener('keyup', handleSearchLibraryKeyUp);

    // Event handlers
    function handleSearchLibraryKeyUp (event) {
        const searchLibraryValue = event.target.value;
        const publicBooksInLibrary = event.target.closest('.library-wrapper').querySelector('.public-books').children;
        const privateBooksInLibrary = event.target.closest('.library-wrapper').querySelector('.private-books').children;

        if (searchLibraryValue === "") {
            Array.from(publicBooksInLibrary).forEach((book) => book.className = "");
            Array.from(privateBooksInLibrary).forEach((book) => book.className = "");
        }

        Array.from(publicBooksInLibrary).forEach((book) => {
            const title = book.querySelector('.title-text').textContent.toLowerCase();
            const author = book.querySelector('.author-text').textContent.toLowerCase();
            
            if (title.search(searchLibraryValue) < 0 && author.search(searchLibraryValue) < 0) {
                book.className = "hidden";
            } else {
                book.className = "";
            }
        });

        Array.from(privateBooksInLibrary).forEach((book) => {
            const title = book.querySelector('.title-text').textContent.toLowerCase();
            const author = book.querySelector('.author-text').textContent.toLowerCase();
            
            if (title.search(searchLibraryValue) < 0 && author.search(searchLibraryValue) < 0) {
                book.className = "hidden";
            } else {
                book.className = "";
            }
        });
    };
});