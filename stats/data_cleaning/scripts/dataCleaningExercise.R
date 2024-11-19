#### Week 11 Task Set : Starting Out --------

## Start by setting your working directory to your psy1903 folder. Replace "~/Desktop/" with the correct path to your psy1903 directory:
setwd("~/Desktop/psy1903/")

dir.create("stats/data_cleaning")
dir.create("stats/data_cleaning/scripts")
dir.create("stats/data_cleaning/data")
dir.create("stats/data_cleaning/output")

## Set your working directory to be "your_path/psy1903/stats/data_cleaning/scripts/"
setwd("~/Desktop/psy1903/stats/data_cleaning/scripts")

## Using pacman() and p_load()
if (!require("pacman")) {install.packages("pacman"); require("pacman")}
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot","jsonlite")

## Read in one's participant's .csv dile as a data frame --
iat_data1 <- read.csv("~/Desktop/psy1903/osfstorage-archive/iat-2024-11-12-00-19-48.csv", header = TRUE)

## Examine your data frame 
str(iat_data1)
summary(iat_data1)

#### Subsetting Data ----------
iat_data2 <- iat_data1[iat_data1$expectedCategoryAsDisplayed == "healthy or fit" |
                       iat_data1$expectedCategoryAsDisplayed == "healthy or fat" |
                       iat_data1$expectedCategoryAsDisplayed == "unhealthy or fit" |
                       iat_data1$expectedCategoryAsDisplayed == "unhealthy or fat", 
                       c("trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct") ]

## Using the str() and summary() functions, check the structure of your subsetted data files. 
str(iat_data2)
summary(iat_data2)

## Convert to integer or factor as necessary 
iat_data2$expectedCategory <- as.factor(iat_data2$expectedCategory)
iat_data2$expectedCategoryAsDisplayed <- as.factor(iat_data2$expectedCategoryAsDisplayed)
iat_data2$leftCategory <- as.factor(iat_data2$leftCategory)
iat_data2$rightCategory <- as.factor(iat_data2$rightCategory)

## Creating a loop to convert to integers or factors as necessary
column_names <- c("expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory")

for (column_name in column_names) {
  iat_data2[,column_name] <- as.factor(iat_data2[,column_name])
  } #can handle variables, where $ cannot

## Rechecking the str() and summary()
str(iat_data2)
summary(iat_data2)

#### Creating A Function ----------

# Step 0: Set a Function 
calculate_IAT_dscore <- function(data) {
  
# Step 1: Only select trials with rt > 300 and < 5000
tmp <- data[data$rt > 300 & data$rt < 5000,]
  
# Step 2: Separate congruent and incongruent trials (subset tmp into two new data frames: congruent_trials and incongruent_trials) 
congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "healthy or fit" |
                       tmp$expectedCategoryAsDisplayed == "unhealthy or fat",]
incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "unhealthy or fit" |
                          tmp$expectedCategoryAsDisplayed == "healthy or fat",]

# Step 3: Calculate means and standard deviations for congruent and incongruent trials
congruent_means <- mean(congruent_trials$rt, na.rm = TRUE)
incongruent_means <- mean(incongruent_trials$rt, na.rm = TRUE)
pooled_sd <- sd(tmp$rt, na.rm = TRUE)

# Step 4: Calculate D-Score
# 𝑑 = (mean reaction time of congruent − mean reaction time of incongruent) / pooled standard deviation

dscore <- (congruent_means - incongruent_means)/pooled_sd

return(dscore)

#-0.99 - participant responded more quickly to the incongruent block, more biased against
} 

calculate_IAT_dscore()

#### Putting it in a Loop and Creating New Data Files --------

## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* contain your raw participant csv data files and no other files.
directory_path <- "~/Desktop/psy1903/osfstorage-archive"

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)
## IAT
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 2))

## Rename the default column names to something meaningful
## IAT
colnames(dScores) <- c("participant_ID", "d_score")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

## Step 1: Create a for loop that iterates across each file in file_list

# Temp file for testing, remove later 
file <-files_list[[1]]
  
for (file in files_list) {
  # Step 2:Use read.csv to read in your file 
  tmp <- read.csv(file)
  
  # Step 3: Assign participant ID as the basename of the file
  participant_ID <- tools::file_path_sans_ext(basename(file))
  
  # Step 4: Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i,"participant_ID"] <- participant_ID
  
  # Step 5: Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file
dScores[i,"d_score"] <- calculate_IAT_dscore(tmp)

# Step 6: Remove the temporary data file tmp
rm(tmp)

#Step 7: # Increase our row number variable i by one for the next iteration
i <- i + 1
}


## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)


#### Questionnaire Scoring -----------------------------------------------------

## Read in data file to a data frame called iat_test
iat_test <- read.csv("~/Desktop/psy1903/stats/data_cleaning/data/my-iat-test-data.csv")

## Extract questionnaire data
json_data <- iat_test[iat_test$trialType == "Questionaire","response"]

## Use fromJSON to Convert from JSON to data frame
questionnaire <- fromJSON(json_data)

str(questionnaire)
questionnaire <- as.data.frame(questionnaire)


## Convert to numeric
questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
questionnaire2 <- questionnaire

## Reverse score if necessary
rev_items <- c("question1", "question2","question3","question5" )
for (rev_item in rev_items){
  questionnaire(,rev_item) <- 5 - questionnaire[,rev_item]
}
## Calculate mean or sum score
score <- rowMeans(questionnaire, na.rm = TRUE)
