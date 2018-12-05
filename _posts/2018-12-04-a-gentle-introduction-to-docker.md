---
title: "A Gentle Introduction to Docker"
date: "December 4, 2018"
layout: post
comments: yes
---

# Docker

## Intro

---

Imagine you have an amazing pie recipe that you'd like to make for the holidays at your in-laws. Your recipe is best cooked fresh and calls for some uncommon ingredients that your in-laws likely do not have in their kitchen. How do you go about making the recipe in an environment that is not your own?

I thought of this analogy while explaining some of the work I do to some relatives over the holidays. While analogies can only take us so far, I think conceptually this is, at least a decent way, to think about Docker.

---

## What is Docker?

Docker is a way to provide data scientists a standardized working environment across machines. Using the analogy above, it is way to take my kitchen and all of its special ingredients and bring it over my relative's to cook my pie.

We've all been there. We have an incredible analysis that ran perfectly on your laptop, but when you send it over to someone else or try to rerun it on a different machine moments before you are supposed to show results, it fails. You tested your code and it ran fine, but the machine you are using was running Python 2.7 (not 3.7) and didn't have your packages/dependencies installed. What do you do?

This is where Docker comes into play. Docker will allow you to take an environment you've created on your laptop and port it over to another machine allowing for reproducible data science work. Another huge perk is that it lowers the barrier to productionizing your code. If you use Docker to containerize your work, handing it off to a coworker or operationalizing it is much more seemless than giving them an R or Python script. Think -- here is the recipe for my incredible pie, now you can go make it yourself in your own kitchen.

---

## Some Terminology

I've already found myself using some Docker terminology for my analogy section (containerize), so let's knock out some terms up front.

**Docker** - simply the name of the software/tool we are using to create standardized and reproducible data science work.

**Dockerfile** - this is a file (some code) that tells your Docker container what to do. This is like the written instructions for your recipe.

**Image** - a static snapshot of your of your container (FIND A BETTER WAY TO DEFINE)

**Container** - the live version of your Dockerfile. When an image is launched, it becomes a container. Think of this as a lightweight VM or the process of cooking your pie

**Docker Hub** - know GitHub? Well, Docker Hub is like GitHub but for Docker images. You can find all sorts of images in DockerHub, beyond data science.

---

## Installation

Docker is simple to install, so I will not walk you through it. There are [macOS](https://docs.docker.com/docker-for-mac/install/) and [Windows](https://docs.docker.com/docker-for-windows/install/) versions - pick your poison.

I've also prepared a simple repository to use for this article which can be downloaded from [GitHub](insert-link). After this has been downloaded and unzipped, move it a place that is easily accessible to you.

```
ADD FILE STRUCTURE VISUAL
```

---

## The Dockerfile

In this repository, you will see a Dockerfile. Keeping with the recipe analogy, the Dockerfile is analagous to your written recipe. It contains all of the instructions as to what to include in your container. I will break down each step to give an understanding of what is happening.

```
FROM python:3.7
COPY . /app
RUN pip install seaborn
CMD ["python", "/app/scripts/make_plot.py"]
```

A Dockerfile always starts from a base image. This is like the pie crust, the starting point, for your recipe. In the Dockerfile, `FROM` indicates the base image you are using. In this example file, we are using a python 3.7 image. If you want an older version of python, say you have some code that runs Python 2.7, you can indicate that by adding the 2.7 digest (yes, that's technically what it's called) after the image name. So, if you wanted to run Python 2.7, you can change `python:3.7` to `python:2.7`. Alternatively, you can add a tag after the image name `python:latest` to pull the lastest version of the python image. Things may change from time to time with the images, so if you want to be safe, I'd maintain and specific image in your code and test before updating.

After setting the base image, we will start to build layers on top of it. These layers are customizations to this pre-created base image. Think of this as the filling your pie (I prefer apple). If you want to add a crumble topping or traditional topping, you can indicate that here.

`COPY` will copy any files over to your Docker container. Immedietly after `COPY` in the example the `.` indicates your current working directory. This will copy all files over to your container to the `/app` directory.

`RUN` executes a shell command inside of your Docker container. We want to run the `make-plot.py` script, which depends on the seaborn (insert link) library. Here we install it with `pip`. See the `make-plot.py` below.

```
import seaborn as sns
df = sns.load_dataset('iris')
sns_plot = sns.pairplot(df, hue='species')
sns_plot.savefig("output.png")

print("Great Success!")
```

`CMD` instructs Docker what to execute once the image is launched. We want to run our `make_plot.py` script, and we tell Docker to do that with `["python", "/app/scripts/make_plot.py"]`. The syntax here is a little odd - make sure each argument is in quotes and separated by a comma. 

One note: when Docker is run, it automatically looks for a Dockerfile called Dockerfile. If you name your Dockerfile something else, Docker will not find it unless specified in your `docker run` command (which we will get to).

## Pulling a Base Image

We can pull the base image from DockerHub locally. To do so run:

```
docker pull python:3.7
```

If you forget to do The `docker build` command will automatically build your image locally. If you do not pull the base image locally, Docker will go find it remotely when we launch the container. I always prefer to pull it down first - this speeds up our build. (???)

## Context & Build

One important concept to understand is the context. The context is set of files that from which Docker will build. You will need to make sure anything you want to include in your Docker container (including the Dockerfile) is within the context.

Before we run launch our container, we need to build the image. WHAT IS BUILD???? ADDING INGREDIENTS.

To build our image we use `docker build`. There are two main parameters that we add to docker build to indicate the context:

* a local directory
* a repository URL

Open your terminal, and navigate {insert link} to the directory with the Dockerfile. Then, we can build the immage.

```
docker build -t docker-demo:1.0 .
```

Let's break this down. `docker build` is our command to build an image. We add the `-t` option which allows us to **tag** the image. I always prefer to do this since it helps keep images organized and is easier for me to recall. The tag is suffixxed with `:1.0` which indicates the version number. Lastly, the `.` tells us to build the Docker image at our current directory.

## Launching Your Container

We have successfully built our image. Now it's time to run our image, or keeping with the analogy, take our pie out of the oven.

```
docker run docker-demo:1.0
```

The command to launch our docker container is `docker run`. We specify the name of our iamge (`docker-demo`) along with the image tag `1.0` tag.

You should see your terminal print "Great Success!", indicating that your container ran.

This was a very basic example. However, you can add a lot of of customization to your Dockerfile and container. We can make it process a bunch of files, open up an interactive python terminal / jupyter notebook, or host a app. 

Below, I will provide some other examples of Dockerfiles that can be used for data science work.