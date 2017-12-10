# MyReads App

A book tracking application that allows you to select and categorize books you have read, are currently reading or want to read.

Demo: https://upbeat-almeida-3e5588.netlify.com/

This is the first project in [Udacity's React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019) concluding the "React Fundamentals" portion of the program.

This application was bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app). Note, while this application is implemented using React, it is purposely not using Redux, as this is a pre-Redux project, i.e. assigned prior to the Redux section of the program.

## Specification

The main page of the application displays a "Bookcase" with three "bookshelves" (i.e. categories) each containing a number of books. The bookshelves are:

* Currently Reading
* Want to Read
* Read

Each book has a control that lets you select the shelf to place that book on. When you select a different shelf, the book moves to that shelf. The default value for the bookshelf control shall be the current shelf the book is on.

The main page has a link to a search page that allows you to find more books to add to your Bookcase.

The search page has a text input that is used to enter a search query string. As the value of the text input changes, the books that match the search query are displayed on the page. Each book displayed has a control that lets you add the book to your Bookcase on the bookshelf you choose.

When a book is on a bookshelf, it should have the same state on both the main page and the search page.

The search page also has a link back to the main page. When you navigate back to the main page from the search page, you should see all of the book selections you made on the search page in your Bookcase.

## Usage

```bash
$ git clone https://github.com/randie/myreads-app.git
$ cd myreads-app
$ npm install
$ npm start
```

In your browser, navigate to localhost:3000
