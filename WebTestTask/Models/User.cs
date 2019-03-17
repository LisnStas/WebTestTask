using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebTestTask.Model
{
    public class User
    {
      
        public int Id { get; set; }

        [Display(Name = "Name")]
        [Required, DataType(DataType.Text), StringLength(25, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        public string Name { get; set; }

        [Display(Name = "Email")]
        [Required, DataType(DataType.EmailAddress), StringLength(50, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 5)]
        public string Email { get; set; }

        [Display(Name = "Number")]
        [Required, DataType(DataType.PhoneNumber), StringLength(13, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        public string Number { get; set; }

        public List<UserRequest> UserRequests { get; set; }

    }
}