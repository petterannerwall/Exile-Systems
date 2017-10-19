using ExileModels;
using ExileSystem.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ExileSystem.Classes
{
    public class ExternalResources
    {
        public ExternalResources()
        {

        }

        public Character GetItemsFromPoE(string account, string character)
        {
            string url = "https://www.pathofexile.com/character-window/get-items";
            string parameters = $"accountName={account}&character={character}";
            string response = MakeRequest(url, parameters);

            if (response == null)
                return null;

            GetItemsResponse ItemsResponse = JsonConvert.DeserializeObject<GetItemsResponse>(response);

            var newChar = ItemsResponse.Character;
            newChar.Items = ItemsResponse.Items;

            return newChar;
        }
        
        public List<Character> GetCharactersFromPoE(string account)
        {
            string url = "https://www.pathofexile.com/character-window/get-characters";
            string parameters = $"accountName={account}";
            string response = MakeRequest(url, parameters);
            List<Character> CharactersResponse = JsonConvert.DeserializeObject<List<Character>>(response);
            return CharactersResponse;
        }

        //http://www.hanselman.com/blog/HTTPPOSTsAndHTTPGETsWithWebClientAndCAndFakingAPostBack.aspx
        private string MakeRequest(string url, string parameters)
        {
            try
            {
                WebRequest req = WebRequest.Create(url);
                req.ContentType = "application/x-www-form-urlencoded";
                req.Method = "POST";
                byte[] bytes = Encoding.ASCII.GetBytes(parameters);
                req.ContentLength = bytes.Length;
                Stream os = req.GetRequestStream();
                os.Write(bytes, 0, bytes.Length);
                os.Close();
                WebResponse resp = req.GetResponse();
                if (resp == null) return null;
                StreamReader sr = new StreamReader(resp.GetResponseStream());
                return sr.ReadToEnd().Trim();
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
