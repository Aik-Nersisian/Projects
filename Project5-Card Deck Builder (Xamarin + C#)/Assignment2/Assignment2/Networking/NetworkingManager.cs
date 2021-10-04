using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Assignment2
{
    public class NetworkingManager
    {
        private string url = "https://api.hearthstonejson.com/v1/25770/enUS/cards.collectible.json"; //Hearthstone Card Game cards Api (contains details about each card in the game)
        private HttpClient client = new HttpClient();

        public async Task<List<CardClass>> GetOverall()
        {
            var response = await client.GetAsync(url);
            if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                return new List<CardClass>();
            else
            {
                var stringResponse = await response.Content.ReadAsStringAsync();

                var obj = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(stringResponse);

                CardManager cardManager = new CardManager();

                int i = 0;
                foreach (var word in obj)
                {
                    i++;
                    CardClass newCardClass = new CardClass();

                    if (word != null)
                    {
                        foreach (var key in word.Keys)
                        {
                            if (key != null)
                            {

                                switch (key)
                                {
                                    case "attack":
                                        newCardClass.attack = Convert.ToInt32(word[key]);
                                        break;
                                    case "cost":
                                        newCardClass.cost = Convert.ToInt32(word[key]);
                                        break;
                                    case "dbfId":
                                        newCardClass.dbfId = Convert.ToInt32(word[key]);
                                        break;
                                    case "health":
                                        newCardClass.health = Convert.ToInt32(word[key]);
                                        break;
                                    case "id":
                                        newCardClass.Image = "https://art.hearthstonejson.com/v1/render/latest/enUS/256x/" + word[key].ToString() + ".png";
                                        break;
                                    case "name":
                                        newCardClass.name = word[key].ToString();
                                        break;
                                    case "rarity":
                                        newCardClass.rarity = word[key].ToString();
                                        break;
                                    case "type":
                                        newCardClass.type = word[key].ToString();
                                        break;
                                    case "text":
                                        newCardClass.text = word[key].ToString();
                                        break;
                                }
                            }
                        }

                        cardManager.addNewCard(newCardClass);
                    }
                    if (i == 30) //Get only 30 cards for the demonstration purposes. More than 30 is not necessary
                    {
                        break;
                    }
                }
                return cardManager.showAllCrds();
            }
        }
    }
}
