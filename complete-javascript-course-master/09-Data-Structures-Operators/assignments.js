const books = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: [
      'computer science',
      'programming',
      'algorithms',
      'data structures',
      'java',
      'math',
      'software',
      'engineering',
    ],
    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: [
      'Harold Abelson',
      'Gerald Jay Sussman',
      'Julie Sussman (Contributor)',
    ],
    publisher: 'The MIT Press',
    publicationDate: '2022-04-12',
    edition: 2,
    keywords: [
      'computer science',
      'programming',
      'javascript',
      'software',
      'engineering',
    ],
    pages: 640,
    format: 'paperback',
    ISBN: '9780262543231',
    language: 'English',
    programmingLanguage: 'JavaScript',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0,
      },
    },
    highlighted: true,
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: ['Randal E. Bryant', "David Richard O'Hallaron"],
    publisher: 'Prentice Hall',
    publicationDate: '2002-01-01',
    edition: 1,
    keywords: [
      'computer science',
      'computer systems',
      'programming',
      'software',
      'C',
      'engineering',
    ],
    pages: 978,
    format: 'hardcover',
    ISBN: '9780130340740',
    language: 'English',
    programmingLanguage: 'C',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16,
      },
    },
    highlighted: true,
  },
  {
    title: 'Operating System Concepts',
    author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    publisher: 'John Wiley & Sons',
    publicationDate: '2004-12-14',
    edition: 10,
    keywords: [
      'computer science',
      'operating systems',
      'programming',
      'software',
      'C',
      'Java',
      'engineering',
    ],
    pages: 921,
    format: 'hardcover',
    ISBN: '9780471694663',
    language: 'English',
    programmingLanguage: 'C, Java',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65,
      },
    },
  },
  {
    title: 'Engineering Mathematics',
    author: ['K.A. Stroud', 'Dexter J. Booth'],
    publisher: 'Palgrave',
    publicationDate: '2007-01-01',
    edition: 14,
    keywords: ['mathematics', 'engineering'],
    pages: 1288,
    format: 'paperback',
    ISBN: '9781403942463',
    language: 'English',
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6,
      },
    },
    highlighted: true,
  },
  {
    title: 'The Personal MBA: Master the Art of Business',
    author: 'Josh Kaufman',
    publisher: 'Portfolio',
    publicationDate: '2010-12-30',
    keywords: ['business'],
    pages: 416,
    format: 'hardcover',
    ISBN: '9781591843528',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090,
      },
    },
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    publisher: 'Genever Benning',
    publicationDate: '2021-07-28',
    keywords: [
      'computer science',
      'compilers',
      'engineering',
      'interpreters',
      'software',
      'engineering',
    ],
    pages: 865,
    format: 'paperback',
    ISBN: '9780990582939',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0,
      },
    },
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    publisher: 'Grand Central Publishing',
    publicationDate: '2016-01-05',
    edition: 1,
    keywords: ['work', 'focus', 'personal development', 'business'],
    pages: 296,
    format: 'hardcover',
    ISBN: '9781455586691',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808,
      },
    },
    highlighted: true,
  },
];

// === DESTRUCTING ARRAYS ===

const [firstBook, secondBook] = books;

const [, , thirdBook] = books;

const ratings = [
  ['rating', 4.19],
  ['ratingsCount', 144584],
];

const [[, rating], [, ratingsCount]] = ratings;

console.log(rating, ratingsCount);

const ratingStars = [63405, 1808];

const [fiveStarRatings, oneStarRatings, threeStarRatings = 0] = ratingStars;
console.log({ fiveStarRatings, oneStarRatings, threeStarRatings });

// === DESTRUCTING OBJECTS ===

const { title, author, ISBN } = books[0];

const { keywords: tags } = books[0];

const { language, programmingLanguage = 'unknown' } = books[6];

let bookTitle = 'unknown';
let bookAuthor = 'unknown';

({ title: bookTitle, author: bookAuthor } = books[0]);

const {
  thirdParty: {
    goodreads: { rating: bookRating },
  },
} = books[0];

const printBookInfo = ({ title, author, year = 'year unknown' }) => {
  console.log(`${title} by ${author}, ${year}`);
};

printBookInfo({
  title: 'Algorithms',
  author: 'Robert Sedgewick',
  year: '2011',
});

// === SPREAD OPERATOR ===

const bookAuthors = [...books[0].author, ...books[1].author];

const spellWord = str => console.log(...str);
spellWord('JavaScript');

// === REST PATTERN AND PARAMETERS ===
const [mainKeyword, ...rest] = books[0].keywords;
const { publisher: bookPublisher, ...restOfTheBook } = books[1];

const printBookAuthorsCount = (title, ...authors) => {
  console.log(`The book ${title} has ${authors.length} authors.`);
};

printBookAuthorsCount('Algorithms', 'Robert Sedgewick', 'Kevin Wayne');

// Short Circuiting (&& and ||)

const hasExamplesInJava = book => {
  return book.programmingLanguage === 'Java' || 'no data available';
};

hasExamplesInJava(books[0]);
hasExamplesInJava(books[1]);

for (let i = 0; i < books.length; i++) {
  books[i].onlineContent &&
    console.log(`${books[i].title} provides online content`);
}

// The Nullish Coalescing Operator (??)
for (let i = 0; i < books.length; i++) {
  books[i].onlineContent ??
    console.log(`${books[i].title} provides no data about its online content`);
}

// Logical Assignments Operators
for (let i = 0; i < books.length; i++) {
  books[i].edition ||= 1;
}

for (let i = 0; i < books.length; i++) {
  books[i].highlighted &&= !(books[i].thirdParty.goodreads.rating < 4.2);
}

// Looping Arrays: The for-of Loop
let pageSum = 0;

for (const book of books) {
  pageSum += book.pages;
}

const allAuthors = [];

for (const book of books) {
  if (typeof book.author === 'string') {
    allAuthors.push(book.author);
  } else {
    allAuthors.push(...book.author);
  }
}

for (const authorEntry of allAuthors.entries()) {
  console.log(`${authorEntry[0] + 1} ${authorEntry[1]}`);
}

for (const [idx, authorName] of allAuthors.entries()) {
  console.log(`${idx + 1} ${authorName}`);
}

// Enhanced Object Literals
const bookData = [
  ['title', 'Computer Networking: A Top-Down Approach'],
  ['author', ['James F. Kurose', 'Keith W. Ross']],
  ['publisher', 'Addison Wesley'],
];

// Do the rest
const newBook = {
  [bookData[0][0]]: bookData[0][1],
  [bookData[1][0]]: bookData[1][1],
  [bookData[2][0]]: bookData[2][1],
};

const pages = 880;

// Add pages to new book 2 the modern way
const newBook2 = {
  title: 'The C Programming Language',
  author: ['Brian W. Kernighan', 'Dennis M. Ritchie'],
  pages,
};

// Optional Chaining (?.)
const getFirstKeyword = book => {
  return book.keywords?.[0];
};

getFirstKeyword(books[0]);

// Looping Objects: Object Keys, Values and Entries
const entries = [];

for (const key of Object.keys(books[0].thirdParty.goodreads)) {
  entries.push([key]);
}

console.log(Object.entries(books[0].thirdParty.goodreads));

// for(Object.values((books[0].thirdParty.goodreads))
for (const [index, value] of Object.values(
  books[0].thirdParty.goodreads,
).entries()) {
  entries[index].push(value);
}

const entries2 = Object.entries(books[0].thirdParty.goodreads);
console.log({ entries });
console.log({ entries2 });

// ====== Sets ======

// Get all keywords
const allKeywords = [];

for (const book of books) {
  allKeywords.push(...book.keywords);
}
console.log({ allKeywords });

// Get only unique keywords
const uniqueKeywords = new Set(allKeywords);
console.log(uniqueKeywords);

// Add two words to the set
uniqueKeywords.add('coding');
uniqueKeywords.add('science');

// Delete 'business' from the uniqueKeywords set.
uniqueKeywords.delete('business');

// Create an array out of the uniqueKeywords set, and assign it to the uniqueKeywordsArr variable.
const uniqueKeywordsArr = [...uniqueKeywords];

console.log({ uniqueKeywordsArr });
// Delete all items from the uniqueKeywords set.
uniqueKeywords.clear();

// ====== Maps =======
// Create a new book, but this time, as a Map. Assign it to the bookMap variable. Use this array as initial data:
const bookMap = new Map([
  ['title', 'Clean Code'],
  ['author', 'Robert C. Martin'],
]);

// Set a new key in bookMap called pages, and assign it with a number 464.
bookMap.set('pages', 464);

// Get the title and author values from bookMap, and log to the console a string formatted like that: "${title} by ${author}".
console.log(`${bookMap.get('title')} by ${bookMap.get('author')}`);

// Get the size of bookMap, and log it to the console.
console.log(bookMap.size);

// Check if bookMap has the author key. and if so, log "The author of the book is known" to the console.
if (bookMap.has('author')) console.log('The authour of the book is known.');

// ======= Maps: Iteration ======

//Convert the first book object from the books array into a Map, and assign it to a firstBookMap variable.
const firstBookMap = new Map(Object.entries(books[0]));

// Use the for-of loop to iterate over firstBookMap, and log to the console keys that have numbers as values.

for (const [key, value] of firstBookMap) {
  if (typeof value === 'number') console.log(key);
}

// ====  Working with Strings - Part 1 ====
// Take the ISBN property of the first book from the books array, and log to the console characters at index 6, 4, 9 and 8. Use bracket notation to access individual characters.
console.log(
  books[0].ISBN[6],
  books[0].ISBN[4],
  books[0].ISBN[9],
  books[0].ISBN[8],
);

// Below is the quote variable that stores a string. Find the index of the word 'chess', and log it to the console.
const quote = 'A computer once beat me at chess, but it was no match for me at kick boxing';
console.log(quote.indexOf('chess'))

// Extract the word "boxing" from the same quote string, and log it to the console.
console.log(quote.slice(quote.lastIndexOf(' ') + 1))

/*
Some authors are noted as "(Contributor)", for example "Julie Sussman (Contributor)".
Create a function called isContributor that takes an author's name as an argument,
and returns either true (if he's a contributor) of false (if he's not a contributor).
The string "(Contributor)" is always the last part of the author's name string.
*/

const isContributor = (author) => {
  //return author.slice(author.lastIndexOf(' ') + 1).includes('Contributor')
  return author.lastIndexOf('(Contributor)') !== -1
}

console.log(isContributor('Julie Sussman (Contributor)'))
console.log(isContributor('Robert Sedgewick'))
// ====  Working with Strings - Part 2 ====

/*
Write a function called normalizeAuthorName that takes an author's name (string) as an argument,
and returns the same string, but the first name and last name are capitalized,
and the "(Contributor)" part is removed (if exists).

You can be sure that the author's name always consists of two words separated by a space,
and possibly ends with "(Contributor)".
The string may also contain trailing spaces.
*/

const normalizeAuthorName = (author) => {
  const [firstName, secondName, _] = author.trim().toLowerCase().split(' ')

  const normalizeName = (name) => `${name[0].toUpperCase()}${name.slice(1)}`
  return `${normalizeName(firstName)} ${normalizeName(secondName)}`
}

console.log(normalizeAuthorName('  JuliE sussMan (Contributor)'))
console.log(normalizeAuthorName('  JuliE sussMan '))

// Take the title of the second book (books[1]) from the books array, and replace the word "Programs" with "Software". 
// Assign the new string to the newBookTitle variable.
const newBookTitle = books[1].title.replace('Programs', 'Software')


/*
Write a function called logBookTheme that takes book's title (string), and logs to the console:

"This book is about computers" if the title starts with the word "computer",

"This book is about algorithms and data structures" if the title includes both the "algorithms" and "structures" words,

and, "This book is about some systems, but definitely not about operating systems" if the title ends with the word "system" or "systems", but doesn't include the word "operating".
*/

const logBookTheme = (title) => {
  const lowerCaseTitle = title.toLowerCase()

  if(lowerCaseTitle.startsWith('computer')){
    console.log("This book is about computers")
  }else if(lowerCaseTitle.includes("algorithms") && lowerCaseTitle.includes("structures")){
    console.log("This book is about algorithms and data structures")
  }else if((lowerCaseTitle.endsWith("system") || lowerCaseTitle.endsWith("systems")) && !lowerCaseTitle.includes('operating')){
    console.log("This book is about some systems, but definitely not about operating systems")
  }
}
// ====  Working with Strings - Part 3 ====

/*
Below is the bookCategories variable that stores a string of categories. Each category is separated with a semicolon, for example, in a string "science;computing", 'science' and 'computing' are separate categories.

Write a function called logBookCategories that takes a string of categories separated with semicolons, and logs each category to the console (as separate strings).
*/

const bookCategories = 'science;computing;computer science;algorithms;business;operating systems;networking;electronics';

const logBookCategories = (categories) => {
  const separated = categories.split(';')
  for(s of separated){
    console.log(s)
  }
}

logBookCategories(bookCategories);

/*
Now, the opposite. Each book from the books array has the keywords property.

Write a function called getKeywordsAsString that takes the books array as an argument, collects keywords from each book, removes duplicates, and then joins them to create a single string where keywords are separated by a semicolon.
*/

const getKeywordsAsString = (booksArr) => {
  const keywords = []
  for(const book of booksArr){
    keywords.push(...book.keywords)
  }

  const keywordsSet = [...new Set(keywords)]
  const keywordsString = keywordsSet.join(';')
  return keywordsString
}

console.log(getKeywordsAsString(books))

/*
Below is the bookChapters array that contains inner arrays. Each inner array consists of a chapter's title, and the number of a page, for example, in ['The Basics', 14], 'The Basics' is the chapter's title, and 14 is the number of a page.

Write a function called logBookChapters that takes an array of arrays (like bookChapters) as an argument, and logs each chapter's name to the console together with the page number. The page number should be separated from the chapter's name with underscores (take a look at the example below).

Use the padEnd method.
*/

const bookChapters = [['The Basics', 14], ['Sorting', 254], ['Searching', 372], ['Graphs', 526], ['Strings', 706]];

const logBookChapters = (bookChaptersArr) => {
  for(const [title, pages] of bookChaptersArr){
    console.log(title.padEnd(20,'_') + pages)
  }
}
logBookChapters(bookChapters);