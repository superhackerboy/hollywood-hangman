import re
import json
import requests
from bs4 import BeautifulSoup

# gets the IMDb ids for later api use
# separates all movies from all english movies
# * last scraped on October 14, 2020


page_num = 1
movie_ids = []
movie_data = []


while page_num <= 951:
    page = requests.get(
        f"https://www.imdb.com/search/title/?groups=top_1000&sort=user_rating,desc&start={page_num}&ref_=adv_nxt").text

    soup = BeautifulSoup(page, 'html.parser')
    ribbonize = soup.find_all('div', 'ribbonize')

    for movie in ribbonize:
        # extracts IMDb ID
        regex = re.search("tt\S{7}", str(movie))
        movie_ids.append(regex.group(0))

        print(regex.group(0))

    page_num += 50


# movies to remove because of too many numbers in title
movies_to_remove = ['tt1306980', 'tt8579674', 'tt0056801']
for movie in movies_to_remove:
    movie_ids.remove(movie)

# scrapes for json movie data
for movie_id in movie_ids:
    movie_json = requests.get(
        f"https://www.omdbapi.com/?i={movie_id}&apikey=80e59555").json()

    movie_json['imdbID'] = movie_id
    movie_data.append(movie_json)

    print(movie_json['Title'])


# converts to JSON and writes to file
with open('movie_data.json', 'w') as f:
    json.dump(movie_data, f)
