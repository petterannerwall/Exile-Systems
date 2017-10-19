using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExileSystem.Models
{
    public class Requirement
    {
        public string Name { get; set; }
        public List<List<object>> Values { get; set; }
        public int DisplayMode { get; set; }
    }

    public class Property
    {
        public string Name { get; set; }
        public List<object> Values { get; set; }
        public int DisplayMode { get; set; }
        public int Type { get; set; }
    }

    public class Item
    {
        public bool Verified { get; set; }
        public int W { get; set; }
        public int H { get; set; }
        public int Ilvl { get; set; }
        public string Icon { get; set; }
        public string League { get; set; }
        public string Id { get; set; }
        public List<object> Sockets { get; set; }
        public string Name { get; set; }
        public string TypeLine { get; set; }
        public bool Identified { get; set; }
        public bool Corrupted { get; set; }
        public bool LockedToCharacter { get; set; }
        public List<Requirement> Requirements { get; set; }
        public List<string> ImplicitMods { get; set; }
        public List<string> ExplicitMods { get; set; }
        public int FrameType { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public string InventoryId { get; set; }
        public List<object> SocketedItems { get; set; }
        public List<Property> Properties { get; set; }
        public List<string> FlavourText { get; set; }
        public List<string> CraftedMods { get; set; }
        public List<string> EnchantMods { get; set; }
        public List<string> UtilityMods { get; set; }
        public string DescrText { get; set; }
    }

    public class Character
    {
        public string Name { get; set; }
        public string League { get; set; }
        public int ClassId { get; set; }
        public int AscendancyClass { get; set; }
        public string Class { get; set; }
        public int Level { get; set; }
    }

    public class GetItemsResponse
    {
        public List<Item> Items { get; set; }
        public Character Character { get; set; }
    }
}
