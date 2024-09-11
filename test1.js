let data = [[]]

function init_data(n)
{
    for(let i= 0  ;i< n ;i++)
    {
        data[i] = [];
    }
}

function dont_dothis()
{
    const baseURL="https://api.nytimes.com/svc/books/v3/lists/2019-01-20/hardcover-fiction.json?api-key=QTd4H7HDVpLKhqIqtV42NmAthrt8ub4b"

    fetch(baseURL)
    .then(res => res.json())
    .then(res => {
        console.log(res)
    
        let str = "<div class='grid grid-cols-4 grid-flow-row item-center'>";
        
        init_data(res.num_results)

        for(let i = 0 ; i< res.num_results ; i++)
        {
            str += "<div class ='box-border m-2 flex flex-col items-center justify-center'> <img class='h-38 w-32' src="+res.results.books[i].book_image+"></img>"+"<h3>"+res.results.books[i].title+"</h3></div>";
            data[i][0] = [res.results.books[i].book_image]
            data[i][1] = ""+[res.results.books[i].title]
            data[i][2] = [res.results.books[i].rank]
            data[i][3] = Math.floor(Math.random() * 1000);
        }
        str +="</div>"

        console.log(str)
        const ele = document.getElementById("con-2");
        ele.innerHTML = str;
        document.getElementById("fetchButton").hidden = true;
        document.getElementById("drop").hidden= false;
        document.getElementById("drop2").hidden= false;
        
    })
}

function sort_it_out() {
    
    // for(let i = 0 ; i< 15 ;i++)
    // {
    //     console.log(data[i][0]+" "+data[i][1]+" "+data[i][2]+"\n")
    // }
    
    const sort_it = document.getElementById("sort_by").value

    if(sort_it == "Alphabets")
    {
        data.sort((a, b) => a[1].localeCompare(b[1]));
    }
    else
    {
        data.sort((a, b) => a[2] - b[2]);
    }

    const docs = document.getElementById("con-2");
    let str = "<div class='grid grid-flow-row grid-cols-4 item-center'>";
        
    for (let i = 0; i < data.length; i++) {
        str += "<div class='box-border m-2 flex flex-col items-center justify-center'>";
        str += "<img class='h-38 w-32' src='" + data[i][0] + "'></img>";
        str += "<h3>" + data[i][1] + "</h3>";
        str += "</div>";
    }
    str += "</div>";

    docs.innerHTML = str;
}

function filter_it_out()
{
    // alert("fun called")
    price = document.getElementById("filter_it").value;
    console.log(price)
    let str = "<div class='grid grid-flow-row grid-cols-4 item-center'>";

    if(price == "above_499")
    {
        for(let i = 0 ;i< data.length ;i++)
        {
            if(data[i][3] >= 500)
            {
                
                str += "<div class='box-border m-2 flex flex-col items-center justify-center'>";
                str += "<img class='h-38 w-32' src='" + data[i][0] + "'></img>";
                str += "<h3>" + data[i][1] + "</h3>";
                str += "</div>";
            }
        }
    }
    else
    if(price == "below_500")
    {
        for(let i = 0 ;i< data.length;i++)
        {
            console.log(data[i][1]+" "+data[i][3])
            if(data[i][3] < 500)
            {       
                str += "<div class='box-border m-2 flex flex-col items-center justify-center'>";
                str += "<img class='h-38 w-32' src='" + data[i][0] + "'></img>";
                str += "<h3>" + data[i][1] + "</h3>";
                str += "</div>";
            }
        }
    }
    else
    {
           
    for (let i = 0; i < data.length; i++) {
        str += "<div class='box-border m-2 flex flex-col items-center justify-center'>";
        str += "<img class='h-38 w-32' src='" + data[i][0] + "'></img>";
        str += "<h3>" + data[i][1] + "</h3>";
        str += "</div>";
    }
    }
    
    str += "</div>";

    console.log(str)
    const docs = document.getElementById("con-2");
    docs.innerHTML = str;

}