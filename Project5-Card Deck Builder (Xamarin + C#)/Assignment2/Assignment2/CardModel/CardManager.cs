using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace Assignment2
{
    public class CardManager
    {
        private List<CardClass> allCards = new List<CardClass>();
        ObservableCollection<CardClass> selectedCards = new ObservableCollection<CardClass>();

        public CardManager() { }

        public void addNewCard(CardClass card)
        {
            allCards.Add(card);
        }

        public List<CardClass> showAllCrds()
        {
            return allCards;
        }

        public ObservableCollection<CardClass> AllSelectedCards() //Top Indicator
        {
            return selectedCards;
        }

        public void RemoveSelectedCard(CardClass selectedCard)
        {
            selectedCards.Remove(selectedCard);
        }

        public void AddSelectedCard(CardClass selectedCard)
        {
            selectedCards.Add(selectedCard);
        }

        public void UpdateSelectedCard(CardClass selectedCard)
        {
            var item = selectedCards.FirstOrDefault(i => i.name == selectedCard.name);
            if (item != null)
            {
                item = selectedCard;
            }
        }

    }
}
