#### Data Cleaning and Analysis 

#### Load Packages & Set Working Directory ------
if (!require("pacman")) {install.packages("pacman"); require("pacman")}
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot","jsonlite")
library(ggplot2)
setwd("~/Desktop/psy1903/stats/final_stats")

#### D-score Function --------------------------------

files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

dScores <- data.frame(matrix(nrow = length(files_list), ncol = 2))
colnames(dScores) <- c("participant_ID", "d_score")

calculate_IAT_dscore <- function(data) {
  tmp <- data[data$rt > 300 & data$rt < 5000 & data$correct == TRUE,]
  
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "healthy or fit" |
                            tmp$expectedCategoryAsDisplayed == "unhealthy or fat",]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "unhealthy or fit" |
                              tmp$expectedCategoryAsDisplayed == "healthy or fat",]
  
  congruent_means <- mean(congruent_trials$rt, na.rm = TRUE)
  incongruent_means <- mean(incongruent_trials$rt, na.rm = TRUE)
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  
  dscore <- (incongruent_means - congruent_means)/pooled_sd
  
  return(dscore)
}

#### Questionnaire Scoring Function ---------------
score_questionnaire <- function (q_data) {
  pulled_data <- q_data[q_data$trialType == "questionnairePartA", "response"]
  
  questionnaire <- fromJSON(pulled_data)
  questionnaire <- as.data.frame(questionnaire)
  
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  
  rev_items <- c("Q0","Q4","Q5","Q9")
  for (rev_item in rev_items) {
    questionnaire[, rev_item] <- 5 - questionnaire[, rev_item]
  }
  
  score <- rowMeans(questionnaire, na.rm = TRUE)
  return(score)
}

#### For Loop ------------------------------------------
i = 1

file <-files_list[[1]]

for (file in files_list) {
  tmp <- read.csv(file)
  tmp[tmp == ""] <- NA
  
  participant_ID <- tools::file_path_sans_ext(basename(file))
  
  tmp$rt <- as.numeric(tmp$rt)
  tmp$correct <- as.logical(tmp$correct)
  
  tmp$expectedCategory <- as.factor(tmp$expectedCategory)
  tmp$expectedCategoryAsDisplayed <- as.factor(tmp$expectedCategoryAsDisplayed)
  tmp$leftCategory <- as.factor(tmp$leftCategory)
  tmp$rightCategory <- as.factor(tmp$rightCategory)
  
  dScores[i,"participant_ID"] <- participant_ID
  dScores[i,"d_score"] <- calculate_IAT_dscore(tmp)
  dScores[i,"whichPrime"] <- tmp$displayedVideo[tmp$trialType == "prime" & tmp$displayedVideo != " "]
  dScores[i,"questionnaire"] <- score_questionnaire(tmp)
  
  rm(tmp)
  
  i <- i + 1
}

dScores$whichPrime <- as.factor(dScores$whichPrime)
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)


#### ANOVA -------------------------------------------
av_model <- aov(d_score ~ whichPrime, data = dScores)
summary(av_model)


#### T-Test ---------------------------------------------
TukeyHSD(av_model)

#### Correlation ---------------------------------------
cor.test(dScores$d_score,
         log10(dScores$questionnaire)) 

#### Base R Histogram -------------------------------
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig1_baseR_histogram.png", width = 600, height = 500)

hist_dscore <- dScores$d_score
hist(hist_dscore,
     main = "Distribution of D-Scores",
     xlab = "D-Scores",
     ylab = "Frequency")

dev.off()

#### ggplot Histogram --------------------------------
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig2_ggplot_histogram.png", width = 600, height = 500)

ggplot(data=dScores, aes (x = d_score)) +
  geom_histogram(binwidth = 0.15, fill = "skyblue", color = "black") +
  labs(title = "Distribution of D-Scores",
       x = "D-Scores",
       y = "Frequency") + theme_minimal()

dev.off() 

#### ggplot Histogram by Prime ---------------------
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig3_ggplot_histogram_by_prime.png", width = 600, height = 500)

ggplot(data=dScores, aes (x = d_score)) +
  geom_histogram(binwidth = 0.15, fill = "skyblue", color = "black") +
  labs(title = "Distribution of D-Scores",
       x = "D-Scores",
       y = "Frequency") + theme_classic() +facet_wrap(~whichPrime)

dev.off() 

#### ggplot Box Plot ----------------------------------
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


#### ggplot Scatter Plot -------------------------------
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig5_ggplot_scatter.png", width = 600, height = 500)

ggplot(data=dScores, aes (x = questionnaire, y=d_score)) +
  geom_point() + 
  geom_smooth(method ="lm") +
  labs(title = "Correlation Between Questionnaire and D-Scores",
       x = "Questionnaire",
       y = "D-Scores") + 
  theme_classic()

dev.off() 

#### ggplot Custom Theme ---------------------------
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



