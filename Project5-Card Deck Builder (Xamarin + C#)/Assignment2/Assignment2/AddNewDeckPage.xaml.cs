using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Xamarin.Forms;
namespace Assignment2
{
    public partial class AddNewDeckPage : ContentPage
    {
        public NetworkingManager networkingManager = new NetworkingManager();
        DBManager dbmanager = new DBManager();
        FavDeckTest favouriteDeck = new FavDeckTest();
        CardManager chosenCards = new CardManager();
        List<CardClass> allTheCardsFromApi = new List<CardClass>();

        public AddNewDeckPage(FavDeckTest favouriteDeck, DBManager dbmanager, CardManager chosenCardsIndicator)
        {
            InitializeComponent();

            this.favouriteDeck = favouriteDeck;

            saveButton.BindingContext = this.favouriteDeck;
            chosenCards = chosenCardsIndicator;
            addedCards.ItemsSource = chosenCards.AllSelectedCards();
            deckName.Text = this.favouriteDeck.Deckname;
            this.dbmanager = dbmanager;

        }

        protected async override void OnAppearing()
        {
            var overview_ = await networkingManager.GetOverall();
            cardsList.ItemsSource = overview_;
            anyCardsAddedIndicator.IsVisible = this.favouriteDeck.ShowAddedCardsTextIndicator;
            base.OnAppearing();
        }

        protected async void OnCollectionViewSelectionChanged(object sender, EventArgs e)
        {
            var collection = (CollectionView)sender;

            if (collection.SelectedItem != null)
            {
                var selectedCard = (collection.SelectedItem as CardClass);

                bool containsCard = favouriteDeck.ChosenCards.Any(item => item.name == selectedCard.name);
                if (containsCard)
                {

                    foreach (var i in favouriteDeck.ChosenCards)
                    {
                        if (i.name == selectedCard.name)
                        {
                            if (i.NumberInTheDeck == 2)
                            {

                                favouriteDeck.ShowAddButton = false;
                                favouriteDeck.ShowRemoveButton = true;
                                dbmanager.updateDeck(this.favouriteDeck);
                                break;
                            }
                            else if (i.NumberInTheDeck == 1)
                            {

                                favouriteDeck.ShowAddButton = true;
                                favouriteDeck.ShowRemoveButton = true;
                                dbmanager.updateDeck(this.favouriteDeck);
                                break;
                            }
                            else
                            {
                                Console.WriteLine("Something went wrong");
                            }

                        }

                    }
                }
                else
                {
                    favouriteDeck.ShowAddButton = true;
                    favouriteDeck.ShowRemoveButton = false;
                    dbmanager.updateDeck(this.favouriteDeck);
                }

                await Navigation.PushAsync(new CardDetails(selectedCard, favouriteDeck, dbmanager, chosenCards));
                collection.SelectedItem = null;

            }

        }

        private async void saveButton_Clicked(object sender, EventArgs e)
        {
            chosenCards.AllSelectedCards().Clear();
            Navigation.RemovePage(Navigation.NavigationStack[1]);
            await Navigation.PopAsync();
        }
    }
}