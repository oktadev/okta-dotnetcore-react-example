using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using okta_dotnetcore_react_example.Data;
using okta_dotnetcore_react_example.Models;

namespace okta_dotnetcore_react_example.Controllers
{
  [Authorize]
  [Route("/api/[controller]")]
  public class SessionsController : Controller
  {
    private readonly ApiContext context;
    public SessionsController(ApiContext context)
    {
      this.context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
      var userId = User.Claims.SingleOrDefault(u=>u.Type == "uid")?.Value;
      var sessions = context.Sessions.Where(x=>x.UserId == userId).ToList(); 
      return Ok(sessions);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Session session)
    {
      session.UserId = User.Claims.SingleOrDefault(u=>u.Type == "uid")?.Value;
      context.Add<Session>(session);
      context.SaveChanges();
      return Created($"api/sessions/{session.SessionId}", session);
    }

    [HttpDelete("/api/sessions/{sessionId}")]
    public IActionResult Delete(int sessionId){
      var session = context.Sessions.SingleOrDefault(sess => sess.SessionId == sessionId);
      context.Remove(session);
      context.SaveChanges();
      return Ok();
    }


  }
}