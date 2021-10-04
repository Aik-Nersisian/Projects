using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Assignment2.CardModel;
using Assignment2.Persistence;
using SQLite;
using Xamarin.Forms;

namespace Assignment2
{
    public class DBManager
    {
        private SQLiteAsyncConnection _connection;
        public SQLiteAsyncConnection Connection { get => _connection; set => _connection = value; }
        public DBManager()
        {
            Connection = DependencyService.Get<ISQLiteDb>().GetConnection();
        }

        public async Task<ObservableCollection<CardClass>> CreateTableForCards()
        {
            await Connection.CreateTableAsync<CardClass>();
            var cardFromDB = await Connection.Table<CardClass>().ToListAsync();
            var allCards = new ObservableCollection<CardClass>(cardFromDB);
            return allCards;
        }
        public async Task<ObservableCollection<FavDeckTest>> CreateTableForDecks()
        {
            await Connection.CreateTableAsync<FavDeckTest>();
            var cardFromDB = await Connection.Table<FavDeckTest>().ToListAsync();
            var allCards = new ObservableCollection<FavDeckTest>(cardFromDB);
            return allCards;
        }

        public async Task<ObservableCollection<CardDeckClass>> CreateTableForCardDecks()
        {
            await Connection.CreateTableAsync<CardDeckClass>();
            var cardFromDB = await Connection.Table<CardDeckClass>().ToListAsync();
            var allCards = new ObservableCollection<CardDeckClass>(cardFromDB);
            return allCards;
        }


        public void insertCard(CardClass card)
        {
            Connection.InsertAsync(card);
        }

        public void deleteCard(CardClass cardToDelete)
        {
            Connection.DeleteAsync(cardToDelete);
        }

        public void updateCard(CardClass cardToUpdate)
        {
            Connection.UpdateAsync(cardToUpdate);
        }

        public void insertDeck(FavDeckTest deck)
        {
            Connection.InsertAsync(deck);
        }

        public void deleteDeck(FavDeckTest deck)
        {
            Connection.DeleteAsync(deck);
        }

        public void updateDeck(FavDeckTest deck)
        {
            Connection.UpdateAsync(deck);
        }
    }
}
