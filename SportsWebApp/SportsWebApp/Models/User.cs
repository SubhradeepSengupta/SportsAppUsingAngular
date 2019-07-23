using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SportsWebApp.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public UserRole Role { get; set; }
        //public virtual ICollection<UserTestMapper> UserTestMappers { get; set; }
    }

    public enum UserRole
    {
        Coach,
        Athlete
    }
}
