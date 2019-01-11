---
title: "Tracking Location Data with IFTTT"
date: "January 10, 2019"
layout: post
comments: true
---



I was recently inspired by the [Not So Standard Deviations](http://nssdeviations.com/) podcast to start collecting some data about myself and my habits. Specifically, I wanted to track my day-to-day commute to work. I do tend to make fairly good use of my commute time since I am lucky enough to ride a train and not drive, however commuting still represents is a decent chunk of my time.

To start data collection I used used an app called [If This Than That (IFTTT)](https://ifttt.com/). IFTTT is an app that connects other apps or software together by specifying a trigger (if this) and an action (then that). In my case, I wanted to track my location data -- basically, when I enter/exit home or work, create a timestamp in a database. Below are the steps are I took to set this up.

1. **Open IFTTT and create a new applet.** Click the blue "this" plus (+) to choose the trigger event.

	<br>
    {:refdef: style="text-align: center;"}
    ![Step 1](/images/tracking-location-data-step-1.png){:height="600px"}
    {: refdef}

2. **Type "location" in the search bar and select Location.** Select "You enter or exit an area" since both will be needed to track commute time. Enter the address of either your home or work in the search bar and click "Create Trigger" at the bottom. 

	<br>
    {:refdef: style="text-align: center;"}
    ![Step 2](/images/tracking-location-data-step-2.png){:height="600px" .center-image}
    {: refdef}
    <br>

3. Click the blue "that" plus (+) to add the action to occur after the trigger if fired. **The type "sheets" in the search bar and select Google Sheets.** Select the "Add row to spreadsheet" option. Here you can customize your spreadsheet by giving it a name, location in Google Drive, and format of the row. If you click into the "Formatted row" box, there are some additional "ingredients" (data points) you can add to the sheet. Note that a triple pipe (`|||`) delimiter is used to separate columns. 

    <br>
    {:refdef: style="text-align: center;"}
    ![Step 4](/images/tracking-location-data-step-3.png){:height="600px"}
    {: refdef}
    <br>

    I chose Google Sheets to act as my database. However, IFTTT has other database services like Airtable available as well.

    Once the data you desire to collect is setup, click "Create action" at the bottom.

4. Review and rename your applet if you'd like, **select "Finish", and you're done!**

    <br>
    {:refdef: style="text-align: center;"}
    ![Step 5](/images/tracking-location-data-step-4.png){:height="600px"}
    {: refdef}
     <br>

After this is setup for one location (either work or home), you will need to go through these steps again for the other.

I set this up on an iPhone, but the steps should be very similar if not exact for Android. Additionally, I believe Android had a trigger that can be setup whenever you connect or disconnect from WiFi (assuming you use work WiFi). To me, this would be preferred over location tracking.

Lastly, I am hoping to do a quick analysis once I have gathered enough data. No Promises though :). 
