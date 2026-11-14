# M3A1: Recipe Card

**Kind:** demo, built live in the lab. Follow along, type the markup yourself, and push before you leave. Searching, AI and helping each other are all allowed.

In this demo you build a recipe page: an image of the dish, the ingredients, numbered steps, a quoted cooking tip, and characters that need a reference, such as the copyright and degree signs.

## Before you start

Start the activity with the shared-lab launcher, exactly as in M1A0: follow the [setup guide](SETUP.md) to run the Mac launcher in Terminal or the Windows launcher in PowerShell, then clone your private repository `m3a1-CLASSCODE-USERNAME` in VS Code. Check the branch, remote and author before you start. Then install the test tools once:

```sh
npm ci
```

## What you build with the instructor

A recipe page for a Filipino dish in `src/index.html`:

- the HTML5 skeleton and head from week 2, with the dish's name in the title and in the one `h1`;
- a photo of the dish in `src/images/`, shown with `img` and a meaningful `alt`, a `width` and a `height`;
- the ingredients in an unordered list and the steps in an ordered list;
- a cooking tip in a `blockquote`;
- an oven or pan temperature written with `&deg;`, and a footer line written with `&copy;`.

See `content/m3-content-elements/LAB.md` in your workspace for the syntax.

## How it is graded

5 test points. The tests check the skeleton, the image and its alt text, the two lists, the quote and the two character references. If you followed along and your page is complete, you earn full marks.

Every activity also checks `student.json`: fill in your full name, student number, school email, class code **2006**, GitHub username, `room` and `pcNumber`, all as text.

## Check and save your work

Open your page in the browser and look at it in the developer tools' device toolbar at phone size. Then run the checks:

```sh
npm test
```

The tests in your repository are a guide. The instructor grades from the course's own copy of the tests, so do not edit the tests to make them pass. In VS Code, open **Source Control**, commit your files with a short message, choose **Push**, and check that the commit appears on GitHub.

## Submit the exact commit link in Canvas

Open your repository's commit history on GitHub, open the commit with your finished work, copy its full URL (it contains **/commit/**), and submit it in the Canvas assignment for M3A1 using the Website URL option. Submit the commit page, not the repository home page or a screenshot.
