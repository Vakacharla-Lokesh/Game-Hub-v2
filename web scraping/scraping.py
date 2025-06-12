from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import time

# Set up Selenium with Chrome
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Load the JSON file
with open('GameHubv2.games.json', 'r', encoding='utf-8') as file:
    games_data = json.load(file)

def get_image_url(game_title):
    search_query = game_title.replace(' ', '%20')
    url = f"https://www.crazygames.com/search?q={search_query}"
    driver.get(url)

    try:
        # Wait for the page to load and try different selectors
        WebDriverWait(driver, 10).until(
            lambda d: d.find_element(By.CSS_SELECTOR, 'a.game-thumb-test-class') or
                      d.find_elements(By.CSS_SELECTOR, 'a.GameThumb_gameThumbLinkDesktop__wcir5')
        )

        # Try to find the game link using different selectors
        game_link = driver.find_element(By.CSS_SELECTOR, 'a.game-thumb-test-class') or \
                    driver.find_element(By.CSS_SELECTOR, 'a.GameThumb_gameThumbLinkDesktop__wcir5')

        img_tag = game_link.find_element(By.TAG_NAME, 'img')
        return img_tag.get_attribute('src')
    except Exception as e:
        print(f"Error fetching data for {game_title}: {e}")
        return None

# Update the JSON data with image URLs
for game in games_data:
    if 'image_url' not in game or not game['image_url']:
        image_url = get_image_url(game['title'])
        game['image_url'] = image_url
        time.sleep(2)  # Add a delay to avoid overwhelming the server

# Save the updated JSON data back to the file
with open('updated_games_data.json', 'w', encoding='utf-8') as file:
    json.dump(games_data, file, ensure_ascii=False, indent=4)

# Close the Selenium driver
driver.quit()

print("Image URLs have been updated in the JSON file.")
