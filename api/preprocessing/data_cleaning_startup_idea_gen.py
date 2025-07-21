import pandas as pd

def clean_and_transform_simple_csv(input_file, output_file):
    df = pd.read_csv(input_file)

    # Rename columns
    df.rename(columns={
        "Startup Name": "product_name",
        "Industry": "product_domain",
        "Full Description": "product_description",
        "Short Description": "tagline"
    }, inplace=True)

    # Combine tagline with product_description
    df['product_description'] = df['tagline'].astype(str).str.strip() + ' ' + df['product_description'].astype(str).str.strip()

    # Select relevant columns
    df = df[['product_name', 'product_domain', 'product_description']]

    # Drop rows with missing values in important fields
    df.dropna(subset=['product_name', 'product_domain', 'product_description'], inplace=True)

    # Save to CSV
    df.to_csv(output_file, index=False)
    
# Example usage
clean_and_transform_simple_csv(
    "E:\IdeaMate\datasets\startupIdeaGenerator\startup_idea_generator.csv",
    "cleaned_datasets/cleaned_output7.csv"
)
