# CS106A Winter 2018 Website

## Making New Announcements
To add announcements to the main page, modify `templates/index.html` to add your
new content.

## Testing Locally
To compile all references and links to test locally, from the root directory run

`python compile.py -t`

This compiles all templates in the templates folder and, preserving directory
structure, creates all HTML and resource files in the root directory.  Then, to
host the compiled site locally, from the root directory run

`python -m SimpleHTTPServer`

This will host the site on `localhost:8000`.

## Compiling/Pushing

To compile all references and links for external hosting, from the root
directory run

`python compile.py`

This compiles all templates in the templates folder and, preserving directory
structure, creates all HTML and resource files in the root directory.

Then, commit and push the changes up to the GitHub repo.  When you're ready to
deploy the changes to the CS106A site, you'll need to pull these changes down
to the repo copy on AFS.  To do this, SSH into myth, and navigate to the class
website directory (`/afs/ir/class/cs106a/WWW`) and run `git pull` to pull down
your new changes.  The updates should be immediately deployed to
cs106a.stanford.edu. (Note that you'll need permissions to access this course
directory).