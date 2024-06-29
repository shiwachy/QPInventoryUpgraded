using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using QPInventoryV2.Models;
using System.Text.Json;

namespace QPInventoryV2.DataOps
{
    public class DataOp
    {
        private readonly QpinventoryUpgradeContext _dbContext;
        public DataOp()
        {

        }
        public DataOp(QpinventoryUpgradeContext _dbContext) {
            this._dbContext = _dbContext;
        }

        public MstCategory AddCategory(MstCategory obj)
        {
            {
                try
                {
                    bool check = _dbContext.MstCategories.Any(x => x.CategoryName == obj.CategoryName);
                    if (!check)
                    {
                        _dbContext.MstCategories.Add(obj);
                        _dbContext.SaveChanges();
                    }
                    return obj;
                }
                catch (Exception ex)
                {
                    throw new Exception("An error occurred while adding the category.", ex);
                }
            }
        }
        
        public string GetCategory() {
            try
            {
                List<MstCategory> mstCategories = _dbContext.MstCategories.ToList();
                string jsonString = JsonSerializer.Serialize(mstCategories);
                return jsonString;
            }
            catch (Exception ex)
            {
                // Log the exception (not shown here for brevity)
                throw new Exception("An error occurred while fetching the category.", ex);
            }
        }

        public string DeleteCategory(int id)
        {
            try
            {
                var category = _dbContext.MstCategories.FirstOrDefault(c => c.CategoryId == id);
                if (category == null)
                {
                    return "Category not found.";
                }
                _dbContext.MstCategories.Remove(category);
                _dbContext.SaveChanges();
                return "Category deleted successfully.";
            }
            catch(Exception ex) 
            {
                throw new Exception("An error occurred while fetching the category.", ex);
            }
            
           
        }

        public string UpdateCategory(MstCategory obj)
        {
            try
            {
                var existingCategory = _dbContext.MstCategories.FirstOrDefault(x=>x.CategoryId== obj.CategoryId);
                if (existingCategory == null)
                {
                    throw new Exception("Category not fouund");
                }
                else
                {
                    existingCategory.Link = obj.Link;
                    existingCategory.CategoryName = obj.CategoryName;
                    existingCategory.Description = obj.Description;
                    _dbContext.SaveChanges();
                    return "Category Updated Successfully";
                }
            }catch (Exception ex)
            {
                throw new Exception("An error occurred while Updating the category.", ex);
            }
        }
             
    }

    
    public class Keyword
    {
        private QpinventoryUpgradeContext _dbContext;
        public Keyword(QpinventoryUpgradeContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public string GetKeyword()
        {
            try
            {
               List<MstKeyword> mstKeywords = _dbContext.MstKeywords.ToList();
               string jsonStrin = JsonSerializer.Serialize(mstKeywords);
               return jsonStrin;
            }
            catch (Exception ex) { 
                throw new Exception(ex.Message, ex);
            }
        }

        public int[] AddKeywords(List<MstKeyword> _keyword)
        {
            List<MstKeyword> newKeywords = new List<MstKeyword>();
            List<MstKeyword> oldKeywords = new List<MstKeyword>();
            List<int> keywordIds = new List<int>();

            foreach(MstKeyword keyword in _keyword)
            {
                if(keyword.KeywordId == 0)
                {
                    newKeywords.Add(keyword);
                }
                else
                {
                    oldKeywords.Add(keyword);
                }
            }
            _dbContext.AddRange(newKeywords);
            _dbContext.SaveChanges();

            foreach (MstKeyword keyword in oldKeywords)
            {
                keywordIds.Add(keyword.KeywordId);
            }
            foreach(MstKeyword keyword in newKeywords)
            {
                keywordIds.Add(keyword.KeywordId);
            }
            return keywordIds.ToArray();
        }

        public List<MstKeyword> GetKeywordsByLinkId(int linkId)
        {

            List<int?> keywordIds = _dbContext.TranLinkKeywords
                                          .Where(k => k.HyperlinkId == linkId)
                                          .Select(k => k.KeywordId)
                                          .ToList();
            List<MstKeyword> keywords = _dbContext.MstKeywords
                            .Where(k => keywordIds.Contains(k.KeywordId))
                            .Select(k => k)
                            .ToList();
            if (keywords == null)
            {
                throw new InvalidOperationException($"No hyperlink found for link: {keywords}");
            }
            else
            {
                return keywords;
            }

        }


    }



    public class Hyperlink
    {
        private QpinventoryUpgradeContext _dbContext;
        public Hyperlink() { }
        public Hyperlink(QpinventoryUpgradeContext dbContext) { 
            this._dbContext = dbContext; 
        }
        public int AddHyperlink(HyperlinkDto obj)
        {
            MstHyperlink _hyperlink = new MstHyperlink();
            _hyperlink.Hyperlink = obj.Hyperlink;
            _hyperlink.CategoryId = obj.CategoryId;
            _dbContext.MstHyperlinks.AddRange(_hyperlink);
            _dbContext.SaveChanges();
            return _hyperlink.HyperlinkId;
        }
        public List<MstHyperlink> GetHyperlinks(int CatId)
        {
            List<MstHyperlink> _hyperlinks = _dbContext.MstHyperlinks
                                              .Where(x => x.CategoryId == CatId)
                                              .ToList();
            return _hyperlinks;
       
        }

        public string DeleteHyperlink(int id)
        {
            try
            {
                var hyperlink = _dbContext.MstHyperlinks.FirstOrDefault(h=>h.HyperlinkId == id);
                if (hyperlink == null)
                {
                    return "Category not found.";
                }
                _dbContext.MstHyperlinks.Remove(hyperlink);
                _dbContext.SaveChanges();
                return "Category deleted successfully.";
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching the category.", ex);
            }
        }
        


    }














}
