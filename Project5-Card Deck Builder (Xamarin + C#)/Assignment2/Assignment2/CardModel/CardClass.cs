using Assignment2.CardModel;
using SQLite;
using SQLiteNetExtensions.Attributes;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows.Input;
using Xamarin.Forms;

namespace Assignment2
{
    public class CardClass : INotifyPropertyChanged
    {

        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }
        public int attack { get; set; }
        public int cost { get; set; }
        public int dbfId { get; set; }
        public int health { get; set; }

        [MaxLength(255)]
        public string name { get; set; }

        [MaxLength(255)]
        public string rarity { get; set; }

        [MaxLength(255)]
        public string text { get; set; }

        [MaxLength(255)]
        public string type { get; set; }
        private string image;
        private int numberInTheDeck;

        public event PropertyChangedEventHandler PropertyChanged;

        [MaxLength(255)]
        public string Image { get => image; set => image = value; }

        public CardClass()
        {
            attack = 0;
            cost = 0;
            dbfId = 0;
            health = 0;
            name = "";
            rarity = "";
            text = "";
            type = "";
            image = "";
          
        }
        public int NumberInTheDeck
        {
            get
            {
                return numberInTheDeck;
            }
            set
            {
                if (value == numberInTheDeck)
                    return;
                numberInTheDeck = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this, new PropertyChangedEventArgs(nameof(NumberInTheDeck)));
                }
            }
        }

        private List<FavDeckTest> favDecksTest;

        [ManyToMany(typeof(CardDeckClass))]
        public List<FavDeckTest> FavDecksTest
        {
            get
            {
                return favDecksTest;
            }
            set
            {
                if (value == favDecksTest)
                    return;
                favDecksTest = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this, new PropertyChangedEventArgs(nameof(FavDecksTest)));
                }
            }
        }

   
    }
}
