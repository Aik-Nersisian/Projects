using SQLiteNetExtensions.Attributes;

namespace Assignment2.CardModel
{
    public class CardDeckClass
    {
        [ForeignKey(typeof(CardClass))]
        public int CardID { get; set; }

        [ForeignKey(typeof(FavDeckTest))]
        public int favDeckId { get; set; }
    }
}
