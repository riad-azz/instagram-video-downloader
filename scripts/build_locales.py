import os
import json
import logging
from pathlib import Path 

# --- Constants ---
GREEN = '\033[92m'
BLUE = '\33[34m'
YELLOW = '\33[33m'
RED = '\033[91m' 
RESET = '\033[0m'

# Path objects for better path handling
BASE_DIR = Path("./src/features/i18n/messages")
OUTPUT_DIR = Path("./src/features/i18n/locales") 
MAIN_LANG = "en-US" 

# --- Logging Setup ---
def configure_logging():
    """Configures detailed logging."""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

# --- Core Logic ---
def build_language_data(lang_dir_path: Path) -> dict:
    """
    Builds a nested dictionary mirroring the file structure within a language directory.

    Args:
        lang_dir_path: Path object for the specific language directory (e.g., ./src/.../en-US).

    Returns:
        A dictionary containing the merged JSON data for the language.
    """
    language_data = {}
    logging.debug(f"Processing language directory: {lang_dir_path}")


    json_files = sorted(list(lang_dir_path.rglob("*.json")))

    if not json_files:
        logging.warning(f"No JSON files found in {lang_dir_path}")
        return {}

    for filepath in json_files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except json.JSONDecodeError:
            logging.error(f"{RED}Invalid JSON in file: {filepath}{RESET}")
            continue # Skip this file
        except Exception as e:
            logging.error(f"{RED}Error reading file {filepath}: {e}{RESET}")
            continue # Skip this file


        relative_path = filepath.relative_to(lang_dir_path)

        parts = list(relative_path.parts[:-1]) + [relative_path.stem]


        current_level = language_data
        for i, part in enumerate(parts):
            if i == len(parts) - 1: 
                if part in current_level and isinstance(current_level[part], dict):
                   logging.warning(f"{YELLOW}Key '{part}' from file {filepath} conflicts with an existing directory structure. Overwriting potentially nested data.{RESET}")
                current_level[part] = data
            else: 
                if part not in current_level:
                    current_level[part] = {}
                elif not isinstance(current_level[part], dict):
                     logging.warning(f"{YELLOW}Key '{part}' from directory structure conflicts with existing data from a file. Creating nested structure anyway, previous data might be lost.{RESET}")
                     current_level[part] = {} 
                current_level = current_level[part]

        logging.debug(f"Merged '{filepath.name}' into key path '{'.'.join(parts)}'")

    return language_data

def process_and_output_languages(base_dir: Path, output_dir: Path):
    """
    Processes each language directory, builds the combined data, and writes it to output JSON files.

    Args:
        base_dir: The root directory containing all language subdirectories.
        output_dir: The directory where combined JSON files will be written.
    """
    if not base_dir.is_dir():
        logging.error(f"{RED}Base directory not found: {base_dir}{RESET}")
        return


    try:
        output_dir.mkdir(parents=True, exist_ok=True)
        logging.info(f"Output directory set to: {output_dir.resolve()}")
    except OSError as e:
        logging.error(f"{RED}Could not create output directory {output_dir}: {e}{RESET}")
        return

    language_dirs = [d for d in base_dir.iterdir() if d.is_dir()]

    if not language_dirs:
        logging.warning(f"No language directories found in: {base_dir}")
        return

    all_languages_processed_data = {}

    for lang_dir_path in language_dirs:
        lang_code = lang_dir_path.name
        logging.info(f"{BLUE}--- Processing language: {lang_code} ---{RESET}")


        lang_data = build_language_data(lang_dir_path)
        all_languages_processed_data[lang_code] = lang_data

        if not lang_data:
            logging.warning(f"No data generated for language '{lang_code}', skipping output.")
            continue


        output_filepath = output_dir / f"{lang_code}.json"


        try:
            with open(output_filepath, 'w', encoding='utf-8') as f:
                json.dump(lang_data, f, indent=2, ensure_ascii=False)
            logging.info(f"{GREEN}Successfully wrote combined messages for '{lang_code}' to: {output_filepath}{RESET}")
        except IOError as e:
            logging.error(f"{RED}Could not write output file {output_filepath}: {e}{RESET}")
        except TypeError as e:
             logging.error(f"{RED}Data for '{lang_code}' could not be serialized to JSON: {e}{RESET}")




def extract_keys_from_dict(data: dict, prefix: str = "") -> set:
    """Recursively extracts fully qualified keys from a nested dictionary."""
    keys = set()
    for k, v in data.items():
        new_prefix = f"{prefix}{k}"
        if isinstance(v, dict) and v: 
             keys.update(extract_keys_from_dict(v, new_prefix + "."))
        elif not isinstance(v, dict):
            keys.add(new_prefix)

    return keys

def perform_key_consistency_check(all_language_data: dict):
    """Checks if all processed languages have the same message keys."""
    if not all_language_data or len(all_language_data) < 2:
        logging.info("Skipping key consistency check (not enough language data).")
        return

    logging.info(f"{YELLOW}--- Performing Key Consistency Check ---{RESET}")

    all_language_keys = {
        lang: extract_keys_from_dict(data)
        for lang, data in all_language_data.items()
    }


    ref_lang = MAIN_LANG if MAIN_LANG in all_language_keys else next(iter(all_language_keys))
    expected_keys = all_language_keys[ref_lang]
    logging.info(f"Reference language for keys: '{ref_lang}' ({len(expected_keys)} keys)")

    all_keys_match = True
    for lang, keys in all_language_keys.items():
        if lang == ref_lang:
            continue

        if keys != expected_keys:
            all_keys_match = False
            missing_keys = expected_keys - keys
            extra_keys = keys - expected_keys
            logging.error(f"{RED}Language '{lang}' has key differences compared to '{ref_lang}':{RESET}")
            if missing_keys:
                logging.error(f"  Missing keys ({len(missing_keys)}): {sorted(list(missing_keys))}")
            if extra_keys:
                logging.error(f"  Extra keys ({len(extra_keys)}): {sorted(list(extra_keys))}")

    if all_keys_match:
        logging.info(f"{GREEN}Key Consistency Check Passed: All languages have the same message keys ✅{RESET}")
    else:
        logging.error(f"{RED}Key Consistency Check Failed: Not all languages have the same message keys ❌{RESET}")


# --- Main Execution ---
if __name__ == "__main__":
    configure_logging()
    logging.info("Starting i18n message processing...")
    process_and_output_languages(BASE_DIR, OUTPUT_DIR)

    logging.info("Processing finished.")