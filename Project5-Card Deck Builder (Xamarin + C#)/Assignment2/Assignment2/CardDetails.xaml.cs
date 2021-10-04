using System;
using System.Collections.Generic;
using System.Linq;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using SQLiteNetExtensionsAsync.Extensions;

namespace Assignment2
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class CardDetails : ContentPage
    {
        CardClass cardClass = new CardClass();
        DBManager dbmanager = new DBManager();
        FavDeckTest favouriteDeck = new FavDeckTest();
        CardManager chosenCards = new CardManager();

        public CardDetails(CardClass card, FavDeckTest favouriteDeck, DBManager dbmanager, CardManager chosenCards)
        {
            cardClass = card;
            InitializeComponent();
            cardDetailImage.Source = cardClass.Image;
            name.Text = cardClass.name;
            health.Text = cardClass.health.ToString();
            type.Text = cardClass.type;
            attack.Text = cardClass.attack.ToString();
            this.dbmanager = dbmanager;
            this.favouriteDeck = favouriteDeck;
            showRemoveButton.BindingContext = this.favouriteDeck;
            showAddButton.BindingContext = this.favouriteDeck;
            this.chosenCards = chosenCards;
        }

        private async void AddToDeck(object sender, EventArgs e)
        {
            Button button = (Button)sender;
            bool containsCard = favouriteDeck.ChosenCards.Any(item => item.name == cardClass.name);

            if (containsCard)
            {

                foreach (var i in favouriteDeck.ChosenCards)
                {
                    if (i.name == cardClass.name)
                    {

                        if (i.NumberInTheDeck == 2)
                        {
                            await DisplayAlert("Oops!", "Maximum cards added!", "OK");
                            break;

                        }
                        else if (i.NumberInTheDeck == 1)
                        {
                            i.NumberInTheDeck += 1;
                            dbmanager.updateCard(i);
                            favouriteDeck.ShowRemoveButton = true;
                            favouriteDeck.ShowAddButton = false;
                            favouriteDeck.ShowAddedCardsTextIndicator = false;
                            dbmanager.updateDeck(favouriteDeck);

                            this.chosenCards.UpdateSelectedCard(i);
                            break;
                        }
                        else
                        {
                            await DisplayAlert("Oops!", "Something went wrong!", "OK");
                            break;

                        }
                    }
                }
            }
            else
            {
                cardClass.NumberInTheDeck += 1;

                favouriteDeck.ShowRemoveButton = true;
                favouriteDeck.ShowAddButton = true;
                favouriteDeck.ShowSaveButton = true;
                favouriteDeck.ShowAddedCardsTextIndicator = false;

                dbmanager.insertCard(cardClass);
                cardClass.FavDecksTest = new List<FavDeckTest>();
                cardClass.FavDecksTest.Add(favouriteDeck);
                await dbmanager.Connection.UpdateWithChildrenAsync(cardClass);

                favouriteDeck.ChosenCards.Add(cardClass);
                await dbmanager.Connection.UpdateWithChildrenAsync(favouriteDeck);


                this.chosenCards.AddSelectedCard(cardClass);

            }
        }

        private async void showRemoveButton_Clicked(object sender, EventArgs e)
        {
            bool containsCard = favouriteDeck.ChosenCards.Any(item => item.name == cardClass.name);

            if (containsCard)
            {
                foreach (var i in favouriteDeck.ChosenCards)
                {
                    if (i.name == cardClass.name)
                    {

                        if (i.NumberInTheDeck == 2)
                        {
                            i.NumberInTheDeck -= 1;

                            favouriteDeck.ShowAddButton = true;
                            favouriteDeck.ShowRemoveButton = true;
                            dbmanager.updateCard(i);
                            dbmanager.updateDeck(favouriteDeck);

                            this.chosenCards.UpdateSelectedCard(i);
                            break;
                        }
                        else if (i.NumberInTheDeck == 1)
                        {
                            i.NumberInTheDeck -= 1;
                            favouriteDeck.ShowAddButton = true;
                            favouriteDeck.ShowRemoveButton = false;
                            favouriteDeck.ShowAddedCardsTextIndicator = true;
                            favouriteDeck.ChosenCards.Remove(i);

                            this.chosenCards.RemoveSelectedCard(i);
                            break;
                        }
                        else
                        {
                            await DisplayAlert("Oops!", "Something went wrong", "OK");
                            break;
                        }
                    }
                }
            }
            else
            {
                await DisplayAlert("Oops!", "Something went wrong", "OK");
            }

            if (favouriteDeck.ChosenCards.Count == 0)
            {
                favouriteDeck.ShowSaveButton = false;
                favouriteDeck.ShowSaveButton = false;
                favouriteDeck.ShowAddedCardsTextIndicator = true;
                dbmanager.updateDeck(favouriteDeck);
               
            }
            await dbmanager.Connection.UpdateWithChildrenAsync(favouriteDeck);

        }
    }
}