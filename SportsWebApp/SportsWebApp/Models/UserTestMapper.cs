using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportsWebApp.Models
{
    public class UserTestMapper
    {
        [Key]
        public int ID { get; set; }
        public int UserID { get; set; }
        public int TestID { get; set; }
        public double? CooperTestDistance { get; set; }
        public int? SprintTestTime { get; set; }
        public string FitnessRating { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }

        [ForeignKey("TestID")]
        [NotMapped]
        public virtual Test Test { get; set; }
    }
}
