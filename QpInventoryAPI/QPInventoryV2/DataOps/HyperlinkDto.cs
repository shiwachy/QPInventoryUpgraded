using Microsoft.EntityFrameworkCore;
using QPInventoryV2.Models;
using System.Linq;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace QPInventoryV2.DataOps
{
    public class HyperlinkDto
    {

        public int HyperlinkId { get; set; }
        public int CategoryId { get; set; }
        public string Hyperlink {  get; set; }
        public List<MstKeyword> Keywords { get; set; }

    }



    public class DtoSerivce
    {
        private readonly QpinventoryUpgradeContext _dbContext;
        public DtoSerivce(QpinventoryUpgradeContext dbContext)
        {
            _dbContext = dbContext;
        }

        public HyperlinkDto AddHyperlinkDto(HyperlinkDto obj)
        {
            try
            {
                Keyword _keyword = new Keyword(_dbContext);
                Hyperlink _hyperlink = new Hyperlink(_dbContext);
                int[] KeywordIds = _keyword.AddKeywords(obj.Keywords);
                int HyperlinkId = _hyperlink.AddHyperlink(obj);

                foreach (int id in KeywordIds)
                {
                    TranLinkKeyword _tranLinkKeyword = new TranLinkKeyword();
                    _tranLinkKeyword.HyperlinkId = HyperlinkId;
                    _tranLinkKeyword.KeywordId = id;
                    _dbContext.TranLinkKeywords.Add(_tranLinkKeyword);
                    _dbContext.SaveChanges();
                }
                return obj;
            }
            catch(Exception ex) 
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public List<HyperlinkDto> getHyperlinksByCatId(int id)
        {
            try
            {
                Hyperlink _hyperlink = new Hyperlink(_dbContext);
                Keyword _keyword = new Keyword(_dbContext);

                List<HyperlinkDto> hyperlinksDto = new List<HyperlinkDto>();
                List<MstHyperlink> mstHyperlink = _hyperlink.GetHyperlinks(id);

                foreach (MstHyperlink link in mstHyperlink)
                {
                    HyperlinkDto hyperlinkDto = new HyperlinkDto();
                    List<MstKeyword> mstKeyword = _keyword.GetKeywordsByLinkId(link.HyperlinkId);

                    hyperlinkDto.CategoryId = (int)link.CategoryId;
                    hyperlinkDto.HyperlinkId = link.HyperlinkId;
                    hyperlinkDto.Hyperlink = link.Hyperlink;
                    hyperlinkDto.Keywords = mstKeyword;
                    hyperlinksDto.Add(hyperlinkDto);
                }
                return hyperlinksDto;
            }catch(Exception ex)
            {
                throw new Exception (ex.Message, ex);
            }
        }


        public HyperlinkDto GetHyperlinkInfo(string link)
        {
            HyperlinkDto hyperlinkDto = new HyperlinkDto();
            Keyword keyword = new Keyword(_dbContext);
            MstHyperlink hyperlink = _dbContext.MstHyperlinks.FirstOrDefault(x => x.Hyperlink == link);
            if (hyperlink != null) 
            {
                List<MstKeyword> keywords = keyword.GetKeywordsByLinkId(hyperlink.HyperlinkId);
                hyperlinkDto.HyperlinkId = hyperlink.HyperlinkId;
                hyperlinkDto.CategoryId = (int)hyperlink.CategoryId;
                hyperlinkDto.Hyperlink = hyperlink.Hyperlink;
                hyperlinkDto.Keywords = keywords;
            }
            else
            {
                throw new Exception("Hyperlink Not fouund");
            }
            return hyperlinkDto;


        }

        public HyperlinkDto GetHyperlinkById(int id)
        {
            HyperlinkDto hyperlinkDto = new HyperlinkDto();
            Keyword keyword = new Keyword(_dbContext);
            MstHyperlink hyperlink = _dbContext.MstHyperlinks.FirstOrDefault(x => x.HyperlinkId == id);
            if (hyperlink != null)
            {
                List<MstKeyword> keywords = keyword.GetKeywordsByLinkId(hyperlink.HyperlinkId);
                hyperlinkDto.HyperlinkId = hyperlink.HyperlinkId;
                hyperlinkDto.CategoryId = (int)hyperlink.CategoryId;
                hyperlinkDto.Hyperlink = hyperlink.Hyperlink;
                hyperlinkDto.Keywords = keywords;
            }
            else
            {
                throw new Exception("Hyperlink Not found");
            }
            return hyperlinkDto;
        }

        public HyperlinkDto UpdateHyyperlink(HyperlinkDto obj)
        {
            try
            {
                Keyword _keyword = new Keyword(_dbContext);
                HyperlinkDto hyperlinkDto = GetHyperlinkById(obj.HyperlinkId);
                int[] RevivedKeywordIds = _keyword.AddKeywords(obj.Keywords);
                List<int> OldKeywordIds = new List<int>();
                foreach(MstKeyword key in hyperlinkDto.Keywords)
                {
                    OldKeywordIds.Add(key.KeywordId);
                }
                //Updating keywords
                List<int> extraKeywordIds = OldKeywordIds.Except(RevivedKeywordIds).ToList();
                List<int> newKewordIds = RevivedKeywordIds.Except(OldKeywordIds).ToList();
                if (hyperlinkDto.CategoryId != obj.CategoryId)
                {
                    var hyperlink = _dbContext.MstHyperlinks.FirstOrDefault(h => h.HyperlinkId == obj.HyperlinkId);
                    if(hyperlink != null)
                    {
                        hyperlink.CategoryId = obj.CategoryId;
                    }
                }

                var oldKeywordRelations = _dbContext.TranLinkKeywords
                    .Where(tlk => tlk.HyperlinkId == obj.HyperlinkId && extraKeywordIds.Contains((int)tlk.KeywordId))
                    .ToList();

                _dbContext.TranLinkKeywords.RemoveRange(oldKeywordRelations);

                foreach (int id in newKewordIds)
                {
                    TranLinkKeyword _tranLinkKeyword = new TranLinkKeyword();
                    _tranLinkKeyword.HyperlinkId = obj.HyperlinkId;
                    _tranLinkKeyword.KeywordId = id;
                    _dbContext.TranLinkKeywords.Add(_tranLinkKeyword);
                    _dbContext.SaveChanges();
                }
                _dbContext.SaveChanges();
            }
            catch(Exception ex)
            {
                throw new Exception($"{ex.Message}", ex);
            }
            return obj;
        }








        


    }





}
