# Setup file template to upload data to MongoDB Atlas
mongoimport --uri "mongodb://ac-9lobp0w-shard-00-00.fskpej5.mongodb.net:27017,ac-9lobp0w-shard-00-01.fskpej5.mongodb.net:27017,ac-9lobp0w-shard-00-02.fskpej5.mongodb.net:27017/xflix?replicaSet=atlas-x045xf-shard-0" --ssl --authenticationDatabase admin --username saisantoshduddu98 --password DUddu@8315 --drop --collection videos --file data/export_videos.json