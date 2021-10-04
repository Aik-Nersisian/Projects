using Assignment2.CardModel;
using SQLite;
using SQLiteNetExtensions.Attributes;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows.Input;
using Xamarin.Forms;

namespace Assignment2
{
    public class FavDeckTest : INotifyPropertyChanged
    {

        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }
        private string deckname;
        private bool showSaveButton;
        private bool showRemoveButton;
        private bool showAddButton;
        private bool showAddedCardsTextIndicator;
        private List<CardClass> chosenCards;

        public event PropertyChangedEventHandler PropertyChanged;
        public FavDeckTest()
        {
            deckname = "";
            showSaveButton = false;
            ShowRemoveButton = false;
            showAddButton = true;
            showAddedCardsTextIndicator = true;
            chosenCards = new List<CardClass>();

        }
        public string Deckname { get => deckname; set => deckname = value; }
        public bool ShowSaveButton
        {
            get
            {
                return showSaveButton;
            }
            set
            {
                if (value == showSaveButton)
                    return;
                showSaveButton = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this, new PropertyChangedEventArgs(nameof(ShowSaveButton)));
                }
            }
        }
        public bool ShowAddedCardsTextIndicator
        {
            get
            {
                return showAddedCardsTextIndicator;
            }
            set
            {
                if (value == showAddedCardsTextIndicator)
                    return;
                showAddedCardsTextIndicator = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this, new PropertyChangedEventArgs(nameof(ShowAddedCardsTextIndicator)));
                }
            }
        }
        public bool ShowRemoveButton
        {
            get
            {
                return showRemoveButton;
            }
            set
            {
                if (value == showRemoveButton)
                    return;
                showRemoveButton = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this, new PropertyChangedEventArgs(nameof(ShowRemoveButton)));
                }
            }
        }
        public bool ShowAddButton
        {
            get
            {
                return showAddButton;
            }
            set
            {
                if (value == showAddButton)
                    return;
                showAddButton = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this, new PropertyChangedEventArgs(nameof(ShowAddButton)));
                }
            }
        }

        [ManyToMany(typeof(CardDeckClass))]
        public List<CardClass> ChosenCards
        {
            get
            {
                return chosenCards;
            }
            set
            {
                if (value == chosenCards)
                    return;
                chosenCards = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this, new PropertyChangedEventArgs(nameof(ChosenCards)));
                }

            }
        }

        public ICommand RefreshCommand { get; }

            




    }
}

