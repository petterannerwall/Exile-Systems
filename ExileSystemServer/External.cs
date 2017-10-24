using ExileModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ExileSystemServer
{
    public static class External
    {
        public static List<CurrencyObject> GetCurrencyRates(string league)
        {
            var html = String.Empty;
            var parameters = "?league=" + league;

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://poe.ninja/api/Data/GetCurrencyOverview?league=Hardcore%20Harbinger");
            request.AutomaticDecompression = DecompressionMethods.GZip;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                html = reader.ReadToEnd();
            }

            return JsonConvert.DeserializeObject<List<CurrencyObject>>(html);
        }
    }
}
