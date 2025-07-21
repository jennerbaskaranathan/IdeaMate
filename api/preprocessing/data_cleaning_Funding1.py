import pandas as pd

def clean_and_transform_simple_csv(input_file, output_file):
    # Load and normalize column names
    df = pd.read_csv(input_file)
    df.columns = df.columns.str.strip().str.lower()

    # Map required columns
    column_mapping = {
        'company/brand': 'product_name',
        'what it does': 'product_description',
        'sector': 'product_domain'
    }

    for col in column_mapping:
        if col not in df.columns:
            raise KeyError(f"Missing column: '{col}' in input CSV.")

    # Keep only needed columns and rename
    cleaned_df = df[list(column_mapping)].rename(columns=column_mapping)

    # Drop rows with missing key fields
    cleaned_df.dropna(subset=['product_name', 'product_description', 'product_domain'], inplace=True)

    # Clean strings
    for col in cleaned_df.columns:
        cleaned_df[col] = cleaned_df[col].astype(str).str.strip()

    # Split comma-separated domains into separate rows
    cleaned_df['product_domain'] = cleaned_df['product_domain'].str.split(',')
    cleaned_df = cleaned_df.explode('product_domain')
    cleaned_df['product_domain'] = cleaned_df['product_domain'].str.strip()

    # Save final output
    cleaned_df.to_csv(output_file, index=False)
    print(f"Cleaned data saved to {output_file}")

# Example usage
clean_and_transform_simple_csv(
    "E:\IdeaMate\datasets\startupsFunding\startup_funding2018.csv",
    "cleaned_datasets\cleaned_output8.csv"
)
