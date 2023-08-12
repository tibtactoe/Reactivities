namespace Domain
{
    //questa è una Entity per EntityFramework. A volte chiamata anche model
    //Ognuna di queste proprietà è una colonna di una tabella
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }
}