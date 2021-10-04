using System;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Xamarin.Forms;
using SQLiteNetExtensionsAsync.Extensions;
using Assignment2.CardModel;
using MediaManager;
using System.Windows.Input;

namespace Assignment2
{
    public partial class MainPage : ContentPage
    {

        DBManager dbmanager = new DBManager();
        ObservableCollection<FavDeckTest> allDecks;
        ObservableCollection<CardClass> allCards;
        ObservableCollection<CardDeckClass> allCardDeck;
        FavDeckTest favouriteDeck = new FavDeckTest();

        

        CardManager chosenCardsIndicator = new CardManager();

        public NetworkingManager networkingManager = new NetworkingManager();
        public MainPage()
        {
            InitializeComponent();
            removeButton.IsVisible = false;
            updateButton.IsVisible = false;

        }

        protected async override void OnAppearing()
        {
            allCards = await dbmanager.CreateTableForCards();
            allDecks = await dbmanager.CreateTableForDecks();
            allCardDeck = await dbmanager.CreateTableForCardDecks(); //Many-to-Many relationship table
            Deckss.ItemsSource = allDecks;
            RefreshView refreshView = new RefreshView();
            ICommand refreshCommand = new Command(() =>
            {
                // IsRefreshing is true
                // Refresh data here
                refreshView.IsRefreshing = false;
            });


            base.OnAppearing();

        }

        private async void AddNewDeck(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            btn.BackgroundColor = Color.FromHex("#FFFF94");
            btn.BorderColor = Color.FromHex("#FFFFFF");
            await Task.Delay(300);
            btn.BackgroundColor = Color.FromHex("#C3B189");
            btn.BorderColor = Color.FromHex("#F5EF9D");

            await Navigation.PushAsync(new NewDeckNamePage(dbmanager));
        }




        protected async void OnCollectionViewSelectionChanged(object sender, EventArgs e)
        {
            var myList = (CollectionView)sender;
            var myJob = (myList.SelectedItem as FavDeckTest);
            FavDeckTest clickedDeck = new FavDeckTest();
            var currentDeck = await dbmanager.Connection.GetWithChildrenAsync<FavDeckTest>(myJob.Id);
            favouriteDeck = currentDeck;
            cardsList.ItemsSource = currentDeck.ChosenCards;
            updateButton.IsVisible = true;
            removeButton.IsVisible = true;


        }

        protected async void OnFavCollectionSelectionChanged(object sender, EventArgs e)
        {
            var collection = (CollectionView)sender;

            if (collection.SelectedItem != null)
            {
                var cardClass = (collection.SelectedItem as CardClass);
                if (cardClass.NumberInTheDeck == 2)
                {
                    favouriteDeck.ShowRemoveButton = true;
                    favouriteDeck.ShowAddButton = false;
                }
                else if (cardClass.NumberInTheDeck == 1)
                {
                    favouriteDeck.ShowRemoveButton = true;
                    favouriteDeck.ShowAddButton = true;
                }
                else
                {
                    favouriteDeck.ShowRemoveButton = false;
                    favouriteDeck.ShowAddButton = true;
                }


                if (favouriteDeck.ChosenCards.Count != 0)
                {
                    foreach (var i in favouriteDeck.ChosenCards)
                    {
                        chosenCardsIndicator.AddSelectedCard(i);
                    }
                }


                await Navigation.PushAsync(new CardDetails(cardClass, favouriteDeck, dbmanager, chosenCardsIndicator));
                collection.SelectedItem = null;
            }

        }

        private async void Remove_Clicked(object sender, EventArgs e)
        {

            cardsList.ItemsSource = "";
            dbmanager.deleteDeck(favouriteDeck);
            allDecks = await dbmanager.CreateTableForDecks();
            Deckss.ItemsSource = allDecks;
            updateButton.IsVisible = false;
            removeButton.IsVisible = false;

        }

        private async void Update_Clicked(object sender, EventArgs e)
        {
            chosenCardsIndicator.AllSelectedCards().Clear();

            if (favouriteDeck.ChosenCards.Count != 0)
            {
                foreach (var i in favouriteDeck.ChosenCards)
                {
                    chosenCardsIndicator.AddSelectedCard(i);
                }
            }

            await Navigation.PushAsync(new AddNewDeckPage(favouriteDeck, dbmanager, chosenCardsIndicator));
        }

    }
}
