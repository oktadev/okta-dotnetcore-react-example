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
    public IActionResult GetAllSessions()
    {
      var userId = User.Claims.SingleOrDefault(u=>u.Type == "uid")?.Value;
      var sessions = context.Sessions.Where(x=>x.UserId == userId).ToList(); 
      return Ok(sessions);
    }

    [HttpGet("/api/sessions/{sessionId}")]
    public IActionResult GetSessionById(int sessionId){
      var session = context.Sessions.SingleOrDefault(x=>x.SessionId == sessionId);
      if(session == null){
        return NotFound();
      }
      return Ok(session);
    }

    [HttpPost]
    public IActionResult AddSession([FromBody] Session session)
    {
      session.UserId = User.Claims.SingleOrDefault(u=>u.Type == "uid")?.Value;
      context.Add<Session>(session);
      context.SaveChanges();
      return Created($"api/sessions/{session.SessionId}", session);
    }

    [HttpPost("/api/sessions/{sessionId}")]
    public IActionResult UpdateSession([FromBody] Session session)
    {
      var savedSession = context.Sessions.SingleOrDefault(x=>x.SessionId == session.SessionId);
      if(savedSession.UserId != User.Claims.SingleOrDefault(u=>u.Type == "uid")?.Value)
      {
        return Unauthorized();
      }
      savedSession.Title = session.Title;
      savedSession.Abstract = session.Abstract;
      context.SaveChanges();
      return Ok(savedSession);
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