---
title: "Tracking Location Data with IFTTT"
date: "July 17, 2019"
layout: post
comments: true
---



# What Hitchhiker’s Guide to the Galaxy Taught Me About Machine Learning
 
I realize this is a sci-fi classic and I should have read it a long time ago, however, I recently finished reading *Hitchhiker's Guide to the Galaxy*.  I was surprised that a book written in the 1980s could be so present in its commentary on modern computing and machine learning, especially considering how fast the field is advancing. As I was reading, I dog-eared a few pages that I thought were particularly poignant and extremely relevant to my work as a data scientist. In the following sections, I’ve written up my top three takeaways from the book as they relate to my work. I hope you enjoy and if not anything else, convince you to read the book!
 
## Complex systems can be just as effective as simple ones.
 
The main character Arthur Dent haphazardly finds himself on a stolen spacecraft called the *Heart of Gold*.  The ship has a *Nutri-Matic* machine that serves individualized, appetite and digestion-optimized beverages. This machine must a distant cousin of our modern-day recommendation engine.
 
>[Arthur] found a Nutri-Matic machine which had provided him with a plastic cup filled with a liquid that was almost, but not quite, entirely like unlike tea. The way it functioned was very interesting. When the *Drink* button was pressed it made an instant but highly detailed examination of the subject’s taste buds, a spectroscopic analysis of the subject’s metabolism and then sent tiny experimental signals down the neural pathways to the taste centers of the subject’s brain to see what was likely to go down well. However, no one know quite why it did this because it invariably delivered a cupful of liquid that was almost, but not quite, entirely unlike tea.
 
As a data scientist, I know I like to dig into the details and make systems often more complex than they often need to be. I like to test a bunch of different models and optimize performance by tuning hyperparameter or using different feature transforms. From my experience, the gains in model performance from hyperparameter tuning are often small compared to getting a basic, simplistic model up and running. This is especially true when we have models like random forests and neural networks that can fit many different data structures very well out of the box.
 
Before even applying machine learning, ask yourself whether machine learning is necessary to solve your problem. Often times a simple rule or heuristic can prove to be very  . This speaks strongly to [Google’s Rule #1 of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml/) – don’t be afraid to launch a product without machine learning.

Perhaps the *Nutri-Matic* machine would be very effective if it recognized Arthur was an *Earthman* and served him the most popular drink (besides water) from his home planet -- tea.

## Computers can’t help if you’re asking the wrong questions.
 
In *Hitchhiker's Guide to the Galaxy*, a supercomputer *Deep Thought* has been asked the “Answer to the Ultimate Question of Life, the Universe, and Everything”. The computer concludes (with high certainty, of course) that the answer is simply “Forty-two”. Two characters, Loonqual and Phouchg, who were trained for and spent their lives preparing to receive this answer (which also took seven and a half million years to calculate) were clearly dissatisfied with the results.
 
>“Forty-two!” yelled Loonquawl. “Is that all you’ve got to show for seven and a half million years’ work?”
>
>“I checked it very thoroughly,” said the computer, “and that quite definitely is the answer. I think the problem, to be quite honest with you, is that you’ve never actually known what the question is.”
 
Humans play a critical role in designing a machine learning system. Framing the problem and effectively designing a solution to solve it is often more work than implementing a model (which can often be done in a few lines of code). If there is a flaw in the design or the wrong question is being asked, machine learning will produce bias results, poor-quality output, or even a solution that is ill-fit to the problem.
 
How do we know whether we are asking the right questions? The computer, *Deep Thought*,  later states it is unable to tell the humans the right question to answer.
 
>“Look, all right, all right,” said Loonquawl, “can you just please tell us the question?”
>
>“The Ultimate Question?”
>
>“Yes!”
>
>“Of Life, the Universe and Everything?”
>
>“Yes!”
>
>Deep Thought pondered a moment.
>
>“Tricky,” he said.
>
>“But can you do it?” cried Loonquawl.
>
>Deep Thought pondered this for another long moment.
>
>Finally: “No,” he said firmly.

I’ve personally found it helpful to explicitly write the goal or the question I’m trying to answer out in a single, coherent sentence. If you feel like you are unable to do this or do not have a clear vision of the question you are attempting to answer -- ask a peer. Industry experts and peers in the field can be great resources to help you nail down the end goal and how to approach it. If these steps are not taken, you may find yourself in the shoes of Loonqual and Phouchg.
 
## A lot can be accomplished with little compute.
 
In the last section, I mentioned that a supercomputer *Deep Thought* had been asked the answer to “the Ultimate Question of Life, the Universe, and Everything”. Two programmers, Lunkwill and Fook, were responsible for activating the computer on the day of the Great On-turning (i.e., they kicked off the job). The two were disappointed when *eep Thought* informed them that it would take seven and a half million years to calculate the response.
 
>“All I wanted to say,” bellowed the computer, “is that my circuits are now irrevocably committed to calculating the answer to the Ultimate Question of Life, the Universe, and Everything.” He paused and satisfied himself that he now had everyone’s attention before continuing more quietly. “But the the program will take me a little while to run.”
>
>Fook glanced impatiently at his watch.
>
>“How long?” he said.
>
>“Seven and a half million years,” said Deep Thought.
>
>Lunkwill and Fook blinked at each other.
>
>“Seven and a half million years!” they cried in chorus.
 
I understand we are in a deep learning boom and many of the best in class machine learning models for text classification and image recognition have been dependent on recent improvements in computing. For many problems, I’ve found success in starting with a simple model or heuristic that can often be trained or implemented on my local machine. And then, over time, layer in complexity.

I also can’t tell you how many times I’ve waited for a memory-intensive process to run, only to find that it failed or there was a bug in the code. Start simple, validate your progress, and build up.
 
And that wraps it up. Thanks for reading! I’m off to read the next book in the series, *The Restaurant at the End of the Universe*.
