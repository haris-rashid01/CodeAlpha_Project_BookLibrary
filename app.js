const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        available: true,
        borrowedBy: []
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Fiction",
        available: true,
        borrowedBy: []
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        category: "Dystopian",
        available: true,
        borrowedBy: []
    },
    {
        id: 5,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        available: true,
        borrowedBy: []
    },
    {
        id: 6,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        category: "Fantasy",
        available: true,
        borrowedBy: []
    },
    {
        id: 7,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        category: "Fiction",
        available: true,
        borrowedBy: []
    },
    {
        id: 8,
        title: "The Lord of the Rings: The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        available: true,
        borrowedBy: []
    },
    {
        id: 9,
        title: "The Da Vinci Code",
        author: "Dan Brown",
        category: "Mystery/Thriller",
        available: true,
        borrowedBy: []
    }
];

const bookListElement = document.getElementById('bookList');
const bookDetailsElement = document.getElementById('bookDetails');
const searchInput = document.getElementById('searchInput');

function displayBooks(bookArray) {
    bookListElement.innerHTML = '';
    bookArray.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'bookItem';
        bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p><strong>Category:</strong> ${book.category}</p>
            <p class="${book.available ? '' : 'borrowed'}">${book.available ? 'Available' : 'Borrowed'}</p>
        `;
        bookItem.addEventListener('click', () => showBookDetails(book.id));
        bookListElement.appendChild(bookItem);
    });
}

function showBookDetails(bookId) {
    const book = books.find(b => b.id === bookId);
    bookDetailsElement.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Category:</strong> ${book.category}</p>
        <p class="${book.available ? '' : 'borrowed'}">${book.available ? 'Available' : 'Borrowed'}</p>
        ${book.available ? `<button onclick="borrowBook(${book.id})">Borrow this book</button>` : ''}
        <h3>Borrowing History:</h3>
        <ul>
            ${book.borrowedBy.map(user => `<li>${user}</li>`).join('')}
        </ul>
    `;
}

function borrowBook(bookId) {
    const book = books.find(b => b.id === bookId);
    const userName = prompt("Enter your name to borrow this book:");
    if (userName) {
        book.available = false;
        book.borrowedBy.push(userName);
        displayBooks(books);
        showBookDetails(bookId);
    }
}

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
});

displayBooks(books);
