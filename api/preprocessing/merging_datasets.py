import pandas as pd
import os

def combine_csv_files_by_column_names(input_folder, output_file):
    expected_columns = ['product_name', 'product_description', 'product_domain']
    all_dfs = []

    for i in range(1, 12):  # cleaned_output1.csv to cleaned_output11.csv
        file_path = os.path.join(input_folder, f"cleaned_output{i}.csv")
        try:
            df = pd.read_csv(file_path, on_bad_lines='skip')
            df.columns = df.columns.str.strip().str.lower()  # Standardize column names

            # Filter only the expected columns
            df = df[[col for col in expected_columns if col in df.columns]]

            # Reorder to expected format
            df = df.reindex(columns=expected_columns)
            all_dfs.append(df)
        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    combined_df = pd.concat(all_dfs, ignore_index=True)
    combined_df.dropna(how='all', inplace=True)  # Remove completely empty rows
    combined_df.to_csv(output_file, index=False)
    print(f"Combined CSV saved to {output_file}")

# Example usage
combine_csv_files_by_column_names(
    input_folder="E:\IdeaMate\\api\cleaned_datasets",
    output_file="E:\IdeaMate\\api\cleaned_datasets\combined_output.csv"
)
