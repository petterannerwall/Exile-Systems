using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Media.Imaging;

namespace ExileSystem
{
    public static class Helpers
    {
        public static string SubstringBefore(string text, string before)
        {
            return text.Substring(0, text.IndexOf(before));
        }

        public static string SubstringAfter(string text, string after)
        {
            return text.Substring(text.IndexOf(after) + after.Length);
        }

        public static string SubstringBetween(string text, string start, string end)
        {
            return text.Substring((text.IndexOf(start) + start.Length), (text.IndexOf(end) - text.IndexOf(start) - start.Length));
        }

        public static string ImageToBase64String(this Image image)
        {
            ImageConverter converter = new ImageConverter();
            var byteArray = (byte[])converter.ConvertTo(image, typeof(byte[]));
            return Convert.ToBase64String(byteArray);
        }

        public static BitmapImage Base64StringToImagesouce(this string base64string)
        {
            byte[] bitmapByteArray = Convert.FromBase64String(base64string);
            var imageSource = new BitmapImage();
            using (var bmpStream = new MemoryStream(bitmapByteArray))
            {
                imageSource.BeginInit();
                imageSource.StreamSource = bmpStream;
                imageSource.CacheOption = BitmapCacheOption.OnLoad;
                imageSource.EndInit();
            }
            return imageSource;
        }

        public static Image Base64StringToImage(this string base64string)
        {
            byte[] bitmapByteArray = Convert.FromBase64String(base64string);

            using (var memoryStream = new MemoryStream(bitmapByteArray))
            {
                return new Bitmap(memoryStream);
            }
        }

        public static string GetChannel()
        {
            var random = new Random();
            const string chars = "ABC123";
            string code = new string(Enumerable.Repeat(chars, 5).Select(s => s[random.Next(s.Length)]).ToArray());
            return code;
        }

    }
}
