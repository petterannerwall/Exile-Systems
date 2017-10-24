using ExileModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Text;
using System.Threading.Tasks;

namespace ExileSystemServer
{
    public static class External
    {

        public static List<CurrencyObject> GetCurrencyRates(string league)
        {
            var html = String.Empty;
            var date = DateTime.Now.ToString("yyyy-MM-dd");
            var parameters = "?league=" + Uri.EscapeDataString(league) + "&date=" + date;
            var url = "http://poe.ninja/api/Data/GetCurrencyOverview" + parameters;

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.AutomaticDecompression = DecompressionMethods.GZip;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                html = reader.ReadToEnd();
            }

            var currencyResponse = JsonConvert.DeserializeObject<CurrencyResponse>(html);

            var currencyList = new List<CurrencyObject>();

            if (currencyResponse != null)
            {
                foreach (var line in currencyResponse.Lines)
                {
                    var currencyObject = new CurrencyObject()
                    {
                        Name = line.CurrencyTypeName,
                        Value = line.ChaosEquivalent,
                        Icon = currencyResponse.CurrencyDetails.FirstOrDefault(t => t.Name == line.CurrencyTypeName).Icon
                    };
                    currencyList.Add(currencyObject);
                }
            }

            return currencyList;
        }

        public static List<League> GetLeagues()
        {
            var leagueData = Database.GetLeagueData();

            if (leagueData == null)
            {
                var html = String.Empty;

                HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://api.pathofexile.com/leagues?type=main&compact=1");
                request.AutomaticDecompression = DecompressionMethods.GZip;

                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (Stream stream = response.GetResponseStream())
                using (StreamReader reader = new StreamReader(stream))
                {
                    html = reader.ReadToEnd();
                }

                leagueData = JsonConvert.DeserializeObject<List<League>>(html);

                foreach (League league in leagueData)
                {
                    league.CurrencyRates = GetCurrencyRates(league.Name);
                }

                Database.SetLeagueData(leagueData);
            }            

            return leagueData;
        }
    }
}
