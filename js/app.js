let input=document.getElementById("input");
let from=document.getElementById("from");
let to=document.getElementById("to");
let result=document.getElementById("result");
let historyList=document.getElementById("historyList");

function createOption(x,y,z){
    let o=document.createElement("option");
    let t=document.createTextNode(y);
    o.appendChild(t);
    o.setAttribute("value",toNum(z))
    x.appendChild(o)
};
function createList(x){
    let rowSpan=document.getElementById("rowSpan");
    if (rowSpan){
        rowSpan.remove()
    }

    let tr=document.createElement("tr");

    x.map(function (el){
        let td=document.createElement("td");
        let tdText=document.createTextNode(el);
        td.appendChild(tdText);
        tr.appendChild(td)
    })
    historyList.appendChild(tr)
};

function saveRecord(){
localStorage.setItem("record",historyList.innerHTML)
};

(function (){
    if(localStorage.getItem("record")){
        historyList.innerHTML=localStorage.getItem("record")
    }else{
        historyList.innerHTML=`<tr id="rowSpan"><td colspan="4">There is no Record</td></tr>`
    }
})();

function toNum(x){
    return Number(x.replace(",",""))
};
for(x in data.rates){
   createOption(from,x,data.rates[x]);
    createOption(to,x,data.rates[x])
};

document.getElementById("calc").addEventListener("submit",function (e){
    e.preventDefault();
    let x=input.value;
    let y=from.value;
    let z=to.value;

    let date=new Date().toLocaleString();
    let fromText=x+" " +
        "" +
        ""+from.options[from.selectedIndex].innerText;
    let toText=to.options[to.selectedIndex].innerText;
    let first=x*y;
    let second=first/z;
    let resultNum=second.toFixed(2);
    let arr=[date,fromText,toText,resultNum];
    createList(arr);
    saveRecord();

    result.innerHTML=resultNum;
    input.focus();
    input.value="";
    from.value="";
    to.value="1";

})
function changeMode(){
    document.body.classList.toggle("night-mode");
    document.getElementById("mode-icon").classList.toggle("fa-sun")
}