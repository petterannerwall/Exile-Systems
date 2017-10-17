﻿using System;
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

    }
}
