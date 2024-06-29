use QPInventoryUpgrade


DELETE FROM mst_hyperlinks where hyperlinkId>=0
DELETE FROM mst_category where categoryId>=0
DELETE FROM mst_keywords where keywordId>=0
DELETE FROM tran_link_keyword where trackId>=0

DBCC CHECKIDENT ('mst_category', RESEED, 0);
DBCC CHECKIDENT ('mst_hyperlinks', RESEED, 0);
DBCC CHECKIDENT ('mst_keywords', RESEED, 0);
DBCC CHECKIDENT ('tran_link_keyword', RESEED, 0);
