using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace okta_dotnetcore_react_example.Controllers
{
    public class NotesController : Controller
    {
        public async Task<IActionResult> Index()
        {
            var notes = new []{
                new {
                    User = "leebrandt",
                    Message = "Remember to do something"
                },
                new {
                    User = "leebrandt",
                    Message = "Working hard, man!"
                }
            };

            return Ok(notes);
        }
    }
}