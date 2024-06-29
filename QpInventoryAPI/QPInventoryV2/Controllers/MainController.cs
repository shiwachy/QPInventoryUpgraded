using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using QPInventoryV2.Models;
using QPInventoryV2.DataOps;
using System.Reflection.Metadata.Ecma335;

namespace QPInventoryV2.Controllers
{
    [EnableCors("allowInventoryCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : Controller
    {
        private readonly QpinventoryUpgradeContext _dbContext;
        public MainController(QpinventoryUpgradeContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        [HttpPost("PostCategory")]
        public IActionResult PostCategory(MstCategory obj)
        {
            DataOp Category = new DataOp(_dbContext);
            var objRes = Category.AddCategory(obj);
            return Ok(objRes);
        }

        [HttpGet("GetCategory")]
        public IActionResult GetCategory()
        {
            DataOp Category = new DataOp(_dbContext);
            string CategoryList = Category.GetCategory();
            return Ok(CategoryList);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            DataOp Category = new DataOp(_dbContext);
            string response = Category.DeleteCategory(id);
            return Ok(response);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCategory(MstCategory obj)
        {
            DataOp Category = new DataOp(_dbContext);
            string response = Category.UpdateCategory(obj);
            return Ok(obj);
        }


        [HttpGet("GetKeywords")]
        public IActionResult Getkeywords()
        {
            Keyword keyword = new Keyword(_dbContext);
            string response = keyword.GetKeyword();
            return Ok(response);
        }


        [HttpPost("PostHyperlink")]
        public IActionResult PostHyperlink(HyperlinkDto obj)
        {
            DtoSerivce dtoSerivce = new DtoSerivce(_dbContext);
            HyperlinkDto response = dtoSerivce.AddHyperlinkDto(obj);
            return Ok(obj);
        }


        [HttpGet("{id}")]
        public IActionResult GetHyperlink(int id)
        {
            DtoSerivce dtoSerivce = new DtoSerivce(_dbContext);
            List<HyperlinkDto> hyperlinkDto = dtoSerivce.getHyperlinksByCatId(id);
            return Ok(hyperlinkDto);
        }

        [HttpPost("GetHyperlinkInfo")]
        public IActionResult GetHyperlinkInfo([FromBody]string link)
        {
            DtoSerivce dtoService = new DtoSerivce(_dbContext);
            HyperlinkDto hyperlinkInfo = dtoService.GetHyperlinkInfo(link);
            return Ok(hyperlinkInfo);
        }


        [HttpPut("PutHyperlink")]
        public IActionResult PutHyperlink(HyperlinkDto obj)
        {
            DtoSerivce dtoServie = new DtoSerivce(_dbContext);
            HyperlinkDto hyperlink = dtoServie.UpdateHyyperlink(obj);
            return Ok(obj); 
        }
       

        [HttpPost("DeleteHyperlink")]
        public IActionResult DeleteHyperlink(HyperlinkDto obj)
        {
            Hyperlink hyperlink = new Hyperlink(_dbContext);
            string response = hyperlink.DeleteHyperlink(obj.HyperlinkId);
            return Ok(response);
        }

       
    }
}
