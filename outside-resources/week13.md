# Outside Resources Log - Week 13

## AI Prompts
- What does this error mean? > pulled_data <- data[data$trialType == "questionnairePartA", "response"]
Error in data$trialType : object of type 'closure' is not subsettable

- "Why am I getting this error: 'Error in [.data.frame(questionnaire, , rev_item) : 
  undefined columns selected?'"

- I moved score_questionnaire to before the loop and I'm getting this error Error in [.data.frame(questionnaire, , rev_item) : 
  undefined columns selected

- This is my code cor.test(d_score$dScores,
log10(questionnaire$dScores))  and I'm getting this error Error: object 'd_score' not found

- This is my code png("~/Desktop/psy1903/stats/data_cleaning/output/Fig4_ggplot_boxplot.png", width = 600, height = 500) ggplot(data=dScores, aes (x = whichPrime, y=d_score, fill=whichPrime)) + geom_boxplot() + labs(title = "Effect of Prime on D-Scores", I'm getting this error Error in theme_classic(legend.position = none) :  unused argument (legend.position = none)    

- Where would method "lm" be positioned in a ggplot() geom_point()?

## Outside Sites
- https://www.rdocumentation.org/packages/ggplot2/versions/3.5.0/topics/facet_wrap