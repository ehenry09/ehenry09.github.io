---
title: "Building a Website with R Markdown"
date: "February 14, 2017"
layout: post
comments: yes
---



{% raw %}

When I first started building [my website](http://www.elliothenry.com/), I decided to use [Wix](http://www.wix.com/). It's a great website builder that has lots of custom options -- it is kind of like the PowerPoint of website editing. My one issue with Wix is that I wanted to easily embed some R code into its pages. I was already familiar with R Markdown, so being able to publish R Markdown documents directly would be ideal. 

In the following post, I am going to [ELI5](https://www.reddit.com/r/explainlikeimfive/) the entire process I go through to publish my R Markdown documents to a website. I probably went a little overboard embedding links, but I didn't want anyone to feel lost trying to figure out what I was talking about at any given moment (what the heck is a fork on GitHub?). It took my some time to iron out the process, so I hope you find this helpful.

Lastly, I am running this on macOS. The process should be the same for non-macOS users, but installation of some of the packages may be a little different.

## Jekyll, Markdown & Github

After some internet searching about how to publish my R Markdown files directly to a website, I discovered [Jekyll](https://jekyllrb.com/). Jekyll will produce static sites from [Markdown](https://guides.github.com/features/mastering-markdown/) files and [GitHub](https://github.com/) will host your Jekyll site for free. [Installation](https://jekyllrb.com/docs/installation/) of Jekyll was simple and and efficient, so I won't cover it in detail here.

Once Jekyll was installed, I [forked](https://help.github.com/articles/fork-a-repo/) the [Jekyll Now](https://github.com/barryclark/jekyll-now) repository from GitHub to setup a basic website shell. Make sure to rename the repository to *yourgithubusername.github.io* since this will be your site's custom URL. Now you can go to your URL and you will have a (very basic and generic) website!

## R Studio

Most of you reading this probably already have [R Studio](https://www.rstudio.com/) installed. If you do not, [install](https://www.rstudio.com/products/rstudio/download/) it! I'd recommend using R Studio for publishing your R Markdown documents since it allows you to create projects (like... for managing website content) and easily integrates with GitHub.

If R Studio is not already [linked to your GitHub account](https://www.r-bloggers.com/rstudio-and-github/), this will need to be setup. Once complete, create a new [project](https://support.rstudio.com/hc/en-us/articles/200526207-Using-Projects) using [version control](https://support.rstudio.com/hc/en-us/articles/200532077-Version-Control-with-Git-and-SVN) and link the repository you just created (*yourgithubusername.github.io*). Now, all files from the Jekyll Now repository will be available locally. This is where I do all of the editing for my posts, which I then [push](https://help.github.com/articles/pushing-to-a-remote/) to GitHub once they are ready.

I would now open the *_config.yml* in your local repository and add some personalization and social media to your site. I linked [Google Analytics](https://www.google.com/analytics/) and [Disqus](https://disqus.com/) to my site so people like you can comment or chide me for any mistakes I made while writing this :). There are also some really cool Jekyll [Themes](http://jekyll.tips/templates/) available for free. Since I originally used Wix to develop my site (and signed up for a yearly subscription, doh!), I did not add a custom theme. Maybe once my subscription lapses, I will get around to this. For now, I link my [ehenry09.github.io](https://ehenry09.github.io/) pages to my Wix [site](http://www.elliothenry.com/).

## R Markdown

Using Jekyll gets us one step closer to being able to publish R Markdown files. The missing link is converting the R Markdown files to Markdown, which in turn will allow Jekyll to publish them to your GitHub site. The best solution I found was developed by [Nicole White](https://nicolewhite.github.io/2015/02/07/r-blogging-with-rmarkdown-knitr-jekyll.html). Her process uses [knitr](http://yihui.name/knitr/) to convert an R Markdown file to Markdown and then integrates the files nicely into the Jekyll framework. I'll walk through her process, but please give her all the credit. 

First, in your [root directory](https://en.wikipedia.org/wiki/Root_directory), create a new folder called *_drafts*. Create a new R Markdown file (your first post!) and save it in the *_drafts* folder. Make sure that you save the R Markdown file using standard Jekyll nomenclature, lowercase text separated by hyphens.

At the top of your new R Markdown file, delete `output: html_document` (or whatever output is specified) and add `layout: post`. If your post includes images, you will also need to add this chunk below as the first chunk in your post. Make sure to change *name-of-your-post-* below to whatever you saved your first post as. 


```r
knitr::opts_chunk$set(fig.path="{{ site.url }}/images/name-of-your-post-")
```

**Note:** In order for the following code to work, you also need to have the URL (*yourgithubusername.github.io*) specified in the *_config.yml* file. Also, you do not need to change the `{{ site.url }}` - this will automatically be generated from the *_config.yml* file.

In your R Markdown document, feel free to add whatever content you'd like. In [Nichole White's example](http://nicolewhite.github.io/r-knitr-jekyll/2015/02/07/exploring-the-cars-dataset.html) she produced some simple plots using the publicly available cars dataset. I'd recommend testing out some images to ensure the paths are being correctly set.

Save the script below in your *_drafts* folder as *r2jekyll.R*. This is the script that will take a R Markdown file, using knitr convert it into Markdown, and then move the Markdown file to your *_posts* folder. The Markdown files in the *_posts* folder will in turn be published by Jekyll.


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

You will need to make the script executable. To do this, open up a [terminal](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line) window. Navigate to the *_drafts* directory `cd your-file-path/_drafts` and execute the code `chmod +x r2jekyll.R`. Then you can run script below, again making sure you replace the *name-of-your-post* to your actual post name. 


```r
./r2jekyll.R name-of-your-post.Rmd
```

Check your *_posts* folder and you will see your first post in Markdown format.

## Preview Your Post

I like to preview and tweak the formatting of my posts before pushing them to GitHub. To setup a local server and preview your post, navigate to the root directory of your website in the terminal and execute the command below.


```r
jekyll serve
```

The text succeeding the successful command will direct you to the server address (usually [http://127.0.0.1:4000/](http://127.0.0.1:4000/)). You will now be able to preview your site using your internet browser.

**TA-DA! That's it - your first post is published!**

## BONUS SECTION: Publishing Jupyter Notebooks

Occasionally, I will work in [Python](https://www.python.org/) using [Jupyter Notebooks](http://jupyter.org/). Being able to publish these workbooks to a site would be just as amazing publishing my R Markdowns documents. Basically, I'd need to convert a Jupyter Notebook to Markdown. I found an elegant solution, [nbconvert](https://github.com/jupyter/nbconvert), developed by Thomas Kluyver to accomplish this file conversion. I use the Python package manager [Anaconda](https://www.continuum.io/downloads) (which I recommend if you do any work in Python), so installation of nbconvert was easy -- simply run `conda install nbconvert` in your terminal. If you don't have them installed already, you should also get [TeX](http://tug.org/mactex/) (link is for Mac users) and [Pandoc](http://pandoc.org/installing.html). This file converter has a lot of features; you can read the [documentation](https://nbconvert.readthedocs.io/en/latest/) for yourself, however, I will walk through the basic the steps below.

First, add the Jupyter Notebook file you would like to publish to the *_drafts* folder. Make sure the file is named using standard Jekyll nomenclature, lowercase text separated by hyphens. Then, in the terminal, navigate to the drafts folder `cd your-file-path/_drafts`. Run the following code:


```r
jupyter nbconvert --to markdown name-of-your-post.ipynb
```

This converts your Jupyter Notebook to Markdown, which will allow Jekyll to publish it to your site. You will manually need to move the file to the *_posts* folder once complete (yeah... I will work on a script to automate this at some point) and then push it to GitHub.

That's it! I hope somebody found this helpful. I did take me a while to put all the pieces together, but now the process is running like a well oiled machine.

{% endraw %}
