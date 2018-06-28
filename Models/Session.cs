using System.ComponentModel.DataAnnotations;

namespace okta_dotnetcore_react_example.Models
{
    public class Session
    {
        [Key]
        public int SessionId { get; set; }

        public string UserId { get; set; }
        public string Title { get; set; }
        public string Abstract { get; set; }
    }
}