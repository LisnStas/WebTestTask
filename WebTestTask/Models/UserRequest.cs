using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebTestTask.Model
{
    public class UserRequest
    {
        public int Id { get; set; }
        public User CurrentUser { get; set; }
        public int CurrentUserId { get; set; }

        [Display(Name = "Address")]
        [DataType(DataType.Text), MaxLength(50)]
        public string Address { get; set; }

        [Display(Name = "Description")]
        [DataType(DataType.Text), MaxLength(100)]
        public string Description { get; set; }

        [Display(Name = "Date")]
        [Required, DataType(DataType.DateTime)]
        public DateTime? Date { get; set; }
    }
}
