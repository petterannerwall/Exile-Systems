using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExileSystem.Models
{
    public static class LocalPlayer
    {
        public static string Account { get; set; }
        public static string Character { get; set; }
        public static string Area { get; set; }
        public static string Guild { get; set; }
        public static List<string> InArea { get; set; }
        
        public static void Initialize()
        {
            InArea = new List<string>();
        }
    }
}
