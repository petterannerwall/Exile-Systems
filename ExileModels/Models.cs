using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace ExileModels
{
    [Serializable]
    public class League
    {
        [JsonProperty("id")]
        public string Name { get; set; }
        [JsonProperty("endAt")]
        public string EndAt { get; set; }
        [JsonProperty("startAt")]
        public string StartAt { get; set; }
        [JsonProperty("url")]
        public string Url { get; set; }
        [JsonProperty("currencyRates")]
        public List<CurrencyObject> CurrencyRates { get; set;}
        [JsonProperty("lastUpdate")]
        public DateTime LastUpdate { get; set; }

        public League()
        {
            LastUpdate = DateTime.Now;
        }

    }

    [Serializable]
    public class CurrencyObject
    {
        public string Name { get; set; }
        public double Value { get; set; }
        public string Icon { get; set; }
    }

    [Serializable]
    public class Requirement
    {
        public string Name { get; set; }
        public List<List<object>> Values { get; set; }
        public int DisplayMode { get; set; }
    }

    [Serializable]
    public class Property
    {
        public string Name { get; set; }
        public List<object> Values { get; set; }
        public int DisplayMode { get; set; }
        public int Type { get; set; }
    }

    [Serializable]
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

    [Serializable]
    public class Character
    {
        public string Name { get; set; }
        public string League { get; set; }
        public int ClassId { get; set; }
        public int AscendancyClass { get; set; }
        public string Class { get; set; }
        public int Level { get; set; }
        public List<Item> Items { get; set; }
    }

    [Serializable]
    public class GetItemsResponse
    {
        public List<Item> Items { get; set; }
        public Character Character { get; set; }
    }

    [Serializable]
    public class Player
    {
        public string ConnectionID { get; set; }
        public string Channel { get; set; }
        public string Account { get; set; }
        public Character Character { get; set; }
        public string Area { get; set; }
        public string Guild { get; set; }
        public List<string> InArea { get; set; }

        public Player()
        {
            InArea = new List<string>();
        }
    }

    [Serializable]
    public class Channel
    {
        public string Id { get; set; }
        public List<Player> Players { get; set; }
        public Channel(string id)
        {
            Id = id;
            Players = new List<Player>();
        }
    }

    public partial class CurrencyResponse
    {
        [JsonProperty("currencyDetails")]
        public CurrencyDetail[] CurrencyDetails { get; set; }

        [JsonProperty("lines")]
        public CurrencyData[] Lines { get; set; }
    }

    public class CurrencyDetail
    {
        [JsonProperty("icon")]
        public string Icon { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }        
    }

    public class CurrencyData
    {
        [JsonProperty("currencyTypeName")]
        public string CurrencyTypeName { get; set; }        

        [JsonProperty("chaosEquivalent")]
        public double ChaosEquivalent { get; set; }
    }

    public class ChannelArea
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<string> Players { get; set; }
    }
    
}
