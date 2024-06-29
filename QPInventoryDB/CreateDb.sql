CREATE DATABASE QPInventoryUpgrade

USE QPInventoryUpgrade


CREATE TABLE mst_keywords(
	keywordId INT IDENTITY(1,1) PRIMARY KEY,
	keyword VARCHAR(100) UNIQUE
)

CREATE TABLE mst_category(
	categoryId INT IDENTITY(1,1) PRIMARY KEY,
	categoryName VARCHAR(100) UNIQUE,
	link VARCHAR(MAX),
	description VARCHAR(200)
)

CREATE TABLE mst_hyperlinks(
	hyperlinkId INT IDENTITY(1,1) PRIMARY KEY,
	hyperlink VARCHAR(MAX),
	categoryId INT FOREIGN KEY(categoryId) REFERENCES mst_category(categoryId) ON DELETE CASCADE,

)


CREATE TABLE tran_link_Keyword(
	trackId INT IDENTITY(1,1) PRIMARY KEY,
	hyperlinkId INT FOREIGN KEY(hyperlinkId) REFERENCES mst_hyperlinks(hyperlinkId) ON DELETE CASCADE,
	keywordId INT FOREIGN KEY(keywordId) REFERENCES mst_keywords(keywordId) ON DELETE CASCADE
)




