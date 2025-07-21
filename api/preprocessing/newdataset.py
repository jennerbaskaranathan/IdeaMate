import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder

# Load the dataset
df = pd.read_csv('Refined_Dataset_ideamate - combined_output_filtered.csv')

# Remove duplicates
df_refined = df.drop_duplicates(subset='product_name')

# Text preprocessing for product descriptions
def preprocess_text(text):
    if isinstance(text, str):
        # Convert to lowercase
        text = text.lower()
        # Remove excessive punctuation and special characters
        # Add more preprocessing as needed
    return text

df_refined['processed_description'] = df_refined['product_description'].apply(preprocess_text)

# Create more balanced domain categories
threshold_upper = 500  # Maximum entries per category
threshold_lower = 20  # Minimum entries to keep as separate category

domain_counts = df_refined['product_domain'].value_counts()
major_domains = domain_counts[domain_counts >= threshold_lower].index.tolist()

# Stratified sampling for large categories
for domain in domain_counts[domain_counts > threshold_upper].index:
    domain_indices = df_refined[df_refined['product_domain'] == domain].index
    keep_indices = np.random.choice(domain_indices, threshold_upper, replace=False)
    drop_indices = list(set(domain_indices) - set(keep_indices))
    df_refined = df_refined.drop(drop_indices)

# Consolidate remaining small categories
small_domains = domain_counts[domain_counts < threshold_lower].index
df_refined['product_domain'] = df_refined['product_domain'].replace(small_domains, 'Other')

# Feature engineering
vectorizer = TfidfVectorizer(max_features=100)
description_features = vectorizer.fit_transform(df_refined['processed_description'])

# Convert to DataFrame for easier handling
features_df = pd.DataFrame(description_features.toarray(), 
                          columns=[f'feature_{i}' for i in range(description_features.shape[1])])

# Add important features to the refined dataset
df_refined = pd.concat([df_refined, features_df], axis=1)

# Encode categorical variables
encoder = LabelEncoder()
df_refined['domain_encoded'] = encoder.fit_transform(df_refined['product_domain'])

# Save the refined dataset
df_refined.to_csv('Refined_Dataset_Anti_Overfitting.csv', index=False)

# Print summary statistics
print(df_refined['product_domain'].value_counts())
print(f"Total entries after refinement: {len(df_refined)}")
