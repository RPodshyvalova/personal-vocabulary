Personal Vocabulary
Tech task
1. User registration. User can register oneself. Every user data field in form passes validation.
login - required field, min 6 symbols...
name - required, min - 6 symbols
password - required, min - 6 symbols, max - 15
email
login and email fields must be unique data
After that user can login. Every user has access to his/her personal and to the common
vocabulary.
2. User can create word card and form his personal vocabulary. Word card contains information
about the word, transcription, translation, association, phrase and a picture of this word. User
can mark the word as 'learned' and share it to the common vocabulary.
Words are sorted in vocabulary according to rule - first input last output.
At a time user can get 100 words on the page, and can move by the vocabulary using
pagination.
3. The user get a notification list of words. Words, that were marked as 'learned' by user and
must be repeated. Notification is sent on the same day when user marked the word like 'learned'
and on the next day, after a week, after a month, after a quarter of the year, after a half of the
year, after the year.
4. The user can search a word in the vocabulary. Our user can choose parameters of search -
can type the word for search in English or in Russian and can choose in which vocabulary -
personal or common or both the search will be occured.
5. The user can mark personal vocabulary words like 'shared' and make them available for other
users. But the shared word must be checked by admin before it become available for other
users.
6. If the user hasn't visited the site and has missed the time to check learning words, the list of
words will be sent to user email10. Words can be filtered by parameters 'learned' and 'theme' and sorted by alphabet.

Executors
Back-end: Volodya Bezpalchuk, Olya Bezpalchuk
Front-end: Ruslana Podshyvalova

Hope to do
1)make modules word.module.ts and vocabulary.module
2)colorize elements html in pagination component do like an  element's style
3)colorize elements html in navigation component, do like an element's style
4)validation do like separate component