using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Assignment2
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NewDeckNamePage : ContentPage
    {

        DBManager dbmanager = new DBManager();
        FavDeckTest favouriteDeck = new FavDeckTest();

        public string nameEntered;
        ObservableCollection<FavDeckTest> allDecks;
        CardManager chosenCardsIndicator = new CardManager();
        public NewDeckNamePage(DBManager dbmanager)
        {
            InitializeComponent();
            this.dbmanager = dbmanager;

        }


        protected async override void OnAppearing()
        {

            allDecks = await dbmanager.CreateTableForDecks();

            base.OnAppearing();


        }

        private void CreateDeckButtonClicked(object sender, EventArgs e)
        {
            var name = deckName.Text;
            bool ifExists = checkIfDeckNameAlreadyExists(name);


            if (ifExists)
                DisplayAlert("Oops!", "A deck with this name already exists!", "OK");

            else
                CreateDeck(name);

        }


        private async void NameEnteredCompleted(object sender, EventArgs e)
        {
            var name = ((Entry)sender).Text;

            bool ifExists = checkIfDeckNameAlreadyExists(name);

            if (string.IsNullOrEmpty(name))
            {
                await DisplayAlert("Oops", "The name can not be empty.", "OK");

            }
            else if (ifExists)
            {
                await DisplayAlert("Oops!", "A deck with this name already exists!", "OK");
            }

            else
            {
                CreateDeck(name);
                createDeckButton.IsVisible = true;
            }
        }

        private async void CreateDeck(string name)
        {
            favouriteDeck.Deckname = name;
            dbmanager.insertDeck(favouriteDeck);
            await Navigation.PushAsync(new AddNewDeckPage(favouriteDeck, this.dbmanager, chosenCardsIndicator));
        }

        public bool checkIfDeckNameAlreadyExists(string name)
        {

            bool containsDeck = allDecks.Any(item => item.Deckname == name);
            return containsDeck;
        }

        private void deckName_TextChanged(object sender, TextChangedEventArgs e)
        {
            var oldText = e.OldTextValue;
            var newText = e.NewTextValue;

            nameEntered = newText;
            if (string.IsNullOrEmpty(nameEntered))
            {
                createDeckButton.IsVisible = false;
            }
            else
            {
                createDeckButton.IsVisible = true;
            }

        }
    }

}