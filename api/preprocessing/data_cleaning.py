import pandas as pd
import ast

def clean_and_transform_csv(input_file, output_file):
    # Load the dataset
    df = pd.read_csv(input_file)

    # Keep only the relevant columns
    required_columns = ['name', 'description', 'topics', 'tagline']
    df = df[required_columns].copy()

    # Drop rows where any of the required fields are missing
    df.dropna(subset=['name', 'description', 'topics'], inplace=True)

    # Fill missing taglines with empty string
    df['tagline'] = df['tagline'].fillna('')

    # Combine tagline with description
    df['description'] = df['tagline'].str.strip() + ' ' + df['description'].str.strip()

    # Parse domain column from string to list
    def parse_domain(domain_str):
        try:
            return ast.literal_eval(domain_str)
        except (ValueError, SyntaxError):
            return [domain_str]  # Treat as single string if not list-like

    df['topics'] = df['topics'].apply(parse_domain)

    # Create a new DataFrame with one domain per row
    rows = []
    for _, row in df.iterrows():
        for domain in row['topics']:
            rows.append({
                'product_name': row['name'].strip(),
                'product_description': row['description'].strip(),
                'product_domain': domain.strip()
            })

    # Create final DataFrame
    final_df = pd.DataFrame(rows)

    # Save to new CSV
    final_df.to_csv(output_file, index=False)
    print(f"Cleaned data saved to {output_file}")

# Example usage
clean_and_transform_csv("E:\IdeaMate\datasets\postDatasets\posts.csv", "cleaned_posts.csv")
