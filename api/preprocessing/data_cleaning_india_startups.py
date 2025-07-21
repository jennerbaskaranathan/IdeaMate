import pandas as pd

def clean_and_transform_simple_csv(input_file, output_file):
    # Try a more compatible encoding
    df = pd.read_csv(input_file, encoding='ISO-8859-1')

    df.columns = df.columns.str.strip().str.lower()

    column_mapping = {
        'company name': 'product_name',
        'what it does': 'product_description',
        'sector': 'product_domain'
    }

    for col in column_mapping.keys():
        if col not in df.columns:
            raise KeyError(f"Missing column: '{col}' in input CSV.")

    cleaned_df = df[list(column_mapping.keys())].rename(columns=column_mapping)
    cleaned_df.dropna(subset=['product_name', 'product_description', 'product_domain'], inplace=True)

    for col in cleaned_df.columns:
        cleaned_df[col] = cleaned_df[col].astype(str).str.strip()

    cleaned_df.to_csv(output_file, index=False)
    print(f"Cleaned data saved to {output_file}")


# Example usage
clean_and_transform_simple_csv("E:\IdeaMate\datasets\indianStartups\Indian Startups - Funding  Investors Data May 2022.csv", "cleaned_datasets\cleaned_output6.csv")
