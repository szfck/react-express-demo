mongoexport --db tab-news --collection news --out myNews.json
mongoimport --db news-demo --collection news --file news.json --jsonArray

db.dropDatabase()
