window.addEventListener('load', main);

function main() {
    var date = new Date();
    var month = getMonthString(date);
    var year = date.getUTCFullYear();


    callAPI(year, month);
}

// NOTE: Responseformat from API
// var response = {
//     cachetid,
//     version,
//     uri,
//     startdatum,
//     slutdatum,
//     dagar: {
//         datum,
//         veckodag,
//         arbetsfridag,
//         röddag, (OBS denna har mellanslag ?)
//         vecka,
//         dagivecka,
//         namnsdag,
//         flaggdag,
//         helgdag,
//         dagförearbetsfrihelgdag,
//     }
// };


async function callAPI (year, month) {
     
    
    var response = await fetch('https://sholiday.faboul.se/dagar/v2.1/' + year + '/' + month, {
        method: 'GET'
    });
    var jsonData = await response.json();
    // TODO: Add id="grid" to: <div id="grid" class="grid-container">
    const gridElement = document.getElementById('grid');

    // TODO: Gör så dagarna hamnar på rätt veckodag
    for (var item of jsonData.dagar) {
        var div = document.createElement('div');
        div.classList.add('grid-item');
        var p = document.createElement('p');
        // if (item.röddag === 'Ja')
        // {
        //     div.classList.add('redday');
        // }
        if (item.helgdag)
        {
            var holiday = document.createElement('p');
            holiday.innerText = item.helgdag;
            div.append(holiday);
        }

        p.classList.add('date');
        p.innerText = item.datum;
        div.append(p);

        gridElement.append(div);        
    } 
}

function getMonthString(date) {
    const monthIndex = date.getMonth();
    switch (monthIndex) {
        case 0: return '01';
        case 1: return '02';
        case 2: return '03';
        case 3: return '04';
        case 4: return '05';
        case 5: return '06';
        case 6: return '07';
        case 7: return '08';
        case 8: return '09';
        case 9: return '10';
        case 10: return '11';
        case 11: return '12';
    }
}