#### Week 11 Task Set : Starting Out --------

## Start by setting your working directory to your psy1903 folder. Replace "~/Desktop/" with the correct path to your psy1903 directory:
setwd("~/Desktop/psy1903/")

dir.create("stats/data_cleaning")
dir.create("stats/data_cleaning/scripts")
dir.create("stats/data_cleaning/data")
dir.create("stats/data_cleaning/output")

## Set your working directory to be "your_path/psy1903/stats/data_cleaning/scripts/"
setwd("~/Desktop/psy1903/stats/data_cleaning/scripts")

## Loading in Packages
if (!require("pacman")) {install.packages("pacman"); require("pacman")}
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot","jsonlite")
install.packages("ggplot")
library("ggplot2")

## Read in one's participant's .csv dile as a data frame --
iat_data1 <- read.csv("~/Desktop/psy1903/osfstorage-archive/iat-2024-11-05-22-07-53.csv", header = TRUE)
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

iat_data2$rt <- round(as.numeric(iat_data2$rt), 0)

column_names <- c("expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory")

for (column_name in column_names) {
  iat_data2[,column_name] <- as.factor(iat_data2[,column_name])
} #can handle variables, where $ cannot

## Convert to integer or factor as necessary 
iat_data2$expectedCategory <- as.factor(iat_data2$expectedCategory)
iat_data2$expectedCategoryAsDisplayed <- as.factor(iat_data2$expectedCategoryAsDisplayed)
iat_data2$leftCategory <- as.factor(iat_data2$leftCategory)
iat_data2$rightCategory <- as.factor(iat_data2$rightCategory)

## Rechecking the str() and summary()
str(iat_data2)
summary(iat_data2)

#### Creating A Function ----------

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

#### IAT ----------
# Step 0: Set a Function 
calculate_IAT_dscore <- function(data) {
  
# Step 1: Only select trials with rt > 300 and < 5000
tmp <- data[data$rt > 300 & data$rt < 5000 & data$correct == TRUE,]

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

dscore <- (incongruent_means - congruent_means)/pooled_sd

return(dscore)

#-0.99 - participant responded more quickly to the incongruent block, more biased against
} 
class(data)
#### Questionnaire Scoring ---------------------
score_questionnaire <- function (q_data) {
  
## Extract questionnaire data cell
pulled_data <- q_data[q_data$trialType == "questionnairePartA", "response"]
  
  ## Use fromJSON to convert from JSON to data frame
  questionnaire <- fromJSON(pulled_data)
  questionnaire <- as.data.frame(questionnaire)
  
  ## Convert to numeric
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  print(questionnaire)
  
## Reverse score if necessary
 rev_items <- c("Q0","Q4","Q5","Q9")
 for (rev_item in rev_items) {
questionnaire[, rev_item] <- 5 - questionnaire[, rev_item]
}
  
  print(questionnaire)
  
  ## Calculate & return questionnaire score (mean)
  score <- rowMeans(questionnaire, na.rm = TRUE)
  return(score)
}

#### Putting it in a Loop and Creating New Data Files --------

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

## Step 1: Create a for loop that iterates across each file in file_list

# Temp file for testing, remove later
file <-files_list[[1]]

for (file in files_list) {
# Use read.csv to read in your file
tmp <- read.csv(file)
tmp[tmp == ""] <- NA

# Assign participant ID as the basename of the file
participant_ID <- tools::file_path_sans_ext(basename(file))

# RT Column is Numeric
tmp$rt <- as.numeric(tmp$rt)
# Correct Column is Logical
tmp$correct <- as.logical(tmp$correct)

# Appropriate Columns are Factors
tmp$expectedCategory <- as.factor(tmp$expectedCategory)
tmp$expectedCategoryAsDisplayed <- as.factor(tmp$expectedCategoryAsDisplayed)
tmp$leftCategory <- as.factor(tmp$leftCategory)
tmp$rightCategory <- as.factor(tmp$rightCategory)


# Step 4: Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
dScores[i,"participant_ID"] <- participant_ID
# Step 5: Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file
dScores[i,"d_score"] <- calculate_IAT_dscore(tmp)
#Following the logic of assigning the participant_ID to a single cell, assign the dScores "whichPrime" column to be the current participant's prime label.
dScores[i,"whichPrime"] <- tmp$displayedVideo[tmp$trialType == "prime" & tmp$displayedVideo != " "]
#Following the logic of assigning the "d_score" column to be the output of the calculate_*_dScore function, assign the "questionnaire" column to be the output of the score_questionnaire function
dScores[i,"questionnaire"] <- score_questionnaire(tmp)

# Step 6: Remove the temporary data file tmp
rm(tmp)

#Step 7: # Increase our row number variable i by one for the next iteration
i <- i + 1
}

str(dScores)
dScores$whichPrime <- as.factor(dScores$whichPrime)
str(dScores)

## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)


# #### Questionnaire Scoring ---------------------
# score_questionnaire <- function (data) {
# 
# ## Extract questionnaire data cell
# json_data <- data[data$trialType == "questionnairePartA", "response"]
#   
# ## Use fromJSON to convert from JSON to data frame
# questionnaire <- fromJSON(json_data)
# questionnaire <- as.data.frame(questionnaire)
# 
# ## Convert to numeric
# questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
# print(questionnaire)
# 
# ## Reverse score if necessary
# rev_items <- c("Q0","Q4","Q5","Q6")
#   for (rev_item in rev_items) {
#     questionnaire[, rev_item] <- 5 - questionnaire[, rev_item]
# }
# 
# print(questionnaire)
# 
# ## Calculate & return questionnaire score (mean)
# score <- rowMeans(questionnaire, na.rm = TRUE)
# return(score)
# }

#### Week 13 -----

# ANOVA
av_model <- aov(d_score ~ whichPrime, data = dScores)
summary(av_model)

# TukeyHSD
TukeyHSD(av_model)

# Correlation 
cor.test(dScores$d_score,
 (dScores$questionnaire)) 

# Base R Histogram
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig1_baseR_histogram.png", width = 600, height = 500)

hist_dscore <- dScores$d_score
hist(hist_dscore,
     main = "Distribution of D-Scores",
     xlab = "D-Scores",
     ylab = "Frequency")

dev.off()

# GGPlot Histogram
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig2_ggplot_histogram.png", width = 600, height = 500)

ggplot(data=dScores, aes (x = d_score)) +
  geom_histogram(binwidth = 0.15, fill = "skyblue", color = "black") +
  labs(title = "Distribution of D-Scores",
       x = "D-Scores",
       y = "Frequency") + theme_minimal()
  
dev.off() 
  
# GGPlot Histogram by Prime
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig3_ggplot_histogram_by_prime.png", width = 600, height = 500)

ggplot(data=dScores, aes (x = d_score)) +
  geom_histogram(binwidth = 0.15, fill = "skyblue", color = "black") +
  labs(title = "Distribution of D-Scores",
       x = "D-Scores",
       y = "Frequency") + theme_classic() +facet_wrap(~whichPrime)

dev.off() 

# GGPlot Boxplot
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig4_ggplot_boxplot.png", width = 600, height = 500)

ggplot(data=dScores, aes (x = whichPrime, y=d_score, fill=whichPrime)) +
  geom_boxplot() + 
  labs(title = "Effect of Prime on D-Scores",
       x = "Prime Condition",
       y = "D-Scores") + 
  theme_classic() + 
  theme(legend.position = "none") + 
  scale_x_discrete(labels = c("video1" = "Healthy-Fit Prime",
                              "video2" = "Unhealthy-Fat Prime"))

dev.off() 

# GGPlot Scatterplot
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig5_ggplot_scatter.png", width = 600, height = 500)

ggplot(data=dScores, aes (x = questionnaire, y=d_score)) +
  geom_point() + 
  geom_smooth(method ="lm") +
  labs(title = "Correlation Between Questionnaire and D-Scores",
       x = "Questionnaire",
       y = "D-Scores") + 
  theme_classic()

dev.off() 

# GGPlot Theme
theme_kayla <- function (base_size = 14, 
                         base_family = "",
                         base_line_size = base_size/170, 
                         base_rect_size = base_size/170){
theme_minimal(base_size = base_size, 
                base_family = base_family, 
                base_line_size = base_line_size) %+replace%
theme(
      axis.title.y = element_text(angle = 0, vjust = 0, hjust = 0.5, size = 14, color = "lightpink"),
      axis.title.x = element_text(hjust = 0.5, size = 14, color = "salmon"),
      axis.text = element_text(size = 14, color = "magenta"),
      axis.ticks = element_line(color = "black"),
      plot.title = element_text(hjust = 0.5, size = 30, color = "maroon"), 
      
      complete = TRUE
)
}

png("~/Desktop/psy1903/stats/data_cleaning/output/Fig6_custom_theme.png", width = 600, height = 500)

ggplot(data=dScores, aes (x = whichPrime, y=d_score, fill=whichPrime)) +
  geom_boxplot() + 
  labs(title = "Effect of Prime on D-Scores",
       x = "Prime Condition",
       y = "D-Scores") + 
  theme_kayla() + 
  theme(legend.position = "none") + 
  scale_x_discrete(labels = c("video1" = "Healthy-Fit Prime",
                              "video2" = "Unhealthy-Fat Prime"))

dev.off() 

png("~/Desktop/psy1903/stats/data_cleaning/output/Fig7_custom_theme.png", width = 600, height = 500)

ggplot(data=dScores, aes (x = questionnaire, y=d_score)) +
  geom_point() + 
  geom_smooth(method ="lm") +
  labs(title = "Correlation Between Questionnaire and D-Scores",
       x = "Questionnaire",
       y = "D-Scores") + 
  theme_kayla()

dev.off() 

