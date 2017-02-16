---
title: "Random Forest with H2O"
date: "February 14, 2017"
layout: post
comments: yes
---

Random forests are a one of my favorite machine machine learning methods. I've found them to be incredibly powerful in predicting a number of items in my work, but often run into performance issues running them on my local machine. A [coworker](http://www.spencerdavison.com/) recommended the R package [H2O](https://cran.r-project.org/web/packages/h2o/h2o.pdf) -- an open source, high performance, in-memory machine learning platform. It has been a game changer in terms of my being able to run efficient predictive models locally. In this post, I will walk though implemenation of a random forest using a long passed Kaggle competition, [Don't Get Kicked](https://www.kaggle.com/c/DontGetKicked). 

I chose this dataset since it has both numeric and categorical predictors, a mix I often find in my workspace. The goal of this Kaggle competition is essentially to predict which cars will be "lemons" when bought at auction. Download the [training data](https://www.kaggle.com/c/DontGetKicked/download/training.csv) to get started. There is also an accompanying [data dictionary](https://www.kaggle.com/c/DontGetKicked/download/Carvana_Data_Dictionary.txt) if you are interested in knowing the variable definitions.

## Data Setup

First, I will read the data and clean it up a bit.




```r
# read the data
carvana <- read.csv(paste(your_file_path, "training.csv", sep = ""))

# remove some columns that I don't like
carvana$RefId <- NULL
carvana$PurchDate <- NULL
carvana$WheelTypeID <- NULL

# the data needs some cleaning & structuring
# there are some "NULL"s and blanks that I will convert to NA
carvana <- data.frame(lapply(carvana, as.character), stringsAsFactors = FALSE)
carvana[carvana == ""] <- NA
carvana[carvana == "NULL"] <- NA

# converting to factor variables
varFactor <- c("IsBadBuy", "Auction", "Make", "Model", "Trim", "SubModel", "Color", "Transmission",
               "WheelType", "Nationality", "Size", "TopThreeAmericanName", "PRIMEUNIT", "AUCGUART", "BYRNO",
               "VNZIP1", "VNST", "IsOnlineSale")
carvana[varFactor] <- lapply(carvana[varFactor], as.factor)

# converting to numeric variables
# note: "VehYear" could also used as a factor
varNumeric <- c("VehYear", "VehicleAge", "VehOdo", "MMRAcquisitionAuctionAveragePrice", "MMRAcquisitionAuctionCleanPrice",
                "MMRAcquisitionRetailAveragePrice", "MMRAcquisitonRetailCleanPrice", "MMRCurrentAuctionAveragePrice", 
                "MMRCurrentAuctionCleanPrice", "MMRCurrentRetailAveragePrice", "MMRCurrentRetailCleanPrice",
                "VehBCost", "WarrantyCost")
carvana[varNumeric] <- lapply(carvana[varNumeric], as.numeric)
```

## H2O and Random Forest

Now that the data has been formatted, let's run the random forest model. Since I will be using H2O, I will need to initialize a local cluster before running the model. I will also be using a 75% of the data as a training set and 25% as the testing set. There is a separate [testing data set](https://www.kaggle.com/c/DontGetKicked/download/test.csv) available on Kaggle. If you wish to use the entire *training.csv* file as training set and the *test.csv* file as the test set, you could certainly do that too.


```r
# load the pacakge
library(h2o)

# disable the progress bar (this just annoys me)
h2o.no_progress()

# initialize local cluster
localH2O <- h2o.init(nthreads = -1)

# convert dataset to h2o object
carvana_h2o <- as.h2o(carvana)

# create training and testing sets
carvana_h2o <- h2o.splitFrame(carvana_h2o, ratios = 0.75, destination_frames = c("train", "test"))
names(carvana_h2o) <- c("train", "test")

# creating a list of features for the model
inputModel <- names(carvana[-1])

# building the random forest model
rfCarvana <- h2o.randomForest(training_frame = carvana_h2o$train, validation_frame = carvana_h2o$test, x = inputModel, y = "IsBadBuy", ntrees = 100, stopping_rounds = 2)
```

In this example, I just threw all the variables into the model. I would typically do a separate analysis to determine which features to include in the model, but let's skip over that for now. Next, we will take a look at variable importance and some metrics from the validation set.

## Validation Metrics

Let's see how our model performed. The output below summarizes the model performance on the test set of data used (the 25% held out from the *training.csv*).


```r
# print metrics from the validation set
rfCarvana@model$validation_metric
```

```
## Error in eval(expr, envir, enclos): object 'rfCarvana' not found
```

> H2OBinomialMetrics: drf
> ** Reported on validation data. **
> 
> MSE:  0.09138693
> RMSE:  0.3023027
> LogLoss:  0.3212215
> Mean Per-Class Error:  0.3558316
> AUC:  0.7417373
> Gini:  0.4834746
> 
> Confusion Matrix for F1-optimal threshold:
>            0    1    Error         Rate
> 0      15171  836 0.052227   =836/16007
> 1       1520  785 0.659436   =1520/2305
> Totals 16691 1621 0.128659  =2356/18312
> 
> Maximum Metrics: Maximum metrics at their respective thresholds
>                         metric threshold    value idx
> 1                       max f1  0.261696 0.399898 153
> 2                       max f2  0.089767 0.484260 291
> 3                 max f0point5  0.518781 0.539575  71
> 4                 max accuracy  0.537599 0.896352  65
> 5                max precision  0.747559 1.000000   0
> 6                   max recall  0.002605 1.000000 398
> 7              max specificity  0.747559 1.000000   0
> 8             max absolute_mcc  0.518781 0.397547  71
> 9   max min_per_class_accuracy  0.109837 0.667245 269
> 10 max mean_per_class_accuracy  0.139715 0.671752 239

Whenever I run a random forest model, I always look at the variable importance output. It is interesting to see which variable perform well and which do not. Accroding to the H2O [documentation](http://h2o-release.s3.amazonaws.com/h2o/rel-tverberg/4/docs-website/h2o-docs/data-science/drf.html) ... 

> "Variable importance is determined by calculating the relative influence of each variable: whether that variable was selected during splitting in the tree building process and how much the squared error (over all trees) improved as a result."

In our case, "WheelType" (The vehicle wheel type description (Alloy, Covers, Special)) was the stongest performer.


```r
# variable importance
h2o.varimp(rfCarvana)
```

> Variable Importances: 
>    variable relative_importance scaled_importance percentage
> 1 WheelType        49828.539062          1.000000   0.186036
> 2  SubModel        32987.582031          0.662022   0.123160
> 3    VNZIP1        29212.203125          0.586254   0.109064
> 4     BYRNO        23760.740234          0.476850   0.088711
> 5     Color        14658.773438          0.294184   0.054729
>
> ---
>                variable relative_importance scaled_importance percentage
> 25 TopThreeAmericanName         1604.903564          0.032209   0.005992
> 26             AUCGUART          656.030579          0.013166   0.002449
> 27            PRIMEUNIT          586.631714          0.011773   0.002190
> 28          Nationality          571.023254          0.011460   0.002132
> 29         Transmission          541.581604          0.010869   0.002022
> 30         IsOnlineSale          214.761398          0.004310   0.000802

The variable importance plot displays the scaled importance.


```r
# plot of variable importance
h2o.varimp_plot(rfCarvana)
```

![](http://ehenry09.github.io/images/random-forest-with-h2o-var-imp.png)

Lastly, I will take a look at the ROC curve. Our model is better than making random predictions - yay!


```r
# build and plot the ROC curve
rfROC <- h2o.performance(rfCarvana, newdata = carvana_h2o$test)
plot(rfROC)
```

![](http://ehenry09.github.io/images/random-forest-with-h2o-roc.png)

## Cluster Shut Down

If you are satisfied with the result, go ahead and shutdown the cluster you have running locally. However, if you would like to go back and refine the model you built, shut it down later. 


```r
# shut down the local cluster
# if you want to refine your model futher, do not run this line
h2o.shutdown(prompt = FALSE)
```

## Submission to Kaggle

If you want to [submit](https://www.kaggle.com/c/DontGetKicked/submissions/attach) this random forest model (or some other tweaked model from my code above) to Kaggle, the code I used to create the submission file is below. In order for your submission to be accepted, you must make predictions on the *test.csv* dataset provided on Kaggle [website](https://www.kaggle.com/c/DontGetKicked/data). You will have to import and do the data preprocessing above in order to get a result they will accept (hey ... it will be good practice!).

This solution will get you about middle of the pack on Kaggle.


```r
# get predicions for test set
# note: the test dataset I called "carvana_test" and performed the preprocessing above
preds <- h2o.predict(rfCarvana, carvana_test) 
preds <- as.data.frame(preds)

# create the submission dataframe
submission <- cbind(refID, preds$predict)
names(submission) <- c("refID", "IsBadBuy")

# write the file to csv
write.csv(submission, file = paste(your_file_path, "submission.csv", sep = ""), row.names = FALSE)
```
