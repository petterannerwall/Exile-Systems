using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExileSystem.Models
{
    public static class LocalPlayer
    {
        public static Player player { get; set; }
        public static void Initialize()
        {
            player = new Player();
        }
    }



    public class Player
    {
        public string Account { get; set; }
        public string Character { get; set; }
        public string Area { get; set; }
        public string Guild { get; set; }
        public List<string> InArea { get; set; }

        public Player()
        {
            InArea = new List<string>();
        }
        
    }
}
