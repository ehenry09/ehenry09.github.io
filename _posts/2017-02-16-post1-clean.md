
# Carvana Example Dataset

For the model implementation in Python, I used [RandomForestClassifier](http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html) from the [scikit-learn](http://scikit-learn.org/stable/) machine learning platform. The overall process I followed was similar to that of R, however, there are some difference in the algorithm implementation. First I will import pandas, numpy, matplotlib, seaborn, and sklearn:


```python
%matplotlib inline
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.cross_validation import train_test_split
from sklearn.metrics import roc_curve, roc_auc_score
```


```python
# read the data
carvana = pd.read_csv("/Users/elliot.henry/Desktop/carvana_training_data.csv")
```

Like in R, some columns will be removed.


```python
drops = ['RefId', 'PurchDate', 'WheelTypeID']
carvana = carvana.drop(drops, axis = 1)
```

The scikit-learn RandomForestClassifier will not accept missing values (unlike the model we ran in R). We see that many features do have missing values.


```python
carvana.isnull().any()
```




    IsBadBuy                             False
    Auction                              False
    VehYear                              False
    VehicleAge                           False
    Make                                 False
    Model                                False
    Trim                                  True
    SubModel                              True
    Color                                 True
    Transmission                          True
    WheelType                             True
    VehOdo                               False
    Nationality                           True
    Size                                  True
    TopThreeAmericanName                  True
    MMRAcquisitionAuctionAveragePrice     True
    MMRAcquisitionAuctionCleanPrice       True
    MMRAcquisitionRetailAveragePrice      True
    MMRAcquisitonRetailCleanPrice         True
    MMRCurrentAuctionAveragePrice         True
    MMRCurrentAuctionCleanPrice           True
    MMRCurrentRetailAveragePrice          True
    MMRCurrentRetailCleanPrice            True
    PRIMEUNIT                             True
    AUCGUART                              True
    BYRNO                                False
    VNZIP1                               False
    VNST                                 False
    VehBCost                             False
    IsOnlineSale                         False
    WarrantyCost                         False
    dtype: bool



For this example, missing numeric/continuous variables will be imputed using the median. Scikit-learn also has an [imputer](http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.Imputer.html) function that could be used as well.


```python
median_vars = ['MMRAcquisitionAuctionAveragePrice', 'MMRAcquisitionAuctionCleanPrice',
               'MMRAcquisitionRetailAveragePrice', 'MMRAcquisitonRetailCleanPrice',
               'MMRCurrentAuctionAveragePrice', 'MMRCurrentAuctionCleanPrice',
               'MMRCurrentRetailAveragePrice', 'MMRCurrentRetailCleanPrice']
carvana[median_vars] = carvana[median_vars].fillna(carvana[median_vars].median().iloc[0])
```

The scikit-learn RandomForestClassifier will also not accept categorical features. Dummy variables will be created for these features. I realize that this dramatically expands the feature space, however, I was still get the workbook to run. Scikit-learn also have a recursive feature elimination ([RFE](http://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.RFE.html)) function which can help reduce the number of features.


```python
categorical_vars = ['Auction', 'Make', 'Model', 'Trim', 'SubModel', 'Color', 'Transmission', 'WheelType', 
                    'Nationality', 'Size', 'TopThreeAmericanName', 'PRIMEUNIT', 'AUCGUART', 'VNST', 'BYRNO', 
                    'VNZIP1', 'IsOnlineSale']
carvana[categorical_vars] = carvana[categorical_vars].astype(object) # converts all columns to factor
carvana_dummy = pd.get_dummies(carvana[categorical_vars], dummy_na=False)
```

The categorical features will be dropped from the original data frame, then joined with the dummy variables.


```python
carvana = carvana.drop(categorical_vars, axis = 1)
carvana = pd.concat([carvana, carvana_dummy], axis=1)
```

Now that the data frame has been created, we will create a training and testing set. I will also convert the data frame to an array since that is what is ingested by the RandomForestClassifier.


```python
y = carvana[['IsBadBuy']]
y = np.ravel(y)
y
```




    array([0, 0, 0, ..., 0, 0, 0])




```python
X_df = carvana.drop(['IsBadBuy'], axis=1)
X = np.array(X_df)
X
```




    array([[  2.00600000e+03,   3.00000000e+00,   8.90460000e+04, ...,
              0.00000000e+00,   1.00000000e+00,   0.00000000e+00],
           [  2.00400000e+03,   5.00000000e+00,   9.35930000e+04, ...,
              0.00000000e+00,   1.00000000e+00,   0.00000000e+00],
           [  2.00500000e+03,   4.00000000e+00,   7.38070000e+04, ...,
              0.00000000e+00,   1.00000000e+00,   0.00000000e+00],
           ..., 
           [  2.00500000e+03,   4.00000000e+00,   8.85000000e+04, ...,
              0.00000000e+00,   1.00000000e+00,   0.00000000e+00],
           [  2.00600000e+03,   3.00000000e+00,   7.95540000e+04, ...,
              0.00000000e+00,   1.00000000e+00,   0.00000000e+00],
           [  2.00600000e+03,   3.00000000e+00,   6.68550000e+04, ...,
              0.00000000e+00,   1.00000000e+00,   0.00000000e+00]])




```python
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size = 0.75)
```

Now, we will create and fit the classifier.


```python
rf = RandomForestClassifier(n_estimators=1000, criterion='gini', max_depth=None, max_features='sqrt', oob_score=True,
                            n_jobs=1, verbose=0)
rf_fit = rf.fit(X_train, y_train)
```

And ... create predictinos for the test set.


```python
rf_test_preds = rf_fit.predict_proba(X_test)[:,1]
rf_test_preds
```




    array([ 0.209,  0.139,  0.084, ...,  0.091,  0.203,  0.074])



We will now take a look at the top 20 feature importance for the random forest model. You will notice that the features importances are much different than those in R. The dummy variables reduce the importance importance of many of the categorical variables. The ROC and AUC are very similar to the results in R.


```python
rf_importances = rf.feature_importances_
sorted_indices = np.argsort(rf_importances)
y_pos = range(len(rf_importances[(len(rf_importances)-20):len(rf_importances)]))
plt.barh(y_pos, rf_importances[sorted_indices][(len(rf_importances)-20):len(rf_importances)], align='center')
plt.yticks(y_pos, X_df.columns[sorted_indices][(len(rf_importances)-20):len(rf_importances)])
plt.show()
```


![png](post1_clean_files/post1_clean_23_0.png)



```python
fpr_rf, tpr_rf, thresholds_rf = roc_curve(y_test, rf_test_preds)
fpr_rand = tpr_rand = np.linspace(0, 1, 10) # draws the random baseline ROC line
plt.plot(fpr_rf, tpr_rf)
plt.plot(fpr_rand, tpr_rand, linestyle='--')
plt.show()
```


![png](post1_clean_files/post1_clean_24_0.png)



```python
roc_auc_score(y_test, rf_test_preds)
```




    0.75594419749183139


