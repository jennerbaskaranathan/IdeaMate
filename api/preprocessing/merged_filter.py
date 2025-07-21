import pandas as pd

# Load the CSV file into a DataFrame
df = pd.read_csv('Refined_Dataset_Anti_Overfitting.csv')

# Function to count words in a string
def count_words(text):
    if isinstance(text, str) and text.strip():  # Check if text is a non-empty string
        return len(text.split())
    return 0  # Return 0 for NaN, float, or blank values

# Remove rows with NaN, float, or blank values in 'product_description'
df_cleaned = df.dropna(subset=['product_description'])  # Drop rows with NaN in 'product_description'
df_cleaned = df_cleaned[df_cleaned['product_description'].apply(count_words) >= 30]  # Filter rows with less than 30 words

# Save the cleaned and filtered DataFrame to a new CSV file
df_cleaned.to_csv('combined_output_filtered.csv', index=False)
