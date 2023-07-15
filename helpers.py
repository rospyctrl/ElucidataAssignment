## Libraries needed to execute all the code below
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

###############################################################################
#
# CODE TO READ THE DIFFERENTIAL EXPRESSION RESULT DATA
#
###############################################################################
de_results = pd.read_csv("./DE-results.csv", index_col = 0)
de_results["gene"] = de_results.index

###############################################################################
#
# CODE TO GENERATE THE VOLCANO PLOT
#
###############################################################################
significance_threshold = 0.0

# Create the volcano plot
plt.scatter(de_results['logFC'], -1 * (de_results['adj.P.Val'].apply(lambda x: -1 * (np.log10(x)))),
            color='black', alpha=0.5)

# Highlight significant points
significant_genes = de_results[de_results['adj.P.Val'] < significance_threshold]
plt.scatter(significant_genes['logFC'], -1 * (significant_genes['adj.P.Val'].apply(lambda x: -1 * (np.log10(x)))),
            color='red', alpha=0.5)

# Set plot labels and title
plt.xlabel('Fold Change')
plt.ylabel('-log10(P-value)')
plt.title('DE results: Volcano Plot')

# Show the plot
plt.gca().invert_yaxis()
plt.figure(figsize=(10, 6))
plt.show()
