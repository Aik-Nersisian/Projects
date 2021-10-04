using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using SQLite;
using Assignment2.Droid;
using Assignment2.Persistence;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xamarin.Forms;
using SQLite.Net.Platform.XamarinAndroid;

[assembly:Dependency(typeof(SQLiteDB))]

namespace Assignment2.Droid
{
    public class SQLiteDB : ISQLiteDb
    {

        public SQLiteAsyncConnection GetConnection()
        {


            var documentsPath = System.Environment.GetFolderPath(System.Environment.SpecialFolder.LocalApplicationData);
            var path = Path.Combine(documentsPath, "MySQLite.db3");


           var DB = new SQLiteAsyncConnection(path);

            return DB;

        }




    }
}