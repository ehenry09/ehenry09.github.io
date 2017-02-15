---
title: "Building a Website with R Markdown"
date: "February 14, 2017"
layout: post
comments: yes
---



When I first started building a [website](http://www.elliothenry.com/), I decided to use [Wix](http://www.wix.com/). It's a great website builder and has lots of custom options -- it is kind of like the PowerPoint of website editing. My one issue with Wix is that I wanted to embed some code into the pages. I was already familiar with R Markdown, being able to publish R Markdown documents would be ideal.

## Jekyll & Markdown

After searching the internet, I discovered [Jekyll](https://jekyllrb.com/). Jekyll will produce static sites from Markdown files and [GitHub](https://github.com/) will host your Jekyll site for free. [Installation](https://jekyllrb.com/docs/installation/) of Jekyll was simple and and efficient, so I won't cover it here.

Once Jekyll was installed, I forked [Jekyll Now](https://github.com/barryclark/jekyll-now) from GitHub to setup a basic website. Make sure to rename the repository to yourgithubusername.github.io since this will be your site's custom URL. You can then edit some of the features in the _config.yml file to add personalization to the site. I also linked [Google Analytics](https://www.google.com/analytics/) and [Disqus](https://disqus.com/) to the site so people like you can comment. There are also a myriad of free Jekyll [Themes](http://jekyll.tips/templates/). Since I originally used Wix to develop my site (and signed up for a yearly subscription, doh!), I did not add any custom template. Maybe once my subscription lapses, I will get around to this. For now, I link my [ehenry09.github.io](https://ehenry09.github.io/) pages to my Wix [site](http://www.elliothenry.com/).

## R Markdown

Using Jekyll gets us one step closer to being able to publish R Markdown files. The missing link is converting the R Markdown files to Markdown, which in turn will allow Jekyll to publish them to your GitHub site. The best solution I found was developed by [Nicole White](https://nicolewhite.github.io/2015/02/07/r-blogging-with-rmarkdown-knitr-jekyll.html). I'll walk through her process, but please give her all the credit. 

First, in your root directory, create a mew folder called *_drafts*. Create a new R Markdown file (your your first post!) and save it in the *_drafts* folder. Make sure that you save the R Markdown file using standard Jekyll nomenclature, lowercase text separated by hyphens.

At the top of your new R Markdown file, delete *output: html_document* (or whatever output is specified) and add *layout: post*. If your post includes images, you will also need to add this chunk below as the first chunk in your post. Make sure to change *name-of-your-post-* below to whatever you saved your first post as. 

Note: In order for the following code to work, you also need to have the URL (yourgithubusername.github.io) specified in the *_config.yml* file.


```r
knitr::opts_chunk$set(fig.path="{{ site.url }}/images/name-of-your-post-")
```

In your R Markdown document, feel free to add whatever content you'd like. In [Nichole White's example](http://nicolewhite.github.io/r-knitr-jekyll/2015/02/07/exploring-the-cars-dataset.html) she produced some simple plots using the publicly available cars dataset.

Save the script below in your *_drafts* folder as *r2jekyll.R*. This is the script that will take a R Markdown file, convert it into Markdown, and then move the Markdown file to your *_posts* folder.


```r
#!/usr/bin/env Rscript
library(knitr)

# Get the filename given as an argument in the shell.
args = commandArgs(TRUE)
filename = args[1]

# Check that it's a .Rmd file.
if(!grepl(".Rmd", filename)) {
  stop("You must specify a .Rmd file.")
}

# Knit and place in _posts.
dir = paste0("../_posts/", Sys.Date(), "-")
output = paste0(dir, sub('.Rmd', '.md', filename))
knit(filename, output)

# Copy .png files to the images directory.
fromdir = "{{ site.url }}/images"
todir = "../images"

pics = list.files(fromdir, ".png")
pics = sapply(pics, function(x) paste(fromdir, x, sep="/"))
file.copy(pics, todir)

unlink("{{ site.url }}", recursive = TRUE)
```

You will need to make the script executable. To do this, open up a terminal window. Navigate to the *_drafts* directory `cd your-file-path/_drafts` and execute the code `chmod +x r2jekyll.R`. Then you can run script:


```r
./r2jekyll.R name-of-your-post.Rmd
```

Check your *_posts* folder and you will see your first post in Markdown format.

## Preview Your Post

I like to preview and tweak the formatting of my posts before pushing them to GitHub. To setup a local server and preview your post, navigate to the root directory of your website in the terminal and execute the command below.


```r
jekyll serve
```

You will now be able to access your site and post at [http://127.0.0.1:4630/](http://127.0.0.1:4630/).

## BONUS SECTION: Publishing Jupyter Notebooks

Occasionally, I will work in [Python](https://www.python.org/) using [Jupyter Notebooks](http://jupyter.org/). Being able to publish these workbooks to a my site would be just as amazing publishing my R Markdowns documents. Basically, I'd need to convert the Jupyter Notebook to Markdown. I found an elegant solution, [nbconvert](https://github.com/jupyter/nbconvert), developed by Thomas Kluyver to accomplish this file conversion. I use the Python package manager [Anaconda](https://www.continuum.io/downloads) (which I recommend you install if you do any work in Python), so installation of nbconvert was easy, simply run `conda install nbconvert` in your terminal. If you don't have them installed already, you should also install [TeX](http://tug.org/mactex/) (link is for Mac users) and [Pandoc](http://pandoc.org/installing.html). This file converter has a lot of features; you can read the [documentation](https://nbconvert.readthedocs.io/en/latest/) for yourself, however, I will walk through the basic the steps below.

First, add the Jupyter Notebook file you would like to publish to the *_drafts* folder. Then, in the terminal, navigate to the drafts folder `cd your-file-path/_drafts`. Run the following code:


```r
jupyter nbconvert --to markdown name-of-your-post.ipynb
```

This converts your Jupyter Notebook to Markdown, which allows you publish it. You will manually need to move the file to the *_posts* folder once complete (yeah... I will work on a script to automate this at some point).

That's it! I hope somebody found this helpful. I did take me a while to put all the pieces together, but now the process is running like a well oiled machine.
