using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProbeAufgabe.Models
{
    public partial class PosMsg
    {
        [Key]
        [Column("ID", TypeName = "bigint")]
        public long Id { get; set; }
        [Column(TypeName = "bigint")]
        public long Unit { get; set; }
        [Column(TypeName = "bigint")]
        public long Drv { get; set; }
        [Required]
        [Column(TypeName = "datetime2")]
        public DateTime GpsT { get; set; }
        [Required]
        [Column(TypeName = "datetime2")]
        public byte[] Time { get; set; }
        [Column(TypeName = "int")]
        public long Lon { get; set; }
        [Column(TypeName = "int")]
        public long Lat { get; set; }
        public double Alt { get; set; }
        [Column("SA", TypeName = "tinyint")]
        public long Sa { get; set; }
        public double Spd { get; set; }
        public double Dir { get; set; }
        [Column(TypeName = "int")]
        public long Mil { get; set; }
        [Column(TypeName = "tinyint")]
        public long Rsn { get; set; }
        [Required]
        [Column(TypeName = "bit")]
        public byte[] IsValid { get; set; }
        [Required]
        [Column(TypeName = "bit")]
        public byte[] Unlock { get; set; }
        [Required]
        [Column(TypeName = "bit")]
        public byte[] Door { get; set; }
        [Required]
        [Column(TypeName = "bit")]
        public byte[] Shock { get; set; }
        [Required]
        [Column(TypeName = "bit")]
        public byte[] Distress { get; set; }
        [Required]
        [Column(TypeName = "bit")]
        public byte[] Ignition { get; set; }
    }
}
