![cf](https://i.imgur.com/7v5ASc8.png) Lab 27: Forms and Props
======

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork
* Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
* Open a pull request to this repository
* Submit on canvas a question and observation, how long you spent, and a link to your pull request

## Configuration
Configure the root of your repository with the following files and directories. Thoughtfully name and organize any additional configuration or module files.
* **README.md** - contains documentation
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file
* **.eslintrc.json** - contains the course linter configuration
* **.eslintignore** - contains the course linter ignore configuration
* **.babelrc** - contains babel config
* **package.json** - contains npm package config
* **webpack.config.js** - contains webpack config
* **src/** - contains the frontend code
* **src/main.js** - contains the entire app
* **src/style** - containing your `.scss` partials and styles
* **src/style/main.scss** - contains the entry point for `.scss` partials

## Feature Tasks
##### Minimum Requirements
Create the following components:

```html
<App />
  <SearchForm />
  <SearchResultList />
``` 
##### `<App />`
  * should contain all of the **application state** 
  * should contain methods for modifying the application state
  * the state should contain a `topics` array for holding the results of the search

##### `<SearchForm />`
  * should contain a text input for the user to supply a reddit board to look up
  * should contain a number input for the user to limit the number of results to return 
    * the number must be more than 0 and less than 100
  * `onSubmit` the form should make a request to reddit 
    * it should make a get request to `http://reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`
    * on success it should pass the results to the application state
    * on failure it should add a class to the form called error and turn the form's inputs borders red

##### `<SearchResultList />`
  * should inherit all search results through props
  * this component *does not* need to have its own state
  * if there are topics in the application state it should display an `<ul>`
* each `<li>` in the `<ul>` should contain:
  * an `<a>` tag with an `href` that points to the `topic.url` 
    * inside the `<a>` - a heading tag with the `topic.title`
    * inside the `<a>` - a `<p>` tag with the number of `topic.ups`