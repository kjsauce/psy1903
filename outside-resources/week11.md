# Outside Resources Log - Week 11


## AI Prompts
- why am I getting this error? in r? > for (file in files_list) {
+   # Step 2:Use read.csv to read in your file 
+   tmp <- read.csv(file)
+   
+   # Step 3: Assign participant ID as the basename of the file
+   participant_ID <- tools::file_path_sans_ext(basename(file))
+   
+   # Step 4: Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
+   dScores[i,"participant_ID"] <- participant_ID
+   
+   # Step 5: Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file
+ dscore[i,"d_score"] <- calculate_IAT_dscore()
+ 
+ # Step 6: Remove the temporary data file tmp
+ rm(tmp)
+ 
+ #Step 7: # Increase our row number variable i by one for the next iteration
+ #i <- i + 1
+ }
Error in dscore[i, "d_score"] <- calculate_IAT_dscore() : 
  incorrect number of subscripts on matrix

## Outside Sites
- None