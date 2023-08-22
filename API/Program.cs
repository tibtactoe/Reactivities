using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//aggiunto da noi
builder.Services.AddDbContext<DataContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

//5.[Continua da App.tsx]
//Aggiungiamo service di CORS
builder.Services.AddCors(opt => 
{
    opt.AddPolicy("CorsPolicy", politica => {
        //AllowAnyMethod: tutti i metodi HTTP
        //  get, put, post, patch, delete...
        //AllowAnyHeader: permettiamo tutti gli header che vengono con la request
        //WithOrigins: deve corrispondere al posto da cui viene la request
        //  nel nostro caso, la nostra applicazione React
        politica.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//6. Dobbiamo aggiungere CORS prima dell'auth nella MW Pipeline
//specifichiamo il nome della policy che abbiamo passato come parametro al pt 5.
//  cioè "CorsPolicy"
app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

//aggiunto da noi.
//usiamo sta var scope perché nella classe program non possiamo usare dependency injection
//using: significa che questa variabile "scope" verrà distrutta non appena finiremo di eseguire il codice seguente
//dobbiamo ottenere accesso ad un servizio, e creiamo uno scope apposta per quello
//tutti i "builder.Services..." saranno *scoped* alla HTTP request in entrata.
//Quindi, quando il nosto ApiController riceve una richiesta HTTP, potremmo ad esempio aver bisogno di creare ed accedere ad un servizio per accedere al DB per poter fare una query;
//quindi, builder.Services.AddDbContext<DataContext>(... creerà una nuova instance del nostro DataContext, dopodiché saremo in grado di fare query sul DB.
//Ma quando la richiesta HTTP sarà terminata, allora il programma si sbarazzerà del nostro DataContext
//ed è questo che stiamo facendo qui; stiamo creando uno scope, in modo da poter ottenere accesso ad un servizio *all'interno di questo scope in particolare*
//dopodiché aggiungiamo var services = scope.ServiceProvider;
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

//proviamo a creare il DB; se il cmd fallisce, catchiamo l'eccez
try
{
    //
    var context = services.GetRequiredService<DataContext>();
    
    //.Migrate() applica al DB ogni Migrazione pending per il context. E crea il DB se non esiste già.
    //(è la stessa cosa del cmd "database update" che avremmo potuto usare dal terminal)
    await context.Database.MigrateAsync();

    await Seed.SeedData(context);
}
catch (Exception ex)
{
    //ILogger è il service. Program è la classe su cui loggare
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "E' successo un errore durante la migrazione");
}

app.Run();
