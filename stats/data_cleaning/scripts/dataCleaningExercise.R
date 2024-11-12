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
