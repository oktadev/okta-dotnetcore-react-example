using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace okta_dotnetcore_react_example.Controllers
{
    public class DefaultController : Controller
    {
        public async Task<IActionResult> Index()
        {
            var data = new {
                name = "Simple React API",
                href = $"http://{Request.Host}{Request.Path}"
            };
            return Ok(data);
        }
    }
}